import { IsNotEmpty, IsUUID, Matches } from 'class-validator';
import { REVIEW_ANSWEAR } from '../review.enum';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsUUID()
  readonly cardId: string;

  @IsNotEmpty()
  @IsUUID()
  readonly cardAnswerId: REVIEW_ANSWEAR;

  @Matches(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)
  @IsNotEmpty()
  readonly delayResponse: string;
}
