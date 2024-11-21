import { Module } from '@nestjs/common';
import { PersoEspeciaHospitalService } from './perso_especia_hospital.service';
import { PersoEspeciaHospitalController } from './perso_especia_hospital.controller';
import { PersoEspeciaHospital } from './entities/perso_especia_hospital.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalSalud } from 'src/personal_salud/personal_salud.entity';
import { Specialty } from 'src/specialty/specialty.entity';
import { EstablecimientoSalud } from 'src/establecimiento/establecimiento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersoEspeciaHospital,
      PersonalSalud,
      Specialty,
      EstablecimientoSalud,
    ]),
  ],
  controllers: [PersoEspeciaHospitalController],
  providers: [PersoEspeciaHospitalService],
  exports: [PersoEspeciaHospitalService],
})
export class PersoEspeciaHospitalModule {}

