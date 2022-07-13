import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/cards/card.entity';
import { CardResolver } from 'src/cards/card.resolver';
import { CardService } from 'src/cards/card.service';
import { ReviewEntity } from 'src/reviews/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ReviewEntity])],
  providers: [CardService, CardResolver],
})
export class CardModule {}
