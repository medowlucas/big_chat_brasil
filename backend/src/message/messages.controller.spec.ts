import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SendMessageRequest } from './dto/send-message-request.dto';
import { MessageResponse } from './dto/message-response.dto';

describe('MessagesController', () => {
  let messagesController: MessagesController;
  let messagesService: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: {
            enqueueMessage: jest.fn(),
            getMessagesByConversationId: jest.fn(),
          },
        },
      ],
    }).compile();

    messagesController = module.get<MessagesController>(MessagesController);
    messagesService = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(messagesController).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should call MessagesService.enqueueMessage with the correct parameters', async () => {
      const sendMessageRequest: SendMessageRequest = {
        conversationId: 'uuid-da-conversa',
        content: 'Olá, tudo bem?',
        priority: 'normal',
      };

      const response: MessageResponse = {
        id: 'uuid-da-mensagem',
        conversationId: 'uuid-da-conversa',
        content: 'teste',
        sentBy: {
          id: 'uuid-do-client',
          type: 'client'
        },
        timestamp: new Date().toISOString(),
        priority: 'normal',
        status: 'queued',
        cost: 0.25,
        estimatedDelivery: new Date().toISOString(),
        currentBalance: 100
      };

      const enqueueMessageSpy = jest.spyOn(messagesService, 'enqueueMessage').mockResolvedValue(response);

      const result = await messagesController.sendMessage(sendMessageRequest, 'user-id');

      expect(enqueueMessageSpy).toHaveBeenCalledWith(sendMessageRequest, 'user-id');
      expect(result).toEqual(response);
    });
  });

  describe('getMessages', () => {
    it('should call MessagesService.getMessagesByConversationId with the correct conversationId', async () => {
      const conversationId = 'uuid-da-conversa';

      const mockMessages: MessageResponse[] = [
        {
          id: 'uuid-da-mensagem-1',
          conversationId: 'uuid-da-conversa',
          content: 'Olá!',
          sentBy: { id: 'uuid-do-client', type: 'client' },
          timestamp: new Date().toISOString(),
          priority: 'normal',
          status: 'sent',
          cost: 0.05,
          estimatedDelivery: new Date().toISOString(),
        },
      ];

      jest.spyOn(messagesService, 'getMessagesByConversationId').mockResolvedValue(mockMessages);

      const result = await messagesController.getMessages(conversationId);

      expect(result).toEqual(mockMessages);
    });
  });
});
