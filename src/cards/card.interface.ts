import type { CardEntity } from 'src/cards/card.entity';

export interface ReviewCard {
  total: number;
  cards: CardEntity[];
}
