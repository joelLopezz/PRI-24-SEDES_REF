// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { PersonalSaludService } from './personal_salud.service';
// import { PersonalSaludController } from './personal_salud.controller';
// import { PersonalSalud } from './personal_salud.entity';
// import { UsuarioModule } from '../usuario/usuario.module';
// import { MailModule } from '../correo_electronico/correo.electronico.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([PersonalSalud]),  
//     UsuarioModule, 
//     MailModule,  
//     UsuarioModule
//   ],
//   providers: [PersonalSaludService],
//   controllers: [PersonalSaludController],
// })
// export class PersonalSaludModule {}



import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalSaludService } from './personal_salud.service';
import { PersonalSaludController } from './personal_salud.controller';
import { PersonalSalud } from './personal_salud.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { MailModule } from '../correo_electronico/correo.electronico.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonalSalud]),  
    forwardRef(() => UsuarioModule), // Utilizamos forwardRef para evitar la dependencia circular
    MailModule,  
  ],
  providers: [PersonalSaludService],
  controllers: [PersonalSaludController],
  exports: [TypeOrmModule], // Exportamos el TypeOrmModule para que otros módulos puedan acceder al repositorio de PersonalSalud
})
export class PersonalSaludModule {}
