import { CardEntity } from './card.entity';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardService } from './card.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Resolver('Card')
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query()
  async cards(): Promise<CardEntity[]> {
    return this.cardService.all();
  }

  @Query()
  async card(@Args('id', ParseUUIDPipe) id: string): Promise<CardEntity> {
    return this.cardService.find(id);
  }

  @Mutation()
  async createCard(
    @Args('input') createCardDto: CreateCardDto,
  ): Promise<CardEntity> {
    return this.cardService.create(createCardDto);
  }

  @Mutation()
  async updateCard(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') updateCardDto: UpdateCardDto,
  ): Promise<CardEntity> {
    return this.cardService.update(id, updateCardDto);
  }

  @Mutation()
  async removeCard(@Args('id', ParseUUIDPipe) id: string): Promise<CardEntity> {
    return this.cardService.delete(id);
  }
}
