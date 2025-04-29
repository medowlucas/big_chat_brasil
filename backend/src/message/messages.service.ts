import { Injectable } from '@nestjs/common';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SendMessageRequest } from './dto/send-message-request.dto';
import { MessageResponse } from './dto/message-response.dto';
import { Client } from 'src/entities/client.entity';

@Injectable()
export class MessagesService {
  private messageQueue: { message: Message; priority: string }[] = [];
  private isProcessing = false; // Flag para saber se o processo de envio está em andamento

  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async getMessagesByConversationId(conversationId: string): Promise<MessageResponse[]> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['client'],
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // Recuperar o saldo do cliente associado
    const currentBalance = conversation.client.balance;

    const messages = await this.messageRepository.find({
      where: { conversation: { id: conversationId } },
      order: { timestamp: 'ASC' },
      relations: ['conversation'],
    });

    return messages.map((message) => ({
      id: message.id,
      conversationId: message.conversation.id,
      content: message.content,
      sentBy: message.sentBy,
      timestamp: message.timestamp.toISOString(),
      priority: message.priority,
      status: message.status,
      cost: message.cost,
      estimatedDelivery: new Date(Date.now() + 5000).toISOString(),
      currentBalance,
    }));
  }

  // Enfileirar mensagem para envio
  async enqueueMessage(sendMessageRequest: SendMessageRequest): Promise<MessageResponse> {
    const { conversationId, recipientId, content, priority } = sendMessageRequest;

    // Verifica se a conversa existe
    const conversation = await this.conversationRepository.findOne({ where: { id: conversationId } });
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // Cria a nova mensagem
    const message = this.messageRepository.create({
      conversation,
      content,
      sentBy: { id: recipientId, type: 'user' },
      priority,
      timestamp: new Date(),
      status: 'queued', // Marca a mensagem como enfileirada
      cost: priority === 'urgent' ? 0.5 : 0.25,
    });

    // Salva a mensagem no banco de dados
    await this.messageRepository.save(message);

    // Enfileira a mensagem
    this.enqueueToQueue(message, priority);

    return {
      id: message.id,
      conversationId: message.conversation.id,
      content: message.content,
      sentBy: message.sentBy,
      timestamp: message.timestamp.toISOString(),
      priority: message.priority,
      status: message.status,
      cost: message.cost,
      estimatedDelivery: new Date(Date.now() + 5000).toISOString(),
    };
  }

  // Enfileirar a mensagem com base na prioridade
  private enqueueToQueue(message: Message, priority: string) {
    if (priority === 'urgent') {
      // Coloca as mensagens urgentes no início da fila
      this.messageQueue.unshift({ message, priority });
    } else {
      // Coloca as mensagens normais no final da fila
      this.messageQueue.push({ message, priority });
    }

    // Processa a fila caso não esteja processando
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Processar a fila de mensagens
  private async processQueue() {
    this.isProcessing = true;

    while (this.messageQueue.length > 0) {
      const nextMessage = this.messageQueue.shift();

      if (!nextMessage) {
        continue;
      }

      const { message } = nextMessage;

      // Atualiza o status da mensagem para "enviando"
      await this.messageRepository.update(message.id, {
        status: 'processing',
      });

      // Simula o envio da mensagem
      await this.sendMessage(message);

      // Marca a mensagem como "enviada"
      await this.messageRepository.update(message.id, {
        status: 'sent',
      });

      // Controle de saldo e limite
      let client = await this.clientRepository.findOne({ where: { id: message.sentBy.id } });
      if (client) {
        if (client.planType === 'prepaid') {
          client.balance = (client.balance ?? 0) - message.cost;
        } else if (client.planType === 'postpaid') {
          client.limit = (client.limit ?? 0) - message.cost;
        }

        await this.clientRepository.save(client);
      } else {
        console.error(`Client with ID ${message.sentBy.id} not found.`);
      }

      // Aguarda um tempo antes de processar a próxima mensagem (simulando o tempo de envio)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula um delay de 1 segundo
    }

    this.isProcessing = false;
  }

  // Simula o envio real da mensagem (aqui você pode integrar com sistemas externos)
  private async sendMessage(message: Message) {
    console.info(`Enviando mensagem: ${message.content}, prioridade: ${message.priority}`);
  }
}
