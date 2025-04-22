export interface AuthRequest {
    documentId: string;
    documentType: 'CPF' | 'CNPJ';
  }
  
  export interface AuthResponse {
    token: string;
    client: {
      id: string;
      name: string;
      documentId: string;
      documentType: 'CPF' | 'CNPJ';
      balance?: number;
      limit?: number;
      planType: 'prepaid' | 'postpaid';
      active: boolean;
    };
  }
  