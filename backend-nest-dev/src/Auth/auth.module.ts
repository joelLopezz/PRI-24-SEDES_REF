// auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // Exportar AuthService
})
export class AuthModule {}
