import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Permite o frontend em localhost:3000
    methods: 'GET,POST,PUT,DELETE',  // Permite esses métodos HTTP
    allowedHeaders: 'Content-Type, Authorization',  // Permite esses headers
    credentials: true,  // Permite enviar cookies e credenciais
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Documentação da API backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
