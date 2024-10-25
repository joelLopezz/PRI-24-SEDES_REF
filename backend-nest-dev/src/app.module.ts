import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecialtyModule } from './specialty/specialty.module'; // Importar el módulo de Specialty
import { ServicioModule } from './servicio/servicio.module';
import { TipoModule } from './tipo/tipo.module';
import { EstablecimientoModule } from './establecimiento/establecimiento.module';
import { RedCordinacionModule } from './red-cordinacion/red-cordinacion.module';
import { MunicipioModule } from './municipio/municipio.module';
import { EstabEspecialidadModule } from './estab_especialidad/estab_especialidad.module';

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
    TipoModule,
    EstablecimientoModule,
    RedCordinacionModule,
    MunicipioModule,
    EstabEspecialidadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
