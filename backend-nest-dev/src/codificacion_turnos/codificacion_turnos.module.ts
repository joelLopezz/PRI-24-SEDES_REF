import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodificacionTurnosService } from './codificacion_turnos.service';
import { CodificacionTurnosController } from './codificacion_turnos.controller';
import { CodificacionTurno } from './codificacion_turno.entity';
import { AuthModule } from '../Auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([CodificacionTurno]),
    forwardRef(() => AuthModule),],
  controllers: [CodificacionTurnosController],
  providers: [CodificacionTurnosService],
})
export class CodificacionTurnosModule {}
