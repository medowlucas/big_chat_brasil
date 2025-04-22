import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Client } from '../entities/client.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  // Método para criar uma conversa
  async createConversation(clientId: string): Promise<Conversation> {
    // Verifica se o cliente existe
    const client = await this.clientRepo.findOne({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    // Criação de uma conversa fictícia
    const conversation = this.conversationRepo.create({
      recipientName: faker.person.fullName(),
      recipientId: faker.string.uuid(),
      client: client,
    });

    // Salva a conversa no banco
    return await this.conversationRepo.save(conversation);
  }

  // Método para buscar as conversas de um cliente
  async getConversations(clientId: string): Promise<Conversation[]> {
    const client = await this.clientRepo.findOne({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return await this.conversationRepo.find({
      where: { client: { id: clientId } },
      order: { createdAt: 'DESC' },
      relations: ['messages'],
    });
  }
}
