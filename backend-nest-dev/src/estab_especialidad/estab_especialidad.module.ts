import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabEspecialidadService } from './estab_especialidad.service';
import { EstabEspecialidadController } from './estab_especialidad.controller';
import { EstablecimientoSaludHasEspecialidad } from './estab_especialidad.entity'; // Asegúrate de importar la entidad correcta

@Module({
  imports: [TypeOrmModule.forFeature([EstablecimientoSaludHasEspecialidad])], // Importa la entidad aquí
  providers: [EstabEspecialidadService],
  controllers: [EstabEspecialidadController],
})
export class EstabEspecialidadModule {}
