import { LessThanOrEqual, Repository, IsNull } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CardEntity } from 'src/cards/card.entity';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { UpdateCardDto } from 'src/cards/dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  public async all(): Promise<CardEntity[]> {
    return this.cardRepository.find({
      relations: ['deck'],
    });
  }

  public async find(id: string): Promise<CardEntity> {
    return this.cardRepository.findOneOrFail({
      where: { id },
      relations: ['deck', 'deck.languages'],
    });
  }

  public async create(createCardDto: CreateCardDto): Promise<CardEntity> {
    return this.cardRepository.save(createCardDto);
  }

  public async update(
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<CardEntity> {
    const deck = this.cardRepository.findOne({ where: { id } });

    if (!deck) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.cardRepository.save({ ...updateCardDto, id });
  }

  public async delete(id: string): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    this.cardRepository.remove(card);

    return card;
  }

  public async reviews(deckId: string): Promise<[CardEntity[], number]> {
    const cards = await this.cardRepository.findAndCount({
      where: [
        { deck_id: deckId, due: LessThanOrEqual(new Date()) },
        { deck_id: deckId, due: IsNull() },
      ],
    });

    return cards;
  }
}
