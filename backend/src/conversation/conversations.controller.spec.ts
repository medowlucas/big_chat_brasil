import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Client } from 'src/entities/client.entity';

describe('ConversationsController', () => {
  let conversationsController: ConversationsController;
  let conversationsService: ConversationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationsController],
      providers: [
        {
          provide: ConversationsService,
          useValue: {
            createConversation: jest.fn(),
            getConversations: jest.fn(),
          },
        },
      ],
    }).compile();

    conversationsController = module.get<ConversationsController>(ConversationsController);
    conversationsService = module.get<ConversationsService>(ConversationsService);
  });

  it('should be defined', () => {
    expect(conversationsController).toBeDefined();
  });

  describe('createConversation', () => {
    it('should call ConversationsService.createConversation with the correct clientId', async () => {
      const clientId = 'client-uuid';
      
      const createConversationSpy = jest.spyOn(conversationsService, 'createConversation').mockResolvedValue({
        id: 'conversation-uuid',
        recipientId: 'recipient-uuid',
        recipientName: 'Maria Oliveira',
        lastMessageContent: 'Olá, tudo bem?',
        lastMessageTime: new Date('2025-04-21T12:00:00Z'),
        unreadCount: 0,
        client: {
          id: 'client-uuid',
          name: 'Cliente Teste',
          documentId: '12345678900',
          documentType: 'CPF',
          planType: 'prepaid',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Client,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: []
      });

      await conversationsController.createConversation({ clientId });
      
      expect(createConversationSpy).toHaveBeenCalledWith(clientId);
    });
  });

  describe('getConversations', () => {
    it('should call ConversationsService.getConversations with the correct clientId', async () => {
      const clientId = 'client-uuid';
      
      const getConversationsSpy = jest.spyOn(conversationsService, 'getConversations').mockResolvedValue([]);

      await conversationsController.getConversations(clientId);

      expect(getConversationsSpy).toHaveBeenCalledWith(clientId);
    });
  });
});
