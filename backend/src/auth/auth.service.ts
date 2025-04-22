import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Client } from '../entities/client.entity';
import { AuthRequest } from './dto/auth-request.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { PlanType } from 'src/enums/plan-type.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authRequest: AuthRequest): Promise<AuthResponse> {
    const { documentId, documentType } = authRequest;

    let client = await this.clientRepository.findOne({ where: { documentId } });

    if (!client) {
      client = this.clientRepository.create({
        documentId,
        documentType,
        name: 'Cliente Teste',
        active: true,
        balance: 100,
        limit: 0,
        planType: PlanType.PREPAID,
      });

      await this.clientRepository.save(client);
    }

    const payload = { sub: client.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      client,
    };
  }
}
