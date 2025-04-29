import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SendMessageRequest } from './dto/send-message-request.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  @ApiResponse({ status: 200, description: 'Mensagem enviada com sucesso.' })
  async sendMessage(@Body() sendMessageRequest: SendMessageRequest) {
    return this.messagesService.enqueueMessage(sendMessageRequest);
  }

  @Get(':conversationId')
  @ApiResponse({ status: 200, description: 'Mensagens recuperadas com sucesso.' })
  async getMessages(@Param('conversationId') conversationId: string) {
    return this.messagesService.getMessagesByConversationId(conversationId);
  }
}
