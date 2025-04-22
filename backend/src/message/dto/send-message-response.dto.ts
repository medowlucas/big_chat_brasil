import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendMessageResponse {
  @ApiProperty({ example: 'uuid-da-mensagem' })
  id: string;

  @ApiProperty({ example: 'queued' })
  status: string;

  @ApiProperty({ example: new Date().toISOString(), description: 'Data/hora de envio' })
  timestamp: string;

  @ApiProperty({ example: new Date().toISOString(), description: 'Previsão de entrega' })
  estimatedDelivery: string;

  @ApiProperty({ example: 0.05, description: 'Custo da mensagem' })
  cost: number;

  @ApiPropertyOptional({ example: 95.25, description: 'Saldo restante (se for pré-pago)' })
  currentBalance?: number;
}
