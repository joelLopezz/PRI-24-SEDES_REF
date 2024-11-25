import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cama } from '../cama/cama.entity';
import { CamaService } from './cama.service';
import { CamaController } from './cama.controller';
import { Specialty } from '../specialty/specialty.entity';
import { Servicio } from '../servicio/servico.entity';
import { EstablecimientoSalud } from 'src/establecimiento/establecimiento.entity';
import { HistoriaCamaModule } from '../historial_cama/hostoria_cama.module'; 
import { HistoriaCama } from '../historial_cama/historial_cama.entity';
import {AuthModule} from '../Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cama, Specialty, Servicio, EstablecimientoSalud, HistoriaCama]),
    HistoriaCamaModule,
    AuthModule,
  ],
  controllers: [CamaController],
  providers: [CamaService],
  exports: [CamaService],
})
export class CamaModule {}
