import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRequest } from './dto/auth-request.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { DocumentType } from 'src/enums/document-type.enum';
import { PlanType } from 'src/enums/plan-type.enum';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with correct parameters and return its result', async () => {
      const authRequest: AuthRequest = {
        documentId: '12345678900',
        documentType: DocumentType.CPF,
      };

      const expectedResponse: AuthResponse = {
        token: 'fake-jwt-token',
        client: {
          id: 'uuid-generated',
          name: 'João da Silva',
          documentId: '12345678900',
          documentType: DocumentType.CPF,
          balance: 200.0,
          limit: 1000,
          planType: PlanType.PREPAID,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          conversations: [],
        },
      };

      jest.spyOn(authService, 'login').mockResolvedValue(expectedResponse);

      const result = await authController.login(authRequest);

      expect(authService.login).toHaveBeenCalledWith(authRequest);
      expect(result).toEqual(expectedResponse);
    });
  });
});
