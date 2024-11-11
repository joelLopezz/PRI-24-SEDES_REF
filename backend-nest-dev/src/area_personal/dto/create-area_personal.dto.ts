import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAreaPersonalDto {
  @IsNotEmpty()
  @IsNumber()
  personal_salud_personal_ID: number;

  @IsNotEmpty()
  @IsString()
  area: string;
}
