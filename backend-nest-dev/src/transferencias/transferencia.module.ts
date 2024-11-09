import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transferencia } from './transferencia.entity';
import { TransferenciasService } from './transferencia.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transferencia])],
    providers: [TransferenciasService],
    exports: [TransferenciasService],
})
export class DatosTransferenciaModule {}
