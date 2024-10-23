import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { PersonalSalud } from './personal_salud.entity';

import { UsuarioService } from '../usuario/usuario.service';  
import { MailService } from '../correo_electronico/correo_electronico.service';
import { Usuario } from '../usuario/usuario.entity';  
import { CreatePersonalSaludDto } from './dto/personal_salud.dto';
 


@Injectable()
export class PersonalSaludService {
  constructor(
    @InjectRepository(PersonalSalud)
    private personalSaludRepository: Repository<PersonalSalud>,
    private usuarioService: UsuarioService, 
    private mailService: MailService,
    private dataSource: DataSource, 
  ) {}


  // Crear un registro de personal de salud y usuario
  async createPersonalSalud(createPersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
    const { rol, ...personalSaludData } = createPersonalSaludDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Crear el personal de salud
      const personalSalud = this.personalSaludRepository.create(personalSaludData);
      const savedPersonalSalud = await queryRunner.manager.save(personalSalud);

      // Generar nombre de usuario y contraseña
      const nombreUsuario = this.generarNombreUsuario(personalSaludData.nombres, personalSaludData.primer_apellido, personalSaludData.segundo_nombre);
      const contrasenia = this.generarContrasenia();

      // Crear el usuario asociado
      const usuarioData: Partial<Usuario> = {
        nombre_usuario: nombreUsuario,
        contrasenia,
        rol,
        estado: 1,
      };

      const nuevoUsuario = await this.usuarioService.createUsuario(usuarioData, queryRunner);
      savedPersonalSalud.usuario_usuario_ID = nuevoUsuario.usuario_ID;

      // Guardar la relación de personal_salud con el usuario
      await queryRunner.manager.save(savedPersonalSalud);
      await queryRunner.commitTransaction();

      // Enviar las credenciales por correo electrónico
      await this.mailService.sendUserCredentials(
        personalSaludData.nombres,
        personalSaludData.primer_apellido,
        personalSaludData.segundo_nombre,
        personalSaludData.correo_electronico,
        nombreUsuario,
        contrasenia,
      );

      return savedPersonalSalud;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
 

  // Método para obtener todos los registros
  async getAllPersonalSalud(): Promise<PersonalSalud[]> {
    return this.personalSaludRepository.find();
  }

 
  // Método para obtener el personal de salud por ID
  async getPersonalSaludById(id: number): Promise<PersonalSalud> {
    const personalSalud = await this.personalSaludRepository.findOne({ where: { personal_ID: id } });
    if (!personalSalud) {
      throw new NotFoundException(`Personal de salud con ID ${id} no encontrado`);
    }
    return personalSalud;
  }

  // Método para actualizar el personal de salud por ID
  async updatePersonalSalud(id: number, updatePersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
    const personalSalud = await this.getPersonalSaludById(id);
    Object.assign(personalSalud, updatePersonalSaludDto);
    personalSalud.fecha_modificacion = new Date();
    //console.log('Fecha de modificación:', updatePersonalSalud.fecha_modificacion);  
    return this.personalSaludRepository.save(personalSalud);
  }


  // Método para realizar una eliminación lógica
  async deletePersonalSalud(id: number): Promise<PersonalSalud> {
    const personalSalud = await this.personalSaludRepository.findOne({ where: { personal_ID: id } });
    if (!personalSalud) {
      throw new NotFoundException(`Personal de salud con ID ${id} no encontrado`);
    }
    personalSalud.estado = 0; 
    return this.personalSaludRepository.save(personalSalud);
  }



  // Función para generar el nombre de usuario
  generarNombreUsuario(nombres: string, primerApellido: string, segundoApellido: string): string {
    const nombreInicial = nombres.charAt(0).toLowerCase();
    const apellidoPaterno = primerApellido.toLowerCase();
    const apellidoMaternoInicial = segundoApellido.charAt(0).toLowerCase();
    return `${nombreInicial}${apellidoPaterno}${apellidoMaternoInicial}`;
  }

  // Función para generar una contraseña aleatoria
  generarContrasenia(): string {
    return Math.random().toString(36).slice(-8);
  }


  










  // // Crear un registro de personal de salud y usuario en una transacción
  // async createPersonalSalud(data: Partial<PersonalSalud>, rol: string): Promise<PersonalSalud> {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     // Crear el personal de salud
  //     const personalSalud = this.personalSaludRepository.create(data);
  //     const savedPersonalSalud = await queryRunner.manager.save(personalSalud);

  //     // Generar nombre de usuario y contraseña
  //     const nombreUsuario = this.generarNombreUsuario(data.nombres, data.primer_apellido, data.segundo_nombre);
  //     const contrasenia = this.generarContrasenia();

  //     // Crear el usuario asociado
  //     const usuarioData: Partial<Usuario> = {
  //       nombre_usuario: nombreUsuario,
  //       contrasenia,
  //       rol,
  //       estado: 1,
  //     };
  //     const nuevoUsuario = await this.usuarioService.createUsuario(usuarioData, queryRunner);  // Pasamos el queryRunner

  //     // Asociamos el usuario creado al personal de salud
  //     savedPersonalSalud.usuario_usuario_ID = nuevoUsuario.usuario_ID;
  //     await queryRunner.manager.save(savedPersonalSalud);

  //     // Confirmar la transacción
  //     await queryRunner.commitTransaction();

  //     // Enviar las credenciales por correo
  //     await this.mailService.sendUserCredentials(
  //       data.nombres, data.primer_apellido, data.segundo_nombre, data.correo_electronico, nombreUsuario, contrasenia
  //     );

  //     return savedPersonalSalud;
  //   } catch (error) {
  //     // Si algo falla, hacemos rollback
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  // // Función para generar el nombre de usuario
  // generarNombreUsuario(nombres: string, primerApellido: string, segundoApellido: string): string {
  //   const nombreInicial = nombres.charAt(0).toLowerCase();
  //   const apellidoPaterno = primerApellido.toLowerCase();
  //   const apellidoMaternoInicial = segundoApellido.charAt(0).toLowerCase();
  //   return `${nombreInicial}${apellidoPaterno}${apellidoMaternoInicial}`;
  // }

  // // Función para generar una contraseña aleatoria
  // generarContrasenia(): string {
  //   return Math.random().toString(36).slice(-8);  // Ejemplo sencillo de generación de contraseña
  // }




//   // Crear un registro de personal de salud
//   async createPersonalSalud(data: Partial<PersonalSalud>): Promise<PersonalSalud> {
//     const personalSalud = this.personalSaludRepository.create(data);
//     return this.personalSaludRepository.save(personalSalud);
//   }

//   // Obtener todos los registros de personal de salud
//   async getAllPersonalSalud(): Promise<PersonalSalud[]> {
//     return this.personalSaludRepository.find();
//   }

//   // Obtener un registro de personal de salud por ID
//   async getPersonalSaludById(personal_ID: number): Promise<PersonalSalud> {
//     const personalSalud = await this.personalSaludRepository.findOne({ where: { personal_ID } });
//     if (!personalSalud) {
//       throw new NotFoundException(`Personal de salud con ID ${personal_ID} no encontrado.`);
//     }
//     return personalSalud;
//   }


//   // Actualizar un registro de personal de salud
// async updatePersonalSalud(personal_ID: number, data: Partial<PersonalSalud>): Promise<PersonalSalud> {
//   const personalSalud = await this.personalSaludRepository.preload({
//     personal_ID,
//     ...data,
//   });

//   // Si no se encuentra el registro, lanzar una excepción
//   if (!personalSalud) {
//     throw new NotFoundException(`Personal de salud con ID ${personal_ID} no encontrado para actualizar.`);
//   }

//   // Actualizar la fecha de modificación
//   personalSalud.fecha_modificacion = new Date();

//   // Guardar los cambios en la base de datos
//   return this.personalSaludRepository.save(personalSalud);
// }

//   // Eliminar un registro de personal de salud (Eliminación lógica)
// async deletePersonalSalud(personal_ID: number): Promise<void> {
//   const personalSalud = await this.getPersonalSaludById(personal_ID);
//   if (!personalSalud) {
//     throw new NotFoundException(`Personal de salud con ID ${personal_ID} no encontrado para eliminar.`);
//   }
//   // Actualizar el campo estado a 0 y actualizar la fecha de modificación
//   await this.personalSaludRepository.update(personal_ID, {
//     estado: 0,
//     fecha_modificacion: new Date(), // Actualizar también la fecha de modificación
//   });
// }

}
