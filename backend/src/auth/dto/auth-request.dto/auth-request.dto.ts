import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export class AuthRequestDto {
  @ApiProperty()
  @IsString()
  documentId: string;

  @ApiProperty()
  @IsEnum(DocumentType)
  documentType: DocumentType; // Tipo de documento (CPF ou CNPJ)
}
