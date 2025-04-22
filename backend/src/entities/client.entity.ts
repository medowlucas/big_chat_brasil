import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Conversation } from './conversation.entity';
import { DocumentType } from 'src/enums/document-type.enum';
import { PlanType } from 'src/enums/plan-type.enum';

@Entity('clients')
export class Client {
  @ApiProperty({ example: 'uuid', description: 'ID único do cliente' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'João da Silva' })
  @Column()
  name: string;

  @ApiProperty({ example: '12345678900' })
  @Column({ unique: true })
  documentId: string;

  @ApiProperty({ enum: DocumentType, example: 'CPF' })
  @Column({ type: 'enum', enum: DocumentType })
  documentType: DocumentType ;

  @ApiProperty({ example: 200.00, required: false })
  @Column({ type: 'decimal', nullable: true })
  balance?: number;

  @ApiProperty({ example: 1000, required: false })
  @Column({ type: 'decimal', nullable: true })
  limit?: number;

  @ApiProperty({ enum: PlanType, example: 'prepaid' })
  @Column({ type: 'enum', enum: PlanType })
  planType: PlanType;

  @ApiProperty({ example: true })
  @Column({ default: true })
  active: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamento: Um Cliente pode ter muitas Conversas
  @ApiProperty({ type: () => Conversation, isArray: true })
  @OneToMany(() => Conversation, (conversation) => conversation.client)
  conversations: Conversation[];
}
