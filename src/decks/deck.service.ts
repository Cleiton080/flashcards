import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeckEntity } from './deck.entity';
import { DeckRepository } from './deck.repository';
import { CreateDeckDto } from './dto/create-deck.dto';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(DeckRepository)
    private deckRepository: DeckRepository,
  ) {}

  async all(): Promise<DeckEntity[]> {
    return this.deckRepository.find();
  }

  async create(createDeckDto: CreateDeckDto): Promise<DeckEntity> {
    return this.deckRepository.save(createDeckDto);
  }
}
