// cama.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cama } from '../cama/cama.entity';
import { CamaService } from './cama.service';
import { CamaController } from './cama.controller';
import { Especialidad } from '../especiaidad/especialidad.entity';
import { Servicio } from '../servicio/servico.entity';
import { EstablecimientoSalud } from 'src/establecimiento/establecimiento.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cama, Especialidad, Servicio, EstablecimientoSalud])],
  controllers: [CamaController],
  providers: [CamaService],
  exports: [CamaService],
})
export class CamaModule {}
