import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablecimientoService } from './establecimiento.service';
import { EstablecimientoController } from './establecimiento.controller';
import { EstablecimientoSalud } from './establecimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstablecimientoSalud])], // Importamos el repositorio de la entidad Cama
  providers: [EstablecimientoService], // Registramos el servicio de Cama
  controllers: [EstablecimientoController], // Registramos el controlador de Cama
})
export class CamaModule {}
