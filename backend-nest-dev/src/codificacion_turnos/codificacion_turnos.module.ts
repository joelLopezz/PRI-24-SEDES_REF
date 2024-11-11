import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodificacionTurnosService } from './codificacion_turnos.service';
import { CodificacionTurnosController } from './codificacion_turnos.controller';
import { CodificacionTurno } from './codificacion_turno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CodificacionTurno])],
  controllers: [CodificacionTurnosController],
  providers: [CodificacionTurnosService],
})
export class CodificacionTurnosModule {}
