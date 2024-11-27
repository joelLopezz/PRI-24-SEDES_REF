// src/paciente/dto/update-paciente.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePacienteDto } from './create-paciente.dto';

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {
    nombres?: string;
    primer_apellido?: string;
    segundo_apellido?: string;
    fecha_nacimiento?: Date;
    ci?: string;
    domicilio?: string;
    telefono?: string;
    historia_clinica?: string;
    procedencia?: string;
    sexo?: string;
    discapacidad?: string;
    tipo_discapacidad?: string;
    grado_discapacidad?: string;
}
