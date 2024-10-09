import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablecimientoController } from './establecimiento.controller';
import { EstablecimientoService } from './establecimiento.service';
import { EstablecimientoSalud } from './establecimiento.entity';
import { RedCordinacionModule } from '../red-cordinacion/red-cordinacion.module'; // Importar el módulo de Red Cordinacion

@Module({
  imports: [
    TypeOrmModule.forFeature([EstablecimientoSalud]), // Registrar la entidad de establecimiento
    RedCordinacionModule, // Importar el módulo de red de coordinación
  ],
  controllers: [EstablecimientoController],
  providers: [EstablecimientoService],
})
export class EstablecimientoModule {}
