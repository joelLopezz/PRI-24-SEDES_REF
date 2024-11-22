import { CreatePacienteDto } from "src/paciente/dto/create-paciente.dto";
import { CreateReferenciaDto } from "src/referencia/dto/create-referencia.dto";

export class RegistroCompleteDto {
    paciente: CreatePacienteDto;
    referencia: CreateReferenciaDto;
  }