import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardEntity } from 'src/cards/card.entity';
import { DeckEntity } from './deck.entity';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Resolver('Deck')
export class DeckResolver {
  constructor(private deckService: DeckService) {}

  @Query()
  async decks(): Promise<DeckEntity[]> {
    return this.deckService.all();
  }

  @Query()
  async deck(@Args('id', ParseUUIDPipe) id: string): Promise<DeckEntity> {
    return this.deckService.find(id);
  }

  @Mutation()
  async createDeck(
    @Args('input') createDeckDto: CreateDeckDto,
  ): Promise<DeckEntity> {
    return this.deckService.create(createDeckDto);
  }

  @Mutation()
  async updateDeck(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') updateDeckDto: UpdateDeckDto,
  ): Promise<DeckEntity> {
    return this.deckService.update(id, updateDeckDto);
  }

  @Mutation()
  async removeDeck(@Args('id', ParseUUIDPipe) id: string): Promise<DeckEntity> {
    return this.deckService.delete(id);
  }
}
