import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não declarados nos DTOs
      forbidNonWhitelisted: true, // Rejeita requisições com campos extras
      transform: true, // Converte tipos automaticamente
    })
  );
  app.use(helmet());
  app.use(cors({ origin: 'http://localhost:3000' }));
  app.use((req: Request, _res: Response, next: Function) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  const config = new DocumentBuilder()
  .setTitle('API do Projeto')
  .setDescription('Documentação da API do seu projeto')
  .setVersion('1.0')
  .addTag('places')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();