import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRequestDto, DocumentType } from './dto/auth-request.dto/auth-request.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('AuthController', () => {
  let app: INestApplication;
  let authService = { login: () => ({ token: 'dummyToken123456' }) };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return a token on successful login', () => {
    const loginRequest: AuthRequestDto = {
      documentId: '12345678901',
      documentType: DocumentType.CPF,
    };

    return request(app.getHttpServer())
      .post('/auth')
      .send(loginRequest)
      .expect(200)
      .expect((response) => {
        expect(response.body.token).toBeDefined();
        expect(response.body.client).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 400 if invalid documentId is provided', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({ documentId: 'invalidCPF', documentType: 'CPF' })
      .expect(400);
  });
  
});
