import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/cards/card.entity';
import { DeckEntity } from 'src/decks/deck.entity';
import { DeckResolver } from 'src/decks/deck.resolver';
import { DeckService } from 'src/decks/deck.service';
import { LearningStepModule } from 'src/decks/learning-steps/learning-step.module';
import { ReLearningStepModule } from 'src/decks/re-learning-steps/re-learning-step.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeckEntity, CardEntity]),
    LearningStepModule,
    ReLearningStepModule,
  ],
  providers: [DeckService, DeckResolver],
})
export class DeckModule {}
