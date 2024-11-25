// src/registro/registro.module.ts
import { Module } from '@nestjs/common';
import { PacienteModule } from '../paciente/paciente.module';
import { ReferenciaModule } from '../referencia/referencia.module';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';

@Module({
  imports: [PacienteModule, ReferenciaModule],
  providers: [RegistroService],
  controllers: [RegistroController],
})
export class RegistroModule {}
