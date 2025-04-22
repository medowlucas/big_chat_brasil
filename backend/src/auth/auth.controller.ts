import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRequest } from './dto/auth-request.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Realiza login com CPF ou CNPJ' })
  @ApiBody({
    description: 'Dados necessários para login',
    schema: {
      type: 'object',
      properties: {
        documentId: { type: 'string', example: '12345678901' },
        documentType: { type: 'string', enum: ['CPF', 'CNPJ'], example: 'CPF' },
      },
    },
  })
  async login(@Body() authRequest: AuthRequest ) {
    return this.authService.login(authRequest);
  }
}
