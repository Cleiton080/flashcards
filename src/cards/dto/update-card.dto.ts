import {
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateCardDto {
  @IsString()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly front: string;

  @IsString()
  @IsNotEmpty()
  readonly back: string;

  @IsUUID()
  @IsNotEmpty()
  readonly deck_id: string;

  @IsDecimal()
  readonly ease: number;

  @IsDateString()
  readonly due: Date;
}
