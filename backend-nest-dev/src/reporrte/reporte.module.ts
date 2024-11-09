/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteService } from './reporte.service';
import { ReporteController } from './reporte.controller';
import { HistoriaCama } from '../historial_cama/historial_cama.entity';
import { Cama } from '../cama/cama.entity';
import { Specialty } from '../specialty/specialty.entity';
import { EstablecimientoSalud } from '../establecimiento/establecimiento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoriaCama, Cama, Specialty, EstablecimientoSalud]),
  ],
  providers: [ReporteService],
  controllers: [ReporteController],
})
export class ReporteModule {}
