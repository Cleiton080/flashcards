import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from 'src/reviews/review.service';
import { ReviewEntity } from 'src/reviews/review.entity';
import { ReviewResolver } from 'src/reviews/review.resolver';
import { CardService } from 'src/cards/card.service';
import { CardEntity } from 'src/cards/card.entity';
import { LanguageEntity } from 'src/languages/language.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity, CardEntity, LanguageEntity]),
  ],
  providers: [ReviewService, CardService, ReviewResolver],
})
export class ReviewModule {}
