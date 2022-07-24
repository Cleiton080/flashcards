import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';
import { CardEntity } from 'src/cards/card.entity';
import { CardService } from 'src/cards/card.service';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { UpdateCardDto } from 'src/cards/dto/update-card.dto';

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
