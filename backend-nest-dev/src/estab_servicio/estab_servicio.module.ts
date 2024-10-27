// estab_servicio.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablecimientoSaludServicio } from './estab_servicio.entity';
import { EstabServicioService } from './estab_servicio.service';
import { EstabServicioController } from './estab_servicio.controller';
import { ServicioModule } from '../servicio/servicio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstablecimientoSaludServicio]),
    ServicioModule, // Importa ServicioModule para usar el repositorio y servicio de Servicio
  ],
  providers: [EstabServicioService],
  controllers: [EstabServicioController],
})
export class EstabServicioModule {}
