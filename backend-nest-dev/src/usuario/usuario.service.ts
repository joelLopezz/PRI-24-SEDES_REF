/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';
import { PersonalSalud } from '../personal_salud/personal_salud.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(PersonalSalud)
    private personalSaludRepository: Repository<PersonalSalud>,
  ) {}

  // Crear un nuevo usuario con contraseña encriptada y asociarlo con un PersonalSalud
  async createUsuario(data: Partial<Usuario>, queryRunner?: QueryRunner): Promise<Usuario> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.contrasenia, salt);
    const usuario = queryRunner
        ? queryRunner.manager.create(Usuario, {
            ...data,
            contrasenia: hashedPassword,
            fecha_creacion: new Date(),
        })
        : this.usuarioRepository.create({
            ...data,
            contrasenia: hashedPassword,
            fecha_creacion: new Date(),
        });
    return queryRunner
        ? queryRunner.manager.save(usuario)
        : this.usuarioRepository.save(usuario);
}

  // Método para autenticar un usuario
  async validateUsuario(nombreUsuario: string, contrasenia: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: nombreUsuario }, relations: ['personal'] });
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

  // Método para actualizar el rol y el estado de un usuario
  async updateRoleAndStatus(usuario_ID: number, rol: string, estado: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { usuario_ID: usuario_ID } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    usuario.rol = rol;
    usuario.estado = estado;
    usuario.fecha_modificacion = new Date();

    return this.usuarioRepository.save(usuario);
  }

  // Método para desactivar (eliminar lógicamente) un usuario
  async deactivateUsuario(usuario_ID: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { usuario_ID: usuario_ID } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    usuario.estado = 0; // Cambiar el estado a 0 para desactivación lógica
    usuario.fecha_modificacion = new Date();

    return this.usuarioRepository.save(usuario);
  }



  // Método para buscar un usuario por nombre de usuario y correo electrónico
  async findUsuarioByEmailAndUsername(nombreUsuario: string, correoElectronico: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: { 
        nombre_usuario: nombreUsuario,
        personal: {
          correo_electronico: correoElectronico
        }
      },
      relations: ['personal'],
    });
  }

  // Método para validar la contraseña
  async validatePassword(contraseniaActual: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(contraseniaActual, hashedPassword);
  }

  // Método para actualizar la contraseña (sin necesidad de la contraseña actual para ciertos casos)
  async updatePassword(usuario_ID: number, nuevaContrasenia: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { usuario_ID } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
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
