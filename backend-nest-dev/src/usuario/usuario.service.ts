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
  async createUsuario(data: Partial<Usuario>, queryRunner: QueryRunner): Promise<Usuario> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.contrasenia, salt);

    // Verificar que el personal_ID esté asociado a un PersonalSalud existente
    // if (data.personal && data.personal.personal_ID) {
    //   const personalSalud = await this.personalSaludRepository.findOne({ where: { personal_ID: data.personal.personal_ID } });
    //   if (!personalSalud) {
    //     throw new NotFoundException('Personal de salud asociado no encontrado');
    //   }
    //   data.personal = personalSalud; // Asociamos el objeto PersonalSalud completo a data.personal
    // }

    const usuario = this.usuarioRepository.create({
      ...data,
      contrasenia: hashedPassword,
      fecha_creacion: new Date(),
    });

    return queryRunner.manager.save(usuario);
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

  // Método para actualizar la contraseña (requiere la contraseña actual y la nueva)
  async updatePassword(usuario_ID: number, contraseniaActual: string, nuevaContrasenia: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: {usuario_ID: usuario_ID } });

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
}










// import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, QueryRunner } from 'typeorm';
// import * as bcrypt from 'bcrypt'; 
// import { Usuario } from './usuario.entity';
// import { PersonalSalud } from '../personal_salud/personal_salud.entity';

// @Injectable()
// export class UsuarioService {
//   constructor(
//     @InjectRepository(Usuario)
//     private usuarioRepository: Repository<Usuario>,
//     @InjectRepository(PersonalSalud)
//     private personalSaludRepository: Repository<PersonalSalud>,
//   ) {}

//   // Crear un nuevo usuario con contraseña encriptada y asociarlo con un PersonalSalud
//   async createUsuario(data: Partial<Usuario>, queryRunner: QueryRunner): Promise<Usuario> {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(data.contrasenia, salt);

//     // Verificar que el personal_ID esté asociado a un PersonalSalud existente
//     if (data.personal_ID) {
//       const personalSalud = await this.personalSaludRepository.findOne({ where: { personal_ID: data.personal_ID } });
//       if (!personalSalud) {
//         throw new NotFoundException('Personal de salud asociado no encontrado');
//       }
//     }

//     const usuario = this.usuarioRepository.create({
//       ...data,
//       contrasenia: hashedPassword,
//       fecha_creacion: new Date(),
//     });

//     return queryRunner.manager.save(usuario); 
//   }

//   // Método para autenticar un usuario
//   async validateUsuario(nombreUsuario: string, contrasenia: string): Promise<Usuario> {
//     const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: nombreUsuario }, relations: ['personal'] });

//     if (!usuario) {
//       throw new NotFoundException('Usuario no encontrado');
//     }

//     // Verificar la contraseña usando bcrypt
//     const isPasswordMatching = await bcrypt.compare(contrasenia, usuario.contrasenia);
//     if (!isPasswordMatching) {
//       throw new UnauthorizedException('Credenciales incorrectas');
//     }

//     return usuario; 
//   }

//   // Método para actualizar la contraseña (requiere la contraseña actual y la nueva)
//   async updatePassword(usuario_ID: number, contraseniaActual: string, nuevaContrasenia: string): Promise<Usuario> {
//     const usuario = await this.usuarioRepository.findOne({ where: { usuario_ID } });

//     if (!usuario) {
//       throw new NotFoundException('Usuario no encontrado');
//     }

//     // Verificar si la contraseña actual es correcta
//     const isPasswordMatching = await bcrypt.compare(contraseniaActual, usuario.contrasenia);
//     if (!isPasswordMatching) {
//       throw new UnauthorizedException('La contraseña actual es incorrecta');
//     }

//     // Generar un nuevo hash para la nueva contraseña
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(nuevaContrasenia, salt);

//     // Actualizar la contraseña y la fecha de modificación
//     usuario.contrasenia = hashedPassword;
//     usuario.fecha_modificacion = new Date();

//     // Guardar el usuario actualizado
//     return this.usuarioRepository.save(usuario);
//   }

//   // Método para actualizar el rol y el estado de un usuario
//   async updateRoleAndStatus(usuario_ID: number, rol: string, estado: number): Promise<Usuario> {
//     const usuario = await this.usuarioRepository.findOne({ where: { usuario_ID } });

//     if (!usuario) {
//       throw new NotFoundException('Usuario no encontrado');
//     }

//     usuario.rol = rol;
//     usuario.estado = estado;
//     usuario.fecha_modificacion = new Date();

//     return this.usuarioRepository.save(usuario);
//   }

//   // Método para desactivar (eliminar lógicamente) un usuario
//   async deactivateUsuario(usuario_ID: number): Promise<Usuario> {
//     const usuario = await this.usuarioRepository.findOne({ where: { usuario_ID } });

//     if (!usuario) {
//       throw new NotFoundException('Usuario no encontrado');
//     }

//     usuario.estado = 0; // Cambiar el estado a 0 para desactivación lógica
//     usuario.fecha_modificacion = new Date();

//     return this.usuarioRepository.save(usuario);
//   }
// }














// import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, QueryRunner } from 'typeorm';
// import * as bcrypt from 'bcrypt'; 
// import { Usuario } from './usuario.entity';

// @Injectable()
// export class UsuarioService {
//   constructor(
//     @InjectRepository(Usuario)
//     private usuarioRepository: Repository<Usuario>,
//   ) {}



//    // Crear un nuevo usuario con contraseña encriptada
//    async createUsuario(data: Partial<Usuario>, queryRunner: QueryRunner): Promise<Usuario> {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(data.contrasenia, salt);

//     const usuario = this.usuarioRepository.create({
//       ...data,
//       contrasenia: hashedPassword,
//       fecha_creacion: new Date(),
//     });

//     return queryRunner.manager.save(usuario); 
//   }


//   // Método para autenticar un usuario
//     async validateUsuario(nombreUsuario: string, contrasenia: string): Promise<Usuario> {
//       const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: nombreUsuario } });

//       if (!usuario) {
//         throw new NotFoundException('Usuario no encontrado');
//       }

//       // Verificar la contraseña usando bcrypt
//       const isPasswordMatching = await bcrypt.compare(contrasenia, usuario.contrasenia);
//       if (!isPasswordMatching) {
//         throw new UnauthorizedException('Credenciales incorrectas');
//       }

//       return usuario; 
//     }



//     // Método para actualizar la contraseña (requiere la contraseña actual y la nueva)
//   async updatePassword(usuario_ID: number, contraseniaActual: string, nuevaContrasenia: string): Promise<Usuario> {
//     const usuario = await this.usuarioRepository.findOne({ where: { usuario_ID } });

//     if (!usuario) {
//       throw new NotFoundException('Usuario no encontrado');
//     }

//     // Verificar si la contraseña actual es correcta
//     const isPasswordMatching = await bcrypt.compare(contraseniaActual, usuario.contrasenia);
//     if (!isPasswordMatching) {
//       throw new UnauthorizedException('La contraseña actual es incorrecta');
//     }

//     // Generar un nuevo hash para la nueva contraseña
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(nuevaContrasenia, salt);

//     // Actualizar la contraseña y la fecha de modificación
//     usuario.contrasenia = hashedPassword;
//     usuario.fecha_modificacion = new Date();

//     // Guardar el usuario actualizado
//     return this.usuarioRepository.save(usuario);
//   }
// }
