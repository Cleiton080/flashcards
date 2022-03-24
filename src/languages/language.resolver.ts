import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageEntity } from './language.entity';
import { LanguageService } from './language.service';

@Resolver('Language')
export class LanguageResolver {
  constructor(private languageService: LanguageService) {}

  @Query()
  async languages(): Promise<LanguageEntity[]> {
    return this.languageService.all();
  }

  @Query()
  async language(
    @Args('id', ParseUUIDPipe) id: string,
  ): Promise<LanguageEntity> {
    return this.languageService.find(id);
  }

  @Mutation()
  async createLanguage(
    @Args('input') createLanguageDto: CreateLanguageDto,
  ): Promise<LanguageEntity> {
    return this.languageService.create(createLanguageDto);
  }

  @Mutation()
  async updateLanguage(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') updateLanguageDto: UpdateLanguageDto,
  ): Promise<LanguageEntity> {
    return this.languageService.update(id, updateLanguageDto);
  }

  @Mutation()
  async removeLanguage(
    @Args('id', ParseUUIDPipe) id: string,
  ): Promise<LanguageEntity> {
    return this.languageService.delete(id);
  }
}
