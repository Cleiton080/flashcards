import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from 'src/config/typeorm';
import { GraphqlService } from './config/graphql';
import { CardModule } from './cards/card.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    CardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
