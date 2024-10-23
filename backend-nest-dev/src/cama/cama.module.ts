import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamaService } from './cama.service';
import { CamaController } from './cama.controller';
import { Cama } from './cama.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cama])], // Importamos el repositorio de la entidad Cama
  providers: [CamaService], // Registramos el servicio de Cama
  controllers: [CamaController], // Registramos el controlador de Cama
})
export class DatosCamaModule {}
