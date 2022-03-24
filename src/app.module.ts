import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from 'src/config/typeorm';
import { GraphqlService } from './config';

import { CardModule } from './cards/card.module';
import { LanguageModule } from './languages/language.module';
import { DeckModule } from './decks/deck.module';

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
    LanguageModule,
    DeckModule,
  ],
})
export class AppModule {}
