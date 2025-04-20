import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() body: { documentId: string; documentType: 'CPF' | 'CNPJ' }) {
    const { documentId, documentType } = body;
    return this.authService.login(documentId, documentType);
  }
}
