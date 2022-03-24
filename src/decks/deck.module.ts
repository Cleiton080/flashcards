import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckRepository } from './deck.repository';
import { DeckResolver } from './deck.resolver';
import { DeckService } from './deck.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeckRepository])],
  providers: [DeckService, DeckResolver],
})
export class DeckModule {}
