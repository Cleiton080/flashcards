import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningStepsEntity } from './learning-steps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LearningStepsEntity])],
})
export class LearningStepsModule {}
