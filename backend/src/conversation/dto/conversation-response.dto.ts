import { ApiProperty } from '@nestjs/swagger';

export class ConversationResponse {
  @ApiProperty({
    description: 'ID da conversa.',
  })
  id: string;

  @ApiProperty({
    description: 'ID do destinatário da conversa.',
  })
  recipientId: string;

  @ApiProperty({
    description: 'Nome do destinatário da conversa.',
  })
  recipientName: string;

  @ApiProperty({
    description: 'Conteúdo da última mensagem enviada.',
  })
  lastMessageContent: string;

  @ApiProperty({
    description: 'Data e hora da última mensagem.',
  })
  lastMessageTime: string;

  @ApiProperty({
    description: 'Número de mensagens não lidas na conversa.',
  })
  unreadCount: number;
}
