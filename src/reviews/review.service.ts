import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from 'src/reviews/review.entity';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { CardService } from 'src/cards/card.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    private cardService: CardService,
  ) {}

  async all(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find();
  }

  async create(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    const { cardId, cardAnswearId, delayResponse } = createReviewDto;

    const card = await this.cardService.find(cardId);

    if (!card) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.reviewRepository.save({
      delay_response: delayResponse,
      card_id: cardId,
      review_answear_id: cardAnswearId,
    });
  }
}
