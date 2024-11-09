import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosticos } from './diagnostico.entity';
import { DiagnosticosService } from './diagnostico.service';

@Module({
    imports: [TypeOrmModule.forFeature([Diagnosticos])],
    providers: [DiagnosticosService],
    exports: [DiagnosticosService],
})
export class DatosDiagnosticoModule {}
