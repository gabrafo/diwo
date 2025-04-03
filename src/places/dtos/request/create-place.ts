import { IsISO8601, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceDto {
  @ApiProperty({
    example: 'Brasil',
    description: 'Nome do país que deseja visitar'
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Fernando de Noronha',
    description: 'Local específico dentro do país'
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    example: '2025-07',
    description: 'Meta no formato YYYY-MM (mês e ano)'
  })
  @IsNotEmpty()
  @IsString()
  goal: string;  

  @ApiProperty({
    example: 'https://flagcdn.com/br.svg',
    description: 'URL da bandeira do país'
  })
  @IsNotEmpty()
  @IsUrl()
  flagUrl: string;
}