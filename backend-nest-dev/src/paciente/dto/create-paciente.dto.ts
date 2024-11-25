// src/paciente/dto/create-paciente.dto.ts
import { IsNotEmpty, IsOptional, IsDateString, IsString, IsNumber } from 'class-validator';

export class CreatePacienteDto {
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @IsNotEmpty()
  @IsString()
  primer_apellido: string;

  @IsNotEmpty()
  @IsString()
  segundo_apellido: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_nacimiento: Date;

  @IsNotEmpty()
  @IsString()
  ci: string;

  @IsOptional()
  @IsString()
  domicilio?: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsString()
  historia_clinica?: string;

  @IsOptional()
  @IsString()
  procedencia?: string;

  @IsNotEmpty()
  @IsString()
  sexo: string;

  @IsNotEmpty()
  @IsString()
  discapacidad: string;

  @IsOptional()
  @IsString()
  tipo_discapacidad?: string;

  @IsOptional()
  @IsString()
  grado_discapacidad?: string;

  @IsNotEmpty()
  @IsNumber()
  estado: number;

  @IsOptional()
  @IsDateString()
  fecha_creacion?: Date;

  @IsOptional()
  @IsDateString()
  fecha_modificacion?: Date;

  @IsNotEmpty()
  @IsNumber()
  usuario_creacion: number;

  @IsOptional()
  @IsNumber()
  usuario_modificacion?: number;
}
