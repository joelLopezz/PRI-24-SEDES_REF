/* eslint-disable prettier/prettier */
import { Controller, Post, Put, Param, Body, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthService } from '../Auth/auth.service';
// import Login from '../../../Frontend-React-Dev/src/pages/Login/login';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService, // Inyectar el AuthService aquí
  ) {}


  // Login de usuario
  @Post('login')
  async login(@Body() loginDto: { nombre_usuario: string, contrasenia: string }) {
    try {
      const { nombre_usuario, contrasenia } = loginDto;
      const usuario = await this.usuarioService.validateUsuario(nombre_usuario, contrasenia);

      // Almacenar los datos del usuario en el servicio de autenticación
      this.authService.login({
        usuarioID: usuario.usuario_ID,
        nombre: usuario.nombre_usuario,
        rol: usuario.rol,
        establecimientoID: usuario.establecimiento_id,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Login exitoso',
        data: {
          usuario_ID: usuario.usuario_ID,
          nombre_usuario: usuario.nombre_usuario,
          rol: usuario.rol,
          estado: usuario.estado,
          establecimiento_id: usuario.establecimiento_id, // Agregar establecimiento_id
          nombres: usuario.personal.nombres, // Agregar nombres desde la relación personal_salud
          primer_apellido: usuario.personal.primer_apellido, // Agregar primer_apellido
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      };
    }
  }
  

  // Actualizar la contraseña del usuario
  @Put(':usuario_ID/contrasenia')
  async updatePassword(
    @Param('usuario_ID') usuario_ID: number,
    @Body('contraseniaActual') contraseniaActual: string, // Incluye la contraseña actual
    @Body('nuevaContrasenia') nuevaContrasenia: string,
  ) {
    try {
      await this.usuarioService.updatePassword(usuario_ID, contraseniaActual, nuevaContrasenia);

      return {
        statusCode: HttpStatus.OK,
        message: 'Contraseña actualizada exitosamente',
      };
    } catch (error) {
      return {
        statusCode: error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }
}
