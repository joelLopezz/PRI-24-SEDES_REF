import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabEspecialidadService } from './estab_especialidad.service';
import { EstabEspecialidadController } from './estab_especialidad.controller';
import { EstablecimientoSaludHasEspecialidad } from './estab_especialidad.entity'; // Asegúrate de importar la entidad correcta
import { Specialty } from '../specialty/specialty.entity'
import { AuthService } from '../Auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstablecimientoSaludHasEspecialidad, Specialty])], // Importa la entidad aquí
  providers: [EstabEspecialidadService, AuthService],
  controllers: [EstabEspecialidadController],
})
export class EstabEspecialidadModule {}
