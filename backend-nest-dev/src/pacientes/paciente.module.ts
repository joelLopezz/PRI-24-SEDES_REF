import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { PacientesService } from './paciente.service';

@Module({
    imports: [TypeOrmModule.forFeature([Paciente])],
    providers: [PacientesService],
    exports: [PacientesService],
})
export class DatosPacienteModule {}
