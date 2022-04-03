import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThrowStatement } from 'ts-morph';
import { DeckEntity } from './deck.entity';
import { DeckRepository } from './deck.repository';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(DeckRepository)
    private deckRepository: DeckRepository,
  ) {}

  async all(): Promise<DeckEntity[]> {
    return this.deckRepository.find();
  }

  async find(id: string): Promise<DeckEntity> {
    return await this.deckRepository.findOne(id, {
      relations: ['language'],
    });
  }

  async create(createDeckDto: CreateDeckDto): Promise<DeckEntity> {
    return this.deckRepository.save(createDeckDto);
  }

  async update(id: string, updateDeckDto: UpdateDeckDto): Promise<DeckEntity> {
    const deck = this.deckRepository.findOne(id);

    if (!deck) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.deckRepository.save({ ...updateDeckDto, id });
  }

  async delete(id: string): Promise<DeckEntity> {
    const language = await this.deckRepository.findOne(id);

    if (!language) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    this.deckRepository.remove(language);

    return language;
  }
}
