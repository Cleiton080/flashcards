import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageEntity } from './language.entity';
import { LanguageRepository } from './language.repository';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageRepository)
    private languageRepository: LanguageRepository,
  ) {}

  async all(): Promise<LanguageEntity[]> {
    return this.languageRepository.find({
      relations: ['decks'],
    });
  }

  async find(id: string): Promise<LanguageEntity> {
    return this.languageRepository.findOne({
      where: { id },
      relations: ['decks'],
    });
  }

  async create(createLanguageDto: CreateLanguageDto): Promise<LanguageEntity> {
    return this.languageRepository.save(createLanguageDto);
  }

  async update(
    id: string,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<LanguageEntity> {
    const language = await this.languageRepository.findOne({ where: { id } });

    if (!language) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.languageRepository.save({ ...updateLanguageDto, id });
  }

  async delete(id: string): Promise<LanguageEntity> {
    const language = await this.languageRepository.findOne({ where: { id } });

    return this.languageRepository.remove(language);
  }
}
