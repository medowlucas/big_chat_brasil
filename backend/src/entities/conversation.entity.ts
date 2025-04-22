import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from './client.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Client })
  @ManyToOne(() => Client, (client) => client.conversations)
  client: Client;

  @ApiProperty({ example: '12345678900', description: 'ID do destinatário da conversa' })
  @Column()
  recipientId: string;

  @ApiProperty({ example: 'Maria Oliveira' })
  @Column()
  recipientName: string;

  @ApiProperty({ example: 'Olá, tudo bem?' })
  @Column({ nullable: true })
  lastMessageContent: string;

  @ApiProperty({ example: '2025-04-21T12:00:00Z' })
  @Column({ type: 'timestamp', nullable: true })
  lastMessageTime: Date;

  @ApiProperty({ example: 2 })
  @Column({ default: 0 })
  unreadCount: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamento: Uma Conversa pode ter muitas Mensagens
  @ApiProperty({ type: () => Message, isArray: true })
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
