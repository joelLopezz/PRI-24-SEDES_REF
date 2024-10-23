import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntecedenteObstetrico } from './antecedentesobstetrico.entity';
import { AntecedenteObstetricoService } from './antecedentesobstetrico.service';

@Module({
    imports: [TypeOrmModule.forFeature([AntecedenteObstetrico])],
    providers: [AntecedenteObstetricoService],
    exports: [AntecedenteObstetricoService],
})
export class DatosAntecedenteObstetricoModule {}
