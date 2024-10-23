import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamaService } from './cama.service';
import { CamaController } from './cama.controller';
import { Cama } from './cama.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cama])], 
  providers: [CamaService], 
  controllers: [CamaController],
})
export class DatosCamaModule {}
