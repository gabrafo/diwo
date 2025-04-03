import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaceDto {
  @ApiProperty({
    example: 'Porto de Galinhas',
    description: 'Novo local dentro do país'
  })
  @ValidateIf(o => o.location !== undefined || o.goal !== undefined) // Ao menos um dos campos tem que ser enviado
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    example: '2026-03',
    description: 'Nova meta no formato YYYY-MM'
  })
  @ValidateIf(o => o.location !== undefined || o.goal !== undefined)
  @IsOptional()
  @IsString()
  goal: string;
  
}