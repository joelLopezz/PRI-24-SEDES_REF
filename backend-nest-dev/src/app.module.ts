import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Specialty } from './specialty/specialty.entity'; // Importar la entidad Specialty
import { SpecialtyService } from './specialty/specialty.service';
import { SpecialtyController } from './specialty/specialty.controller';

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
        synchronize: true, // Solo en desarrollo. Desactívalo en producción.
      }),
    }),
    TypeOrmModule.forFeature([Specialty]), // Importar el módulo de Specialty
  ],
  controllers: [AppController, SpecialtyController],
  providers: [AppService, SpecialtyService],
})
export class AppModule {}
