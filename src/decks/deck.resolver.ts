import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeckEntity } from './deck.entity';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';

@Resolver('Deck')
export class DeckResolver {
  constructor(private deckService: DeckService) {}

  @Query()
  async decks(): Promise<DeckEntity[]> {
    return this.deckService.all();
  }

  @Mutation()
  async createDeck(
    @Args('input') createDeckDto: CreateDeckDto,
  ): Promise<DeckEntity> {
    return this.deckService.create(createDeckDto);
  }
}
