import { EntityRepository, Repository } from 'typeorm';
import { LanguageEntity } from './language.entity';

@EntityRepository(LanguageEntity)
export class LanguageRepository extends Repository<LanguageEntity> {}
