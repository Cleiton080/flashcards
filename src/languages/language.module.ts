import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageRepository } from './language.repository';
import { LanguageResolver } from './language.resolver';
import { LanguageService } from './language.service';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageRepository])],
  providers: [LanguageService, LanguageResolver],
})
export class LanguageModule {}
