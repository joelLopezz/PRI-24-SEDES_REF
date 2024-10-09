import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedCordinacionController } from './red-cordinacion.controller';
import { RedCordinacionService } from './red-cordinacion.service';
import { RedCordinacion } from './red-cordinacion.entity'; // Importar la entidad de Red Cordinacion

@Module({
  imports: [TypeOrmModule.forFeature([RedCordinacion])], // Registrar la entidad Red Cordinacion
  controllers: [RedCordinacionController],
  providers: [RedCordinacionService],
})
export class RedCordinacionModule {}
