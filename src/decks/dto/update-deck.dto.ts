import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { DeckLanguageDto } from './deck-language.dto';

export class UpdateDeckDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  readonly name: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly learning_step_good: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly graduating_interval: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly easy_interval: number;

  @IsDecimal()
  @IsOptional()
  readonly interval_modifier: number;

  @IsDecimal()
  @IsOptional()
  readonly easy_bonus: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @Type(() => DeckLanguageDto)
  readonly languages: DeckLanguageDto[];
}
