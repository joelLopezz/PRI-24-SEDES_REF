// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsuarioService } from './usuario.service';
// import { Usuario } from './usuario.entity';
// import { UsuarioController } from './usuario.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([Usuario])], 
//   controllers: [UsuarioController],
//   providers: [UsuarioService], 
//   exports: [UsuarioService],
// })
// export class UsuarioModule {}

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { UsuarioController } from './usuario.controller';
import { PersonalSaludModule } from '../personal_salud/personal_salud.module';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    forwardRef(() => PersonalSaludModule), // Utilizamos forwardRef para evitar la dependencia circular
    forwardRef(() => AuthModule), // Importar AuthModule utilizando forwardRef
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService, TypeOrmModule], // Exportamos el servicio y el TypeOrmModule si otros módulos requieren el repositorio de Usuario
})
export class UsuarioModule {}

