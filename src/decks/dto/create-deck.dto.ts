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
import { CreateLearningStepDto } from 'src/decks/learning-steps/dto/create-learning-step.dto';
import { CreateReLearningStepDto } from 'src/decks/re-learning-steps/dto/create-re-learning-step.dto';
import { DeckLanguageDto } from 'src/decks/dto/deck-language.dto';

export class CreateDeckDto {
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

  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @Type(() => DeckLanguageDto)
  readonly languages: DeckLanguageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @Type(() => CreateLearningStepDto)
  readonly learning_steps: CreateLearningStepDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @Type(() => CreateReLearningStepDto)
  readonly re_learning_steps: CreateReLearningStepDto[];
}
