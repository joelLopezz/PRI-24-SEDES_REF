// src/servicio/servicio.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './servicio.entity';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { Tipo } from '../tipo/tipo.entity';
import { TipoModule } from '../tipo/tipo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicio, Tipo]), // Asegúrate de importar las entidades Servicio y Tipo
    TipoModule,
  ],
  controllers: [ServicioController],
  providers: [ServicioService],
})
export class ServicioModule {}
