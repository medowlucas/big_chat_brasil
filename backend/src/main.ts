import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as amqp from 'amqplib';

// URL do RabbitMQ (Usando variáveis de ambiente)
const rabbitmqUrl = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

// Função para aguardar a conexão com o RabbitMQ
async function waitForRabbitMQ(): Promise<void> {
  let connection;
  let attempts = 0;

  while (attempts < 10) {
    try {
      connection = await amqp.connect(rabbitmqUrl);
      if (connection) {
        console.log('Conectado ao RabbitMQ com sucesso!');
        break;
      }
    } catch (err) {
      console.warn('Tentando conectar ao RabbitMQ... Tente novamente');
      attempts += 1;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  if (!connection) {
    console.error('Falha ao conectar ao RabbitMQ após múltiplas tentativas.');
    process.exit(1);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aguarda o RabbitMQ estar disponível
  await waitForRabbitMQ();

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: false,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Documentação da API backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl],
      queue: 'conversations_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [rabbitmqUrl],
  //     queue: 'messages_queue',
  //     queueOptions: {
  //       durable: true,
  //     },
  //     noAck: true,
  //   },
  // });

  await app.startAllMicroservices();
  console.log('[Microservice] Microservices started ✅');
  await app.listen(3001);
  console.log('[HTTP] Server running at http://localhost:3001 ✅');

}

bootstrap();
