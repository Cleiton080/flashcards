import { IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @IsNotEmpty()
  @Max(45)
  name: string;
}
