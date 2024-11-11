import { CreateAreaPersonalDto } from './create-area_personal.dto';
import { IsOptional, IsString, IsNumber, isNumber } from 'class-validator';

export class UpdateAreaPersonalDto {

  @IsNumber()
  area_personal_salud_ID: number;

  @IsOptional()
  @IsString()
  area: string;
}


