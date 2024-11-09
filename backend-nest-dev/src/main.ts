import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar la validación global de DTOs
  app.useGlobalPipes(new ValidationPipe());
  
  // Habilitar CORS con configuración avanzada
  app.enableCors({
    origin: '*', // Reemplaza esto con la URL de tu frontend si es necesario
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Iniciar la aplicación en el puerto 3000
  await app.listen(3000);
}

bootstrap();
