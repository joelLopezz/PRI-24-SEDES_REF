// servicio.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './servicio.entity';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { Specialty } from '../specialty/specialty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicio, Specialty]), // Asegúrate de incluir la entidad Specialty
  ],
  controllers: [ServicioController],
  providers: [ServicioService],
  exports: [ServicioService, TypeOrmModule], // Exporta el servicio y el módulo TypeOrm para otros módulos
})
export class ServicioModule {}
