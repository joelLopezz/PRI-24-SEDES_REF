import { PartialType } from '@nestjs/mapped-types';
import { CreateRolTurnoDto } from './create-rol_turno.dto';

export class UpdateRolTurnoDto extends PartialType(CreateRolTurnoDto) {}
