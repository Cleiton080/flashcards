import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  Max,
} from 'class-validator';

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty()
  @Max(45)
  name: string;

  @IsInt()
  @IsPositive()
  learning_step_again: number;

  @IsInt()
  @IsPositive()
  learning_step_good: number;

  @IsInt()
  @IsPositive()
  graduating_interval: number;

  @IsInt()
  @IsPositive()
  easy_interval: number;

  @IsDecimal()
  interval_modifier: number;

  @IsDecimal()
  easy_bonus: number;

  @IsNotEmpty()
  @IsUUID()
  language_id: string;
}
