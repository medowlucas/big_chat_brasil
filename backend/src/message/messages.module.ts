import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Conversation } from 'src/entities/conversation.entity';
import { Client } from 'src/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Conversation, Client]),
    // ClientsModule.register([
    //   {
    //     name: 'RABBITMQ_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
    //       queue: 'messages_queue',
    //       queueOptions: {
    //         durable: true,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
