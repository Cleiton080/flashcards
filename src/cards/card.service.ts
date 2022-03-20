import type { CardEntity } from './entities/card.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRepository } from './card.repository';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardRepository)
    private cardRepository: CardRepository,
  ) {}

  async all(): Promise<CardEntity[]> {
    return this.cardRepository.find();
  }
}
