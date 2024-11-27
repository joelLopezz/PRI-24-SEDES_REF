// auth.controller.ts
import { Controller, Post, Get, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService, DataUser } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para el login de usuario
  @Post('login')
  login(@Body() loginDto: { usuarioID: number; nombre: string; rol: string; establecimientoID: number }) {
    try {
      this.authService.login(loginDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Login exitoso',
      };
    } catch (error) {
      throw new HttpException('Error al iniciar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Endpoint para el logout de usuario
  @Post('logout')
  logout() {
    try {
      this.authService.logout();
      return {
        statusCode: HttpStatus.OK,
        message: 'Logout exitoso',
      };
    } catch (error) {
      throw new HttpException('Error al cerrar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Obtener información del usuario autenticado
  @Get('me')
  getCurrentUser() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new HttpException('No hay usuario autenticado', HttpStatus.UNAUTHORIZED);
    }
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  // Verificar si el usuario está autenticado
  @Get('is-authenticated')
  isAuthenticated() {
    const isAuthenticated = this.authService.isAuthenticated();
    return {
      statusCode: HttpStatus.OK,
      isAuthenticated,
    };
  }
}
