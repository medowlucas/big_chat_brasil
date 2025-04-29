export interface Client {
    id: string;
    name: string;
    documentId: string;
    documentType: 'CPF' | 'CNPJ';
    balance?: number;
    limit?: number;
    planType: 'prepaid' | 'postpaid';
    active: boolean;
}
