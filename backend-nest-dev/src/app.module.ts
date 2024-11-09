/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecialtyModule } from './specialty/specialty.module'; // Importar el módulo de Specialty
import { ServicioModule } from './servicio/servicio.module';
import { EstablecimientoModule } from './establecimiento/establecimiento.module';
import { RedCordinacionModule } from './red-cordinacion/red-cordinacion.module';
import { MunicipioModule } from './municipio/municipio.module';
import { EstabEspecialidadModule } from './estab_especialidad/estab_especialidad.module';
import { EstabServicioModule } from './estab_servicio/estab_servicio.module';

// Controladores y servicios
import { PersonalSaludController } from './personal_salud/personal_salud.controller';
import { PersonalSaludService } from './personal_salud/personal_salud.service';
import { CamaController } from './cama/cama.controller';
import { CamaService } from './cama/cama.service';

// Módulos
import { ReferenciaModule } from './referencias/referencia.module';
import { DatosPacienteModule } from './pacientes/paciente.module';
import { DatosAcompananteModule } from './acompañante/acompañante.module';
import { DatosDiagnosticoModule } from './diagnosticos/diagnostico.module';
import { DatosClinicoModule } from './datosclinicos/datoclinico.module';
import { DatosTransferenciaModule } from './transferencias/transferencia.module';
import { DatosAntecedenteObstetricoModule } from './antecedentesobstetricos/antecedentesobstetrico.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MailModule } from './correo_electronico/correo.electronico.module';
import { CamaModule } from './cama/cama.module';
import { ReporteModule } from './reporrte/reporte.module';

// Entidades
import { PersonalSalud } from './personal_salud/personal_salud.entity';
import { PersonalSaludModule } from './personal_salud/personal_salud.module';
import { HistoriaCamaModule } from './historial_cama/hostoria_cama.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Solo en desarrollo. Desactívalo en producción.
      }),
    }),
    SpecialtyModule, // Ahora Specialty está encapsulado en su propio módulo
    ServicioModule,
    EstablecimientoModule,
    RedCordinacionModule,
    MunicipioModule,
    EstabEspecialidadModule,
    EstabServicioModule,
    ReferenciaModule,
    DatosPacienteModule,
    DatosAcompananteModule,
    DatosDiagnosticoModule,
    DatosClinicoModule,
    DatosTransferenciaModule,
    DatosAntecedenteObstetricoModule,
    CamaModule,
    PersonalSaludModule,
    UsuarioModule,
    MailModule,
    HistoriaCamaModule,
    ReporteModule,
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
