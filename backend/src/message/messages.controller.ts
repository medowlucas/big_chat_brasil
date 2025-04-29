import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SendMessageRequest } from './dto/send-message-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  @ApiResponse({ status: 200, description: 'Mensagem enviada com sucesso.' })
  async sendMessage(@Body() sendMessageRequest: SendMessageRequest, @User('id') userId: string) {
    return this.messagesService.enqueueMessage(sendMessageRequest, userId);
  }

  @Get(':conversationId')
  @ApiResponse({ status: 200, description: 'Mensagens recuperadas com sucesso.' })
  async getMessages(@Param('conversationId') conversationId: string) {
    return this.messagesService.getMessagesByConversationId(conversationId);
  }
}
