import { IsNotEmpty, Matches } from 'class-validator';

export class CreateReLearningStepDto {
  @IsNotEmpty()
  @Matches(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)
  readonly interval_time: string;
}
