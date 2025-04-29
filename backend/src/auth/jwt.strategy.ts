import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ClientsService } from 'src/client/clients.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private clientsService: ClientsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const client = await this.clientsService.findById(payload.sub);

    if (!client) {
      throw new Error('Client not found');
    }

    return {
      id: client.id,
      documentId: client.documentId,
      name: client.name,
      active: client.active,
    };
  }
}
