import { Client } from "./client";

export interface AuthRequest {
    documentId: string;
    documentType: 'CPF' | 'CNPJ';
  }
  
  export interface AuthResponse {
    token: string;
    client: Client;
  }
  