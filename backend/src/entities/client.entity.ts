import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  documentId: string; // CPF ou CNPJ do cliente

  @Column()
  documentType: 'CPF' | 'CNPJ'; // Tipo de documento

  @Column()
  name: string; // Nome do cliente

  @Column({ default: true })
  active: boolean; // Se o cliente está ativo

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number; // Saldo para pré-pago

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  limit: number; // Limite para pós-pago

  @Column()
  planType: 'prepaid' | 'postpaid'; // Tipo de plano do cliente
}
