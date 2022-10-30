import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardService } from 'src/cards/card.service';
import { CardEntity } from 'src/cards/card.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { REVIEW_ANSWEAR } from 'src/reviews/review.enum';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import * as moment from 'moment';
import { CardStageEnum } from 'src/cards/card-stages/card-stage.enum';

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

  private cardCanBeReviewed(card: CardEntity): boolean {
    return card.due.getTime() <= Date.now();
  }

  private async learning(
    card: CardEntity,
    cardAnswerId?: string,
  ): Promise<CardEntity> {
    const cardLearningStep = card.deck.learning_steps.at(card.reviews.length);

    if (cardLearningStep) {
      card.due = moment()
        .add(cardLearningStep.interval_time, 'minutes')
        .toDate();

      return card;
    }

    card.card_stage_id = CardStageEnum.GRADUATED;

    return this.graduated(card, cardAnswerId);
  }

  private async graduated(
    card: CardEntity,
    cardAnswerId: string,
  ): Promise<CardEntity> {
    card.ease = this.calculateCardEase(card, cardAnswerId);
    card.current_interval = this.calculateCardInterval(card, cardAnswerId);
    card.due = moment().add(card.current_interval, 'days').toDate();

    return card;
  }

  public async create(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    const { cardId, cardAnswerId, delayResponse } = createReviewDto;

    const card = await this.cardService.find(cardId);

    if (!this.cardCanBeReviewed(card)) {
      throw new Error('Card cannot be reviewed right now!');
    }

    switch (card.card_stage_id) {
      case CardStageEnum.LEARNING:
        const cardLearning = await this.learning(card, cardAnswerId);
        await cardLearning.save();
        break;
      case CardStageEnum.GRADUATED:
        const cardGraduated = await this.graduated(card, cardAnswerId);
        await cardGraduated.save();
        break;
      case CardStageEnum.RELEARNING:
        break;
      default:
        break;
    }

    return this.reviewRepository.save({
      delay_response: delayResponse,
      card_id: cardId,
      review_answer_id: cardAnswerId,
    });
  }

  public calculateCardEase(card: CardEntity, cardAnswerId: string): number {
    switch (cardAnswerId) {
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

  public calculateCardInterval(card: CardEntity, cardAnswerId: string): number {
    switch (cardAnswerId) {
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
    return Math.ceil(
      card.current_interval * card.ease * card.deck.interval_modifier,
    );
  }

  public markCardAsAgain(card: CardEntity): number {
    return 0;
  }

  public markCardAsHard(card: CardEntity): number {
    return Math.ceil(card.current_interval * 1.2 * card.deck.interval_modifier);
  }

  public markCardAsEasy(card: CardEntity): number {
    return Math.ceil(
      card.current_interval *
        card.ease *
        card.deck.interval_modifier *
        card.deck.easy_bonus,
    );
  }
}
