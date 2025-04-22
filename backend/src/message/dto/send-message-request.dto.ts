import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsEnum } from 'class-validator';

export class SendMessageRequest {
  @ApiProperty({ example: 'uuid-da-conversa', description: 'ID da conversa existente' })
  @IsUUID()
  conversationId: string;

  @ApiPropertyOptional({ example: 'uuid-do-destinatario', description: 'Para novas conversas' })
  @IsUUID()
  @IsOptional()
  recipientId?: string;

  @ApiProperty({ example: 'Olá, tudo bem?', description: 'Conteúdo da mensagem' })
  @IsString()
  content: string;

  @ApiProperty({ enum: ['normal', 'urgent'], example: 'normal' })
  @IsEnum(['normal', 'urgent'])
  priority: 'normal' | 'urgent';
}
