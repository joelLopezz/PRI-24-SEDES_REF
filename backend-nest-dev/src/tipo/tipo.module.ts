// src/tipo/tipo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoService } from './tipo.service';
import { TipoController } from './tipo.controller';
import { Tipo } from './tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tipo])], // Registra la entidad Tipo con TypeORM
  controllers: [TipoController],
  providers: [TipoService],
})
export class TipoModule {}
