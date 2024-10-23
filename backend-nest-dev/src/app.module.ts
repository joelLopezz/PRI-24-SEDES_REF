import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Controladores y servicios
import { PersonalSaludController } from './personal_salud/personal_salud.controller';
import { PersonalSaludService } from './personal_salud/personal_salud.service';
import { CamaController} from './cama/cama.controller';
import { CamaService } from './cama/cama.service';


// Módulos
import { ReferenciaModule } from './referencias/referencia.module';
import { DatosPacienteModule } from './pacientes/paciente.module';
import { DatosAcompananteModule } from './acompañante/acompañante.module';
import { DatosDiagnosticoModule } from './diagnosticos/diagnostico.module';
import { DatosClinicoModule } from './datosclinicos/datoclinico.module';
import { DatosTransferenciaModule } from './transferencias/transferencia.module';
import { DatosAntecedenteObstetricoModule } from './antecedentesobstetricos/antecedentesobstetrico.module';
import {UsuarioModule} from  './usuario/usuario.module';
import { MailModule } from './correo_electronico/correo.electronico.module';
import { DatosCamaModule } from './cama/cama.module';




// Entidades
import { PersonalSalud } from './personal_salud/personal_salud.entity';
import { PersonalSaludModule } from './personal_salud/personal_salud.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'kowalski',
      database: 'sedesref',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    ReferenciaModule,
    DatosPacienteModule,
    DatosAcompananteModule,
    DatosDiagnosticoModule,
    DatosClinicoModule,
    DatosTransferenciaModule,
    DatosAntecedenteObstetricoModule,
    DatosCamaModule,

    PersonalSaludModule,
    UsuarioModule,
    MailModule,

    TypeOrmModule.forFeature([PersonalSalud]), 
  ],
  controllers: [
    AppController,
    PersonalSaludController, 
    CamaController,
  ],
  providers: [
    AppService,
    PersonalSaludService,
  ],
})
export class AppModule {}
