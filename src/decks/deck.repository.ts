import { EntityRepository, Repository } from 'typeorm';
import { DeckEntity } from './deck.entity';

@EntityRepository(DeckEntity)
export class DeckRepository extends Repository<DeckEntity> {}
