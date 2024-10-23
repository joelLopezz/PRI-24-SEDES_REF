import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acompanante } from './acompañante.entity';
import { DatosAcompananteService } from './acompañante.service';

@Module({
    imports: [TypeOrmModule.forFeature([Acompanante])],
    providers: [DatosAcompananteService],
    exports: [DatosAcompananteService],
})
export class DatosAcompananteModule {}
