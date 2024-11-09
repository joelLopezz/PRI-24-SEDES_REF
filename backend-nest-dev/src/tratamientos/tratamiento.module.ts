import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tratamientos } from './tratamiento.entity';
import { TratamientoService } from './tratamiento.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tratamientos])],
    providers: [TratamientoService],
    exports: [TratamientoService],
})
export class DatosTratamientoModule {}
