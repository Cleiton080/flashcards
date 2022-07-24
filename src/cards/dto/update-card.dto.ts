import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
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
}
