import { IsEnum, IsString } from 'class-validator';
import { DocumentType } from '../../enums/document-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRequest {
  @IsString()
  @ApiProperty({ example: '12345678901' })
  @IsString({ message: 'documentId must be a string' })
  documentId: string;

  @ApiProperty({ enum: DocumentType, example: DocumentType.CPF })
  @IsString({ message: 'documentType must be a string' })
  @IsEnum(DocumentType)
  documentType: DocumentType;
}
