import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}



   // Crear un nuevo usuario con contraseña encriptada
   async createUsuario(data: Partial<Usuario>, queryRunner: QueryRunner): Promise<Usuario> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.contrasenia, salt);

    const usuario = this.usuarioRepository.create({
      ...data,
      contrasenia: hashedPassword,
      fecha_creacion: new Date(),
    });

    return queryRunner.manager.save(usuario); 
  }


  // Método para autenticar un usuario
    async validateUsuario(nombreUsuario: string, contrasenia: string): Promise<Usuario> {
      const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: nombreUsuario } });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Verificar la contraseña usando bcrypt
      const isPasswordMatching = await bcrypt.compare(contrasenia, usuario.contrasenia);
      if (!isPasswordMatching) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }

      return usuario; 
    }



    // Método para actualizar la contraseña (requiere la contraseña actual y la nueva)
  async updatePassword(usuario_ID: number, contraseniaActual: string, nuevaContrasenia: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { usuario_ID } });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si la contraseña actual es correcta
    const isPasswordMatching = await bcrypt.compare(contraseniaActual, usuario.contrasenia);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('La contraseña actual es incorrecta');
    }

    // Generar un nuevo hash para la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nuevaContrasenia, salt);

    // Actualizar la contraseña y la fecha de modificación
    usuario.contrasenia = hashedPassword;
    usuario.fecha_modificacion = new Date();

    // Guardar el usuario actualizado
    return this.usuarioRepository.save(usuario);
  }
}
