import { IsNotEmpty, IsUUID, Matches } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsUUID()
  readonly cardId: string;

  @IsNotEmpty()
  @IsUUID()
  readonly cardAnswearId: string;

  @Matches(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)
  @IsNotEmpty()
  readonly delayResponse: string;
}
