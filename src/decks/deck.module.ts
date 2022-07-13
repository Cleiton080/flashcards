import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from 'src/decks/deck.entity';
import { DeckResolver } from 'src/decks/deck.resolver';
import { DeckService } from 'src/decks/deck.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeckEntity])],
  providers: [DeckService, DeckResolver],
})
export class DeckModule {}
