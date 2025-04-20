// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto/auth-request.dto';

@Injectable()
export class AuthService {
  async login(authRequest: AuthRequestDto) {
    return {
      token: 'dummyToken123456',
      client: {
        id: '1',
        name: 'Cliente Teste',
        documentId: authRequest.documentId,
        documentType: authRequest.documentType,
        active: true,
        balance: 100.0,
        planType: 'prepaid',
        limit: 50.0,
      },
    };
  }
}
