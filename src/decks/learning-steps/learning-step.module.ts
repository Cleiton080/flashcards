import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from 'src/decks/deck.entity';
import { LearningStepEntity } from 'src/decks/learning-steps/learning-step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LearningStepEntity, DeckEntity])],
})
export class LearningStepModule {}
