import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardService } from 'src/cards/card.service';
import { CardEntity } from 'src/cards/card.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { REVIEW_ANSWEAR } from 'src/reviews/review.enum';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    private cardService: CardService,
  ) {}

  public async all(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find();
  }

  public async create(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    const { cardId, cardAnswearId, delayResponse } = createReviewDto;

    const card = await this.cardService.find(cardId);

    card.ease = this.calculateCardEase(card, cardAnswearId);
    card.current_interval = this.calculateCardInterval(card, cardAnswearId);

    await card.save();

    return this.reviewRepository.save({
      delay_response: delayResponse,
      card_id: cardId,
      review_answear_id: cardAnswearId,
    });
  }

  public calculateCardEase(card: CardEntity, cardAnswearId: string): number {
    switch (cardAnswearId) {
      case REVIEW_ANSWEAR.AGAIN:
        return card.ease - 0.2 * card.ease; // subtract 20% from ease factor
      case REVIEW_ANSWEAR.EASY:
        return card.ease + 0.15 * card.ease; // add 15% to ease factor
      case REVIEW_ANSWEAR.GOOD:
        return card.ease; // ease factor remains
      case REVIEW_ANSWEAR.HARD:
        return card.ease - 0.15 * card.ease; // subtract 15% from ease factor
      default:
      //
    }
  }

  public calculateCardInterval(
    card: CardEntity,
    cardAnswearId: string,
  ): number {
    switch (cardAnswearId) {
      case REVIEW_ANSWEAR.AGAIN:
        return this.markCardAsAgain(card);
      case REVIEW_ANSWEAR.EASY:
        return this.markCardAsEasy(card);
      case REVIEW_ANSWEAR.GOOD:
        return this.markCardAsGood(card);
      case REVIEW_ANSWEAR.HARD:
        return this.markCardAsHard(card);
      default:
      //
    }
  }

  public markCardAsGood(card: CardEntity): number {
    return card.current_interval * card.ease * card.deck.interval_modifier;
  }

  public markCardAsAgain(card: CardEntity): number {
    return 0;
  }

  public markCardAsHard(card: CardEntity): number {
    return card.current_interval * 1.2 * card.deck.interval_modifier;
  }

  public markCardAsEasy(card: CardEntity): number {
    return (
      card.current_interval *
      card.ease *
      card.deck.interval_modifier *
      card.deck.easy_bonus
    );
  }
}
