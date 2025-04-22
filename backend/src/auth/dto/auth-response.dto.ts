import { Client } from '../../entities/client.entity';

export class AuthResponse {
  token: string;
  client: Client;
}
