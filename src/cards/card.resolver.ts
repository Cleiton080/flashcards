import { CardEntity } from './card.entity';

import { Query, Resolver } from '@nestjs/graphql';
import { CardService } from './card.service';

@Resolver('Card')
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query()
  async cards(): Promise<CardEntity[]> {
    return this.cardService.all();
  }
}
