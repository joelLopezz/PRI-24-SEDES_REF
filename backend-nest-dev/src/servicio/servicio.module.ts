import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { Servicio } from './servico.entity';
import { DatoSEstablecimientoModule } from 'src/establecimiento/establecimiento.module'
import {DatosEspecialidadModule} from 'src/especiaidad/especialidad.module'




@Module({
  imports: [TypeOrmModule.forFeature([Servicio])
], 
  providers: [ServicioService], 
  controllers: [ServicioController],
  //exports: [TypeOrmModule],
  exports:  [ServicioService],

})
export class DatosServicioModule {}
