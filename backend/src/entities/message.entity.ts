import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Conversation } from './conversation.entity';

export type SenderType = 'client' | 'user';
export type MessagePriority = 'normal' | 'urgent';
export type MessageStatus = 'queued' | 'processing' | 'sent' | 'delivered' | 'read' | 'failed';

@Entity('messages')
export class Message {
  @ApiProperty({ example: 'uuid', description: 'ID da mensagem' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Olá, tudo bem?' })
  @Column()
  content: string;

  @ApiProperty({ enum: ['normal', 'urgent'], example: 'normal' })
  @Column({ type: 'enum', enum: ['normal', 'urgent'], default: 'normal' })
  priority: MessagePriority;

  @ApiProperty({ enum: ['queued', 'processing', 'sent', 'delivered', 'read', 'failed'], example: 'queued' })
  @Column({ type: 'enum', enum: ['queued', 'processing', 'sent', 'delivered', 'read', 'failed'], default: 'queued' })
  status: MessageStatus;

  @ApiProperty({ example: 0.05 })
  @Column({ type: 'decimal' })
  cost: number;

  @ApiProperty({ type: () => Conversation })
  @ManyToOne(() => Conversation, (conversation) => conversation.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @ApiProperty({ example: new Date().toISOString() })
  @CreateDateColumn()
  timestamp: Date;

  @ApiProperty({
    example: { id: 'client-uuid', type: 'client' },
    description: 'Identificação de quem enviou a mensagem',
  })
  @Column({ type: 'json' })
  sentBy: {
    id: string;
    type: SenderType;
  };
}
