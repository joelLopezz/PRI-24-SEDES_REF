import { Module } from '@nestjs/common';
import { PersoEspeciaHospitalService } from './perso_especia_hospital.service';
import { PersoEspeciaHospitalController } from './perso_especia_hospital.controller';

@Module({
  controllers: [PersoEspeciaHospitalController],
  providers: [PersoEspeciaHospitalService],
})
export class PersoEspeciaHospitalModule {}
