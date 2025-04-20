import { Injectable } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(documentId: string, documentType: 'CPF' | 'CNPJ') {
    let client = await Client.findOne({ where: { documentId } });

    client ??= await Client.create({
        documentId,
        documentType,
        name: 'Cliente Teste',
        active: true,
        balance: 100,
        limit: 0,
        planType: 'prepaid',
        createdAt: new Date(),
        updatedAt: new Date(),
      }).save();

    const payload = { sub: client.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      client
    };
  }
}
