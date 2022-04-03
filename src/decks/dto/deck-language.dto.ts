import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeckLanguageDto {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
}
