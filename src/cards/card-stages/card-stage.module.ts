import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardStageEntity } from './card-stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardStageEntity])],
})
export class CardStageModule {}
