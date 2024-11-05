import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteService } from './reporte.service';
import { ReporteController } from './reporte.controller';
import { HistoriaCama } from '../historial_cama/historial_cama.entity';
import { Cama } from '../cama/cama.entity';
import { Especialidad } from '../especiaidad/especialidad.entity';
import { EstablecimientoSalud } from '../establecimiento/establecimiento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoriaCama, Cama, Especialidad, EstablecimientoSalud]),
  ],
  providers: [ReporteService],
  controllers: [ReporteController],
})
export class ReporteModule {}
