import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto/auth-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Faz login' })
  @ApiResponse({ status: 200, description: 'Login efetuado com sucesso' })
  @Post()
  async login(@Body() authRequest: AuthRequestDto) {
    return this.authService.login(authRequest);
  }
}
