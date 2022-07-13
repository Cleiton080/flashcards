import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/cards/card.entity';
import { DeckEntity } from 'src/decks/deck.entity';
import { LanguageEntity } from 'src/languages/language.entity';
import { LanguageResolver } from 'src/languages/language.resolver';
import { LanguageService } from 'src/languages/language.service';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity, DeckEntity, CardEntity])],
  providers: [LanguageService, LanguageResolver],
})
export class LanguageModule {}
