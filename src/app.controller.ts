import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Verifica status da API' })
  healthCheck(): { status: string } {
    return { status: 'API Online' };
  }
}