import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';

export class UpdateDeckDto {
  @IsString()
  @IsNotEmpty()
  @Max(45)
  readonly name: string;

  @IsInt()
  @IsPositive()
  readonly learning_step_again: number;

  @IsInt()
  @IsPositive()
  readonly learning_step_good: number;

  @IsInt()
  @IsPositive()
  readonly graduating_interval: number;

  @IsInt()
  @IsPositive()
  readonly easy_interval: number;

  @IsDecimal()
  readonly interval_modifier: number;

  @IsDecimal()
  readonly easy_bonus: number;

  @IsNotEmpty()
  @IsString()
  readonly language_id: string;
}
