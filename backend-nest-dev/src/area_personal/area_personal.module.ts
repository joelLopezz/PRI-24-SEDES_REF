import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaPersonalService } from './area_personal.service';
import { AreaPersonalController } from './area_personal.controller';
import { AreaPersonal } from './area_personal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaPersonal])],
  providers: [AreaPersonalService],
  controllers: [AreaPersonalController],
  exports: [AreaPersonalService], // Exporta el servicio para que pueda ser utilizado en otros módulos
})
export class AreaPersonalModule {}
