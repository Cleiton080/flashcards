import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  name: string;
}
