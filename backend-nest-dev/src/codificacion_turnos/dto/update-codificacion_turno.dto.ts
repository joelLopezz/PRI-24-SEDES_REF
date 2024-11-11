import { PartialType } from '@nestjs/mapped-types';
import { CreateCodificacionTurnoDto } from './create-codificacion_turno.dto';

export class UpdateCodificacionTurnoDto extends PartialType(CreateCodificacionTurnoDto) {}
