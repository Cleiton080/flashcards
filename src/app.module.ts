import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';

@Module({
  imports: [GraphQLModule.forRoot({})],
  controllers: [AppController],
})
export class AppModule {}
