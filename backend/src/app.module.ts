import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from './conversation/conversations.module';
import { MessagesModule } from './message/messages.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    TypeOrmModule.forFeature([Client]),
    ConversationsModule,
    MessagesModule,
    // ClientsModule.register([
    //   {
    //     name: 'RABBITMQ_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
    //       queue: 'conversations_queue',
    //       queueOptions: {
    //         durable: true,
    //       },
    //       noAck: true,
    //     },
    //   },
    // ]),
  ],
})
export class AppModule {}
