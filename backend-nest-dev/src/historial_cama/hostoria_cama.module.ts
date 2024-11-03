// historia_cama.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaCama } from './historial_cama.entity';
import { Cama } from '../cama/cama.entity';
import { HistoriaCamaService } from './historial_cama.service';
import { HistoriaCamaController } from './historial_cama.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaCama, Cama])],
  providers: [HistoriaCamaService],
  controllers: [HistoriaCamaController],
})
export class HistoriaCamaModule {}
