import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardService } from 'src/cards/card.service';
import { CardEntity } from 'src/cards/card.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { CardStageEnum } from 'src/cards/card-stages/card-stage.enum';
import { ReviewLearningService } from './review-learning/review-learning.service';
import { ReviewGraduatedService } from './review-graduated/review-graduated.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    private cardService: CardService,
    private reviewLearningService: ReviewLearningService,
    private reviewGraduatedService: ReviewGraduatedService,
  ) {}

  /**
   * List all reviews stored
   * @returns Promise<ReviewEntity[]>
   */
  public async all(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find();
  }

  /**
   * Check whether the card can be reviewed
   * @param card CardEntity
   * @returns boolean
   */
  private cardCanBeReviewed(card: CardEntity): boolean {
    if (!card.due) {
      return true;
    }

    return card.due.getTime() <= Date.now();
  }

  /**
   * Create a review
   * @param createReviewDto CreateReviewDto
   * @returns Promise<ReviewEntity>
   */
  public async create(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    const { cardId, cardAnswerId, delayResponse } = createReviewDto;

    let card = await this.cardService.find(cardId);

    if (!this.cardCanBeReviewed(card)) {
      throw new Error('Card cannot be reviewed right now!');
    }

    switch (card.card_stage_id) {
      case CardStageEnum.LEARNING:
        card = this.reviewLearningService.makeReview(card, cardAnswerId);
        break;
      case CardStageEnum.GRADUATED:
        card = this.reviewGraduatedService.makeReview(card, cardAnswerId);
        break;
      case CardStageEnum.RELEARNING:
        break;
      default:
        break;
    }

    await card.save();

    return this.reviewRepository.save({
      delay_response: delayResponse,
      card_id: cardId,
      review_answer_id: cardAnswerId,
    });
  }
}
