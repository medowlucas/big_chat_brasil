import { Injectable } from '@nestjs/common';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SendMessageRequest } from './dto/send-message-request.dto';
import { MessageResponse } from './dto/message-response.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(sendMessageRequest: SendMessageRequest): Promise<MessageResponse> {
    const { conversationId, recipientId, content, priority } = sendMessageRequest;

    // Busca pela conversa existente ou cria uma nova
    const conversation = await this.conversationRepository.findOne({ where: { id: conversationId } });
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // Criação da nova mensagem
    const message = this.messageRepository.create({
      conversation,
      content,
      sentBy: { id: recipientId, type: 'user' },
      priority,
      timestamp: new Date(),
      status: 'queued',
      cost: 0.25,
    });

    await this.messageRepository.save(message);

    // Atualiza a conversa com a última mensagem
    await this.conversationRepository.update(conversation.id, {
      lastMessageContent: content,
    });

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
      currentBalance: 100,
    };
  }

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
}
