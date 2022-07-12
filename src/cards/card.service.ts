import type { CardEntity } from './card.entity';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRepository } from './card.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardRepository)
    private cardRepository: CardRepository,
  ) {}

  async all(): Promise<CardEntity[]> {
    return this.cardRepository.find({
      relations: ['deck'],
    });
  }

  async find(id: string): Promise<CardEntity> {
    return this.cardRepository.findOne({
      where: { id },
      relations: ['deck', 'deck.language'],
    });
  }

  async create(createCardDto: CreateCardDto): Promise<CardEntity> {
    return this.cardRepository.save(createCardDto);
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<CardEntity> {
    const deck = this.cardRepository.findOne({ where: { id } });

    if (!deck) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.cardRepository.save({ ...updateCardDto, id });
  }

  async delete(id: string): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    this.cardRepository.remove(card);

    return card;
  }
}
