import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadService } from './especialidad.service';
import { EspecialidadController } from './especialidad.controller';
import { Especialidad } from './especialidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidad])], // Importamos el repositorio de la entidad Cama
  providers: [EspecialidadService], // Registramos el servicio de Cama
  controllers: [EspecialidadController], // Registramos el controlador de Cama
})
export class CamaModule {}
