// src/registro/dto/registro-update.dto.ts
import { UpdatePacienteDto } from 'src/paciente/dto/update-paciente.dto';
import { UpdateReferenciaDto } from 'src/referencia/dto/update-referencia.dto';

export class UpdateRegistroDto {
  paciente: UpdatePacienteDto;
  referencia: UpdateReferenciaDto;
}
