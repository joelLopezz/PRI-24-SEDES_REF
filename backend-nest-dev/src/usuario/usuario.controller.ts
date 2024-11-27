import { Controller, Post, Put, Param, Body, HttpStatus, NotFoundException, Logger } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthService } from '../Auth/auth.service';

@Controller('usuario')
export class UsuarioController {
  [x: string]: any;
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService,
  ) {}


  // Login de usuario
  @Post('login')
  async login(@Body() loginDto: { nombre_usuario: string, contrasenia: string }) {
    try {
      const { nombre_usuario, contrasenia } = loginDto;
      const usuario = await this.usuarioService.validateUsuario(nombre_usuario, contrasenia);

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
          establecimiento_id: usuario.establecimiento_id, 
          nombres: usuario.personal.nombres,
          primer_apellido: usuario.personal.primer_apellido,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      };
    }
  }
  
  // Recuperar contraseña del usuario
  @Put('recuperar-contrasenia')
  async recoverPassword(
    @Body('correoElectronico') correoElectronico: string,
    @Body('contraseniaActual') contraseniaActual: string,
    @Body('nuevaContrasenia') nuevaContrasenia: string,
  ) {
    try {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Usuario no autenticado',
        };
      }

      const usuario = await this.usuarioService.findUsuarioByEmailAndUsername(currentUser.nombre, correoElectronico);
      if (!usuario) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró un usuario con el correo proporcionado',
        };
      }

      // Validar la contraseña actual
      const isPasswordMatching = await this.usuarioService.validatePassword(contraseniaActual, usuario.contrasenia);
      if (!isPasswordMatching) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'La contraseña actual es incorrecta',
        };
      }

      await this.usuarioService.updatePassword(usuario.usuario_ID, nuevaContrasenia);

      return {
        statusCode: HttpStatus.OK,
        message: 'Contraseña actualizada exitosamente',
      };
    } catch (error) {
      this.logger.error(`Error al recuperar contraseña: ${error.message}`);
      return {
        statusCode: error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }
}
