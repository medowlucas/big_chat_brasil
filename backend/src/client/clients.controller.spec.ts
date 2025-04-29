import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Client } from '../entities/client.entity';

describe('ClientsController', () => {
  let clientsController: ClientsController;
  let clientsService: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          return true;
        },
      })
      .compile();

    clientsController = module.get<ClientsController>(ClientsController);
    clientsService = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(clientsController).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return client profile by id', async () => {
      const clientId = 'uuid-client-id';
      const expectedClient: Partial<Client> = {
        id: clientId,
        name: 'João da Silva',
        documentId: '12345678900',
        documentType: 'CPF' as any,
        balance: 100.00,
        limit: 500,
        planType: 'prepaid' as any,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        conversations: [],
      };

      jest.spyOn(clientsService, 'findById').mockResolvedValue(expectedClient as Client);

      const result = await clientsController.getProfile(clientId);

      expect(clientsService.findById).toHaveBeenCalledWith(clientId);
      expect(result).toEqual(expectedClient);
    });
  });
});
