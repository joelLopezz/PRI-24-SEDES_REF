import { Controller, Post, Put, Param, Body, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';  // Asegúrate de importar correctamente el servicio

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

     // login
  @Post('login')
  async login(@Body() loginDto: { nombre_usuario: string, contrasenia: string }) {
    const { nombre_usuario, contrasenia } = loginDto;
    const usuario = await this.usuarioService.validateUsuario(nombre_usuario, contrasenia);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      usuario_ID: usuario.usuario_ID,
      nombre_usuario: usuario.nombre_usuario,
      rol: usuario.rol,
      estado: usuario.estado,
    };
  }



  // Actualizar la contraseña
  @Put(':usuario_ID/contrasenia')
  async updatePassword(
    @Param('usuario_ID') usuario_ID: number,
    @Body('contraseniaActual') contraseniaActual: string, // Incluye la contraseña actual
    @Body('nuevaContrasenia') nuevaContrasenia: string,
  ) {
    const usuario = await this.usuarioService.updatePassword(usuario_ID, contraseniaActual, nuevaContrasenia); // Pasa los tres parámetros

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return { mensaje: 'Contraseña actualizada exitosamente' };
  }



  // // Actualizar la contraseña
  // @Put(':usuario_ID/contrasenia')
  // async updatePassword(
  //   @Param('usuario_ID') usuario_ID: number,
  //   @Body('nuevaContrasenia') nuevaContrasenia: string,
  // ) {
  //   const usuario = await this.usuarioService.updatePassword(usuario_ID, nuevaContrasenia);

  //   if (!usuario) {
  //     throw new NotFoundException('Usuario no encontrado');
  //   }

  //   return { mensaje: 'Contraseña actualizada exitosamente' };
  // }
  
}