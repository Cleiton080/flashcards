import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, Repository } from 'typeorm';
import { DeckEntity } from 'src/decks/deck.entity';
import { CreateDeckDto } from 'src/decks/dto/create-deck.dto';
import { UpdateDeckDto } from 'src/decks/dto/update-deck.dto';
import { CardEntity } from 'src/cards/card.entity';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(DeckEntity)
    private deckRepository: Repository<DeckEntity>,
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  async all(): Promise<DeckEntity[]> {
    return this.deckRepository.find({
      relations: ['languages', 'cards'],
    });
  }

  async find(id: string): Promise<any> {
    const deck = await this.deckRepository.findOneOrFail({
      where: { id },
      relations: {
        languages: true,
        cards: true,
      },
    });

    const cardsReview = await this.cardRepository.find({
      where: [
        {
          deck_id: id,
          due: IsNull(),
        },
        {
          deck_id: id,
          due: LessThanOrEqual(new Date()),
        },
      ],
    });

    return {
      ...deck,
      cards_review: cardsReview,
    };
  }

  async create(createDeckDto: CreateDeckDto): Promise<DeckEntity> {
    return this.deckRepository.save(createDeckDto);
  }

  async update(id: string, updateDeckDto: UpdateDeckDto): Promise<DeckEntity> {
    const deck = await this.deckRepository.findOneOrFail({ where: { id } });
    const languagesId = deck.languages.map((language) => language.id);

    await this.deckRepository.delete(languagesId);

    return this.deckRepository.save({
      ...updateDeckDto,
      id,
    });
  }

  async delete(id: string): Promise<DeckEntity> {
    const language = await this.deckRepository.findOne({ where: { id } });

    if (!language) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    this.deckRepository.remove(language);

    return language;
  }
}
