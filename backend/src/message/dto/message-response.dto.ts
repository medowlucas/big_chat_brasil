import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty({ example: 'uuid-da-mensagem' })
  id: string;

  @ApiProperty({ example: 'uuid-da-conversa' })
  conversationId: string;

  @ApiProperty({ example: 'Olá, tudo bem?', description: 'Conteúdo da mensagem' })
  content: string;

  @ApiProperty({
    example: { id: 'uuid-do-client', type: 'client' },
    description: 'Informações sobre quem enviou a mensagem',
  })
  sentBy: {
    id: string;
    type: 'client' | 'user';
  };

  @ApiProperty({ example: new Date().toISOString(), description: 'Data/hora do envio' })
  timestamp: string;

  @ApiProperty({ enum: ['normal', 'urgent'], example: 'normal' })
  priority: 'normal' | 'urgent';

  @ApiProperty({
    enum: ['queued', 'processing', 'sent', 'delivered', 'read', 'failed'],
    example: 'queued',
  })
  status: 'queued' | 'processing' | 'sent' | 'delivered' | 'read' | 'failed';

  @ApiProperty({ example: 0.05, description: 'Custo da mensagem' })
  cost: number;

  @ApiProperty({ example: new Date().toISOString(), description: 'Data estimada de entrega' })
  estimatedDelivery: string;  // Nova propriedade para estimativa de entrega

  @ApiProperty({ example: 100.00, description: 'Saldo atual do cliente', required: false })
  currentBalance?: number;  // Adicionando currentBalance
}
