import { Injectable } from '@nestjs/common';
import { CardStageEnum } from 'src/cards/card-stages/card-stage.enum';
import { CardEntity } from 'src/cards/card.entity';
import { REVIEW_ANSWEAR } from '../review.enum';
import * as moment from 'moment';

@Injectable()
export class ReviewLearningService {
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
    const { learningStep } = this.resolveLearningStep(card, cardAnswerId);

    card.learning_step = learningStep;

    const { due } = this.learningStepDueDate(card);

    if (due) {
      card.due = due;

      return card;
    }

    const graduatingCard = this.graduatingCard(card);

    card.card_stage_id = graduatingCard.cardStageId;
    card.learning_step = graduatingCard.learningStep;
    card.current_interval = graduatingCard.currentInterval;
    card.due = graduatingCard.due;

    return card;
  }

  /**
   * Get the next learning step based on the card answer
   * @param card CardEntity
   * @param cardAnswerId REVIEW_ANSWEAR
   * @returns {learningStep: number}
   */
  protected resolveLearningStep(
    card: CardEntity,
    cardAnswerId: REVIEW_ANSWEAR,
  ): { learningStep: number } {
    switch (cardAnswerId) {
      case REVIEW_ANSWEAR.AGAIN:
      case REVIEW_ANSWEAR.HARD:
        const learningStepDecrement = card.learning_step
          ? card.learning_step - 1
          : 0;
        return { learningStep: learningStepDecrement };
      case REVIEW_ANSWEAR.EASY:
      case REVIEW_ANSWEAR.GOOD:
        const learningStepIncrement = (card.learning_step += 1);
        return { learningStep: learningStepIncrement };
    }
  }

  /**
   * Get the next due date of the learning step, it's going to return null when there's no more learning steps set
   * @param card CardEntity
   * @return {due: Date | null}
   */
  protected learningStepDueDate(card: CardEntity): { due: Date | null } {
    const { learning_steps: learningSteps } = card.deck;

    const currentLearningStep = learningSteps.at(card.learning_step);

    if (currentLearningStep) {
      const due = moment()
        .add(currentLearningStep.interval_time, 'minutes')
        .toDate();

      return { due };
    }

    return { due: null };
  }

  /**
   * Change the card stage to graduated
   * @param card CardEntity
   * @returns {
   *        cardStageId: CardStageEnum;
   *        learningStep: number;
   *        currentInterval: number;
   *        due: Date;
   *  }
   */
  protected graduatingCard(card: CardEntity): {
    cardStageId: CardStageEnum;
    learningStep: number;
    currentInterval: number;
    due: Date;
  } {
    const { learning_steps: learningSteps } = card.deck;

    const intervalLastLearningStep = learningSteps.at(
      learningSteps.length - 1,
    )?.interval_time;

    const currentInterval = intervalLastLearningStep
      ? Math.ceil(moment.duration(intervalLastLearningStep).asDays())
      : 1;

    const due = moment().add(card.current_interval, 'days').toDate();
    return {
      cardStageId: CardStageEnum.GRADUATED,
      learningStep: 0,
      currentInterval,
      due,
    };
  }
}
