import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], 
  controllers: [UsuarioController],
  providers: [UsuarioService], 
  exports: [UsuarioService],
})
export class UsuarioModule {}
