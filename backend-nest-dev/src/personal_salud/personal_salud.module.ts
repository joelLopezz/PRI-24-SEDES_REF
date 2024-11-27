import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalSaludService } from './personal_salud.service';
import { PersonalSaludController } from './personal_salud.controller';
import { PersonalSalud } from './personal_salud.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { MailModule } from '../correo_electronico/correo.electronico.module';
import { AuthModule } from '../Auth/auth.module'; 
import { PersoEspeciaHospitalModule } from '../perso_especia_hospital/perso_especia_hospital.module'; 
import { EstablecimientoSalud } from '../establecimiento/establecimiento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonalSalud, EstablecimientoSalud]),  
    forwardRef(() => UsuarioModule),
    MailModule,  
    forwardRef(() => AuthModule),
    PersoEspeciaHospitalModule, 
  ],
  providers: [PersonalSaludService],
  controllers: [PersonalSaludController],
  exports: [TypeOrmModule, PersonalSaludService],
})
export class PersonalSaludModule {}

