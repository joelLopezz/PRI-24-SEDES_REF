import { PartialType } from '@nestjs/mapped-types';
import { CreatePersoEspeciaHospitalDto } from './create-perso_especia_hospital.dto';

export class UpdatePersoEspeciaHospitalDto {
    especialidad?: number; // ID de la especialidad (opcional)
    hospital?: number; // ID del hospital (opcional)
  }
  
