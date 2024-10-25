import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './servicio.entity';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { Specialty } from '../specialty/specialty.entity'; // Importa la entidad Specialty
import { SpecialtyModule } from '../specialty/specialty.module'; // Importa el módulo Specialty
import { Tipo } from '../tipo/tipo.entity';
import { TipoModule } from '../tipo/tipo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicio, Tipo, Specialty]), // Asegúrate de que Specialty esté incluido aquí
    SpecialtyModule, // Importar el SpecialtyModule
    TipoModule,
  ],
  controllers: [ServicioController],
  providers: [ServicioService],
})
export class ServicioModule {}
