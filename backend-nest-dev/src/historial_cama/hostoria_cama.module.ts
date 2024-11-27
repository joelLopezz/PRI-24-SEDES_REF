// historia_cama.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaCama } from './historial_cama.entity';
import { Cama } from '../cama/cama.entity';
import { HistoriaCamaService } from './historial_cama.service';
import { HistoriaCamaController } from './historial_cama.controller';
import {AuthModule} from '../Auth/auth.module';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([HistoriaCama, Cama]),
    AuthModule, 
  ],
  providers: [HistoriaCamaService],
  controllers: [HistoriaCamaController],
  exports: [HistoriaCamaService, TypeOrmModule],
})
export class HistoriaCamaModule {}
