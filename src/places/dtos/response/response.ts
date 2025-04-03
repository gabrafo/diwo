import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PlaceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Brasil',
    description: 'Nome do país visitado'
  })
  country: string;

  @Expose()
  @ApiProperty({
    example: 'Fernando de Noronha',
    description: 'Local visitado'
  })
  location: string;

  @Expose()
  @ApiProperty({
    example: '2025-07',
    description: 'Meta formatada como YYYY-MM'
  })
  @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
  goal: Date;

  @Expose()
  @ApiProperty({
    example: 'https://flagcdn.com/br.svg',
    description: 'URL da bandeira do país'
  })
  flagUrl: string;

  @Expose()
  @ApiProperty({
    example: '2024-01-01T12:00:00.000Z',
    description: 'Data de criação do registro'
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2024-01-02T10:30:00.000Z',
    description: 'Data da última atualização'
  })
  updatedAt: Date;
}