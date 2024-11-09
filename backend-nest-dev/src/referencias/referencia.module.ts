import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenciaService } from './referencia.service';
import { ReferenciaController } from './referencia.controller';
import { Referencia } from './referencia.entity';
import { Paciente } from '../pacientes/paciente.entity'; // Importa el módulo de 
import { DatosPacienteModule } from '../pacientes/paciente.module'; // Importa el servicio de
import { DatosAcompananteModule } from '../acompañante/acompañante.module'; // Otros módulos relacionados
import { DatosDiagnosticoModule } from '../diagnosticos/diagnostico.module';
import { DatosClinicoModule } from '../datosclinicos/datoclinico.module';
import { DatosTransferenciaModule } from '../transferencias/transferencia.module';
import { DatosAntecedenteObstetricoModule } from '../antecedentesobstetricos/antecedentesobstetrico.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Referencia]),
    DatosPacienteModule,  // Importa el módulo de Paciente aquí
    DatosAcompananteModule,
    DatosDiagnosticoModule,
    DatosClinicoModule,
    DatosTransferenciaModule,
    DatosAntecedenteObstetricoModule,
  ],
  providers: [ReferenciaService],
  controllers: [ReferenciaController],
})
export class ReferenciaModule {}



// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { ReferenciaService } from "./referencia.service";
// import { ReferenciaController } from "./referencia.controller";
// import { Referencia } from "./referencia.entity";

// @Module({
//     imports: [TypeOrmModule.forFeature([Referencia])],
//     controllers: [ReferenciaController],
//     providers: [ReferenciaService],
// })
// export class ReferenciaModule {}