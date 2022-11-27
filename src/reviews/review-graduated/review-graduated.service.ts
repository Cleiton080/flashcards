import { Injectable } from '@nestjs/common';
import { CardEntity } from 'src/cards/card.entity';
import { REVIEW_ANSWEAR } from '../review.enum';
import * as moment from 'moment';

@Injectable()
export class ReviewGraduatedService {
  /**
   * Review a card
   * @param card CardEntity
   * @param cardAnswerId REVIEW_ANSWEAR
   * @returns CardEntity
   */
  public makeReview(
    card: CardEntity,
    cardAnswerId: REVIEW_ANSWEAR,
  ): CardEntity {
    card.ease = this.calculateCardEase(card, cardAnswerId);
    card.current_interval = this.calculateCardInterval(card, cardAnswerId);
    card.due = moment().add(card.current_interval, 'days').toDate();

    return card;
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
