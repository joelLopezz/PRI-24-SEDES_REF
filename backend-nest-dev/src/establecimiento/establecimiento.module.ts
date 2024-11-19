import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablecimientoController } from './establecimiento.controller';
import { EstablecimientoService } from './establecimiento.service';
import { EstablecimientoSalud } from './establecimiento.entity';
import { RedCordinacionModule } from '../red-cordinacion/red-cordinacion.module';
import { MunicipioModule } from '../municipio/municipio.module'; // Importar el módulo de Municipio

@Module({
  imports: [
    TypeOrmModule.forFeature([EstablecimientoSalud]), // Registrar la entidad de establecimiento
    RedCordinacionModule, // Importar el módulo de red de coordinación
    MunicipioModule, // Importar el módulo de municipio
  ],
  controllers: [EstablecimientoController],
  providers: [EstablecimientoService],
  exports: [TypeOrmModule, EstablecimientoModule],
})
export class EstablecimientoModule {}
