import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from 'src/decks/deck.entity';
import { ReLearningStepEntity } from 'src/decks/re-learning-steps/re-learning-step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReLearningStepEntity, DeckEntity])],
})
export class ReLearningStepModule {}
