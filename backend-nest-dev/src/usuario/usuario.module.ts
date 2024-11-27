import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { UsuarioController } from './usuario.controller';
import { PersonalSaludModule } from '../personal_salud/personal_salud.module'; //
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    forwardRef(() => PersonalSaludModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule {}

