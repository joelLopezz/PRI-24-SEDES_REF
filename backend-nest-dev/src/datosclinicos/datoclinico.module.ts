import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosClinicos } from './datoclinico.entity';
import { DatosClinicosService } from './datoclinico.service';

@Module({
    imports: [TypeOrmModule.forFeature([DatosClinicos])],
    providers: [DatosClinicosService],
    exports: [DatosClinicosService],
})
export class DatosClinicoModule {}
