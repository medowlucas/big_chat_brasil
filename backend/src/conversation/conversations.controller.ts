import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('new')
  createConversation(@Body() body: { clientId: string }) {
    return this.conversationsService.createConversation(body.clientId);
  }

  @Get(':clientId')
  getConversations(@Param('clientId') clientId: string) {
    return this.conversationsService.getConversations(clientId);
  }
}
