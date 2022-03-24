import { IsNotEmpty, IsString, Max } from 'class-validator';

export class UpdateLanguageDto {
  @IsString()
  @Max(45)
  @IsNotEmpty()
  name: string;
}
