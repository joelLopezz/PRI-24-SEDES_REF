import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolTurnosService } from './rol_turnos.service';
import { RolTurnosController } from './rol_turnos.controller';
import { RolTurno } from './rol_turno.entity';
import { AreaPersonalModule } from '../area_personal/area_personal.module'; // Importa el módulo aquí

@Module({
  imports: [
    TypeOrmModule.forFeature([RolTurno]),
    AreaPersonalModule, // Añadir el módulo de AreaPersonal para utilizar su servicio
  ],
  controllers: [RolTurnosController],
  providers: [RolTurnosService],
})
export class RolTurnosModule {}
