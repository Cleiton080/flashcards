import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from 'src/config/typeorm'
import { GraphqlService } from './config/graphql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService
    }),
    GraphQLModule.forRootAsync({
      useClass:  GraphqlService
    })
  ],
  controllers: [AppController],
})
export class AppModule {}
