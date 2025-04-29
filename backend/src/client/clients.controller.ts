import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { User } from '../auth/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('Clientes')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('me')
  @ApiResponse({ status: 200, description: 'Sucesso.' })
  async getProfile(@User('id') id: string) {
    return this.clientsService.findById(id);
  }
}
