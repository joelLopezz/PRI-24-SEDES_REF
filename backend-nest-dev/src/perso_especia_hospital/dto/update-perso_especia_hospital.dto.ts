import { PartialType } from '@nestjs/mapped-types';
import { CreatePersoEspeciaHospitalDto } from './create-perso_especia_hospital.dto';

export class UpdatePersoEspeciaHospitalDto extends PartialType(CreatePersoEspeciaHospitalDto) {}
