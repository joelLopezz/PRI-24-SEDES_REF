import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
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
}