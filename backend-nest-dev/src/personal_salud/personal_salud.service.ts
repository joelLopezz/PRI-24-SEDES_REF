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
  // async createPersonalSalud(createPersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
  //   const { rol, ...personalSaludData } = createPersonalSaludDto;

  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     // Crear el personal de salud
  //     const personalSalud = this.personalSaludRepository.create(personalSaludData);
  //     const savedPersonalSalud = await queryRunner.manager.save(personalSalud);

  //     // Generar nombre de usuario y contraseña
  //     const nombreUsuario = this.generarNombreUsuario(
  //       personalSaludData.nombres, 
  //       personalSaludData.primer_apellido, 
  //       personalSaludData.segundo_apellido
  //     );
  //     const contrasenia = this.generarContrasenia();

  //     // Crear el usuario asociado al personal de salud creado
  //     const usuarioData: Partial<Usuario> = {
  //       nombre_usuario: nombreUsuario,
  //       contrasenia,
  //       rol,
  //       estado: 1,
  //       personal: savedPersonalSalud, // Relación directa con personalSalud
  //       establecimiento_id: personalSaludData.establecimiento_salud_idestablecimiento_ID,
  //       fecha_creacion: new Date(),
  //     };

  //     const nuevoUsuario = await this.usuarioService.createUsuario(usuarioData, queryRunner);

  //     await queryRunner.commitTransaction();

  //     // Enviar las credenciales por correo electrónico
  //     await this.mailService.sendUserCredentials(
  //       personalSaludData.nombres,
  //       personalSaludData.primer_apellido,
  //       personalSaludData.segundo_apellido,
  //       personalSaludData.correo_electronico,
  //       nombreUsuario,
  //       contrasenia,
  //     );

  //     return savedPersonalSalud;
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }





  // Crear un registro de personal de salud y usuario
async createPersonalSalud(createPersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
  const { rol, ...personalSaludData } = createPersonalSaludDto;

  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Variables adicionales para el usuario de creación
    const usuarioCreacionId = 1; // Por defecto 1, se puede cambiar según la lógica del negocio

    // Añadir la fecha de creación y el usuario que está creando este registro
    personalSaludData.fecha_creacion = new Date();
    personalSaludData.usuario_creacion = usuarioCreacionId;

    // Crear el registro de personal de salud
    const personalSalud = this.personalSaludRepository.create(personalSaludData);
    const savedPersonalSalud = await queryRunner.manager.save(personalSalud);

    // Generar nombre de usuario y contraseña
    const nombreUsuario = this.generarNombreUsuario(
      personalSaludData.nombres, 
      personalSaludData.primer_apellido, 
      personalSaludData.segundo_apellido
    );
    const contrasenia = this.generarContrasenia();

    // Crear el usuario asociado al personal de salud creado
    const usuarioData: Partial<Usuario> = {
      nombre_usuario: nombreUsuario,
      contrasenia,
      rol,
      estado: 1,
      personal: savedPersonalSalud, // Relación directa con personalSalud
      establecimiento_id: personalSaludData.establecimiento_salud_idestablecimiento_ID,
      fecha_creacion: new Date(),
    };

    const nuevoUsuario = await this.usuarioService.createUsuario(usuarioData, queryRunner);

    // Confirmar la transacción
    await queryRunner.commitTransaction();

    // Enviar las credenciales por correo electrónico
    await this.mailService.sendUserCredentials(
      personalSaludData.nombres,
      personalSaludData.primer_apellido,
      personalSaludData.segundo_apellido,
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
    return this.personalSaludRepository.find({ where: { estado: 1 }, relations: ['usuarios'] });
  }

  // Método para obtener el personal de salud por ID
  async getPersonalSaludById(id: number): Promise<PersonalSalud> {
    const personalSalud = await this.personalSaludRepository.findOne({
      where: { personal_ID: id },
      relations: ['usuarios'],  // Incluir la relación con usuarios
    });
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
    const apellidoMaternoInicial = segundoApellido ? segundoApellido.charAt(0).toLowerCase() : '';
    return `${nombreInicial}${apellidoPaterno}${apellidoMaternoInicial}`;
  }

  // Función para generar una contraseña aleatoria
  generarContrasenia(): string {
    return Math.random().toString(36).slice(-8);
  }
}







// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, QueryRunner, DataSource } from 'typeorm';
// import { PersonalSalud } from './personal_salud.entity';

// import { UsuarioService } from '../usuario/usuario.service';  
// import { MailService } from '../correo_electronico/correo_electronico.service';
// import { Usuario } from '../usuario/usuario.entity';  
// import { CreatePersonalSaludDto } from './dto/personal_salud.dto';

// @Injectable()
// export class PersonalSaludService {
//   constructor(
//     @InjectRepository(PersonalSalud)
//     private personalSaludRepository: Repository<PersonalSalud>,
//     private usuarioService: UsuarioService, 
//     private mailService: MailService,
//     private dataSource: DataSource, 
//   ) {}

//   // Crear un registro de personal de salud y usuario
//   async createPersonalSalud(createPersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
//     const { rol, ...personalSaludData } = createPersonalSaludDto;

//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       // Crear el personal de salud
//       const personalSalud = this.personalSaludRepository.create(personalSaludData);
//       const savedPersonalSalud = await queryRunner.manager.save(personalSalud);

//       // Generar nombre de usuario y contraseña
//       const nombreUsuario = this.generarNombreUsuario(
//         personalSaludData.nombres, 
//         personalSaludData.primer_apellido, 
//         personalSaludData.segundo_apellido
//       );
//       const contrasenia = this.generarContrasenia();

//       // Crear el usuario asociado
//       const usuarioData: Partial<Usuario> = {
//         nombre_usuario: nombreUsuario,
//         contrasenia,
//         rol,
//         estado: 1,
//         personal: savedPersonalSalud  // Asociación directa con el personal de salud
//       };

//       const nuevoUsuario = await this.usuarioService.createUsuario(usuarioData, queryRunner);

//       // Asignar el usuario creado al personal de salud
//       savedPersonalSalud.usuario = nuevoUsuario;
//       await queryRunner.manager.save(savedPersonalSalud);

//       await queryRunner.commitTransaction();

//       // Enviar las credenciales por correo electrónico
//       await this.mailService.sendUserCredentials(
//         personalSaludData.nombres,
//         personalSaludData.primer_apellido,
//         personalSaludData.segundo_apellido,
//         personalSaludData.correo_electronico,
//         nombreUsuario,
//         contrasenia,
//       );

//       return savedPersonalSalud;
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }

//   // Método para obtener todos los registros
//   async getAllPersonalSalud(): Promise<PersonalSalud[]> {
//     return this.personalSaludRepository.find({ where: { estado: 1 } });
//   }

//   // Método para obtener el personal de salud por ID
//   async getPersonalSaludById(id: number): Promise<PersonalSalud> {
//     const personalSalud = await this.personalSaludRepository.findOne({
//       where: { personal_ID: id },
//       relations: ['usuario'],  // Incluir la relación con usuario
//     });
//     if (!personalSalud) {
//       throw new NotFoundException(`Personal de salud con ID ${id} no encontrado`);
//     }
//     return personalSalud;
//   }

//   // Método para actualizar el personal de salud por ID
//   async updatePersonalSalud(id: number, updatePersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
//     const personalSalud = await this.getPersonalSaludById(id);
//     Object.assign(personalSalud, updatePersonalSaludDto);
//     personalSalud.fecha_modificacion = new Date();
//     return this.personalSaludRepository.save(personalSalud);
//   }

//   // Método para realizar una eliminación lógica
//   async deletePersonalSalud(id: number): Promise<PersonalSalud> {
//     const personalSalud = await this.personalSaludRepository.findOne({ where: { personal_ID: id } });
//     if (!personalSalud) {
//       throw new NotFoundException(`Personal de salud con ID ${id} no encontrado`);
//     }
//     personalSalud.estado = 0; 
//     return this.personalSaludRepository.save(personalSalud);
//   }

//   // Función para generar el nombre de usuario
//   generarNombreUsuario(nombres: string, primerApellido: string, segundoApellido: string): string {
//     const nombreInicial = nombres.charAt(0).toLowerCase();
//     const apellidoPaterno = primerApellido.toLowerCase();
//     const apellidoMaternoInicial = segundoApellido ? segundoApellido.charAt(0).toLowerCase() : '';
//     return `${nombreInicial}${apellidoPaterno}${apellidoMaternoInicial}`;
//   }

//   // Función para generar una contraseña aleatoria
//   generarContrasenia(): string {
//     return Math.random().toString(36).slice(-8);
//   }
// }













// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, QueryRunner, DataSource } from 'typeorm';
// import { PersonalSalud } from './personal_salud.entity';

// import { UsuarioService } from '../usuario/usuario.service';  
// import { MailService } from '../correo_electronico/correo_electronico.service';
// import { Usuario } from '../usuario/usuario.entity';  
// import { CreatePersonalSaludDto } from './dto/personal_salud.dto';
 


// @Injectable()
// export class PersonalSaludService {
//   constructor(
//     @InjectRepository(PersonalSalud)
//     private personalSaludRepository: Repository<PersonalSalud>,
//     private usuarioService: UsuarioService, 
//     private mailService: MailService,
//     private dataSource: DataSource, 
//   ) {}


//   // Crear un registro de personal de salud y usuario
//   async createPersonalSalud(createPersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
//     const { rol, ...personalSaludData } = createPersonalSaludDto;

//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       // Crear el personal de salud
//       const personalSalud = this.personalSaludRepository.create(personalSaludData);
//       const savedPersonalSalud = await queryRunner.manager.save(personalSalud);

//       // Generar nombre de usuario y contraseña
//       const nombreUsuario = this.generarNombreUsuario(personalSaludData.nombres, personalSaludData.primer_apellido, personalSaludData.segundo_nombre);
//       const contrasenia = this.generarContrasenia();

//       // Crear el usuario asociado
//       const usuarioData: Partial<Usuario> = {
//         nombre_usuario: nombreUsuario,
//         contrasenia,
//         rol,
//         estado: 1,
//       };

//       const nuevoUsuario = await this.usuarioService.createUsuario(usuarioData, queryRunner);
//       savedPersonalSalud.usuario_usuario_ID = nuevoUsuario.usuario_ID;

//       // Guardar la relación de personal_salud con el usuario
//       await queryRunner.manager.save(savedPersonalSalud);
//       await queryRunner.commitTransaction();

//       // Enviar las credenciales por correo electrónico
//       await this.mailService.sendUserCredentials(
//         personalSaludData.nombres,
//         personalSaludData.primer_apellido,
//         personalSaludData.segundo_nombre,
//         personalSaludData.correo_electronico,
//         nombreUsuario,
//         contrasenia,
//       );

//       return savedPersonalSalud;
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }
 

//   // Método para obtener todos los registros
//   async getAllPersonalSalud(): Promise<PersonalSalud[]> {
//     return this.personalSaludRepository.find({where: {estado: 1}});

//   }

 
//   // Método para obtener el personal de salud por ID
//   async getPersonalSaludById(id: number): Promise<PersonalSalud> {
//     const personalSalud = await this.personalSaludRepository.findOne({ where: { personal_ID: id } });
//     if (!personalSalud) {
//       throw new NotFoundException(`Personal de salud con ID ${id} no encontrado`);
//     }
//     return personalSalud;
//   }

//   // Método para actualizar el personal de salud por ID
//   async updatePersonalSalud(id: number, updatePersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
//     const personalSalud = await this.getPersonalSaludById(id);
//     Object.assign(personalSalud, updatePersonalSaludDto);
//     personalSalud.fecha_modificacion = new Date();
//     //console.log('Fecha de modificación:', updatePersonalSalud.fecha_modificacion);  
//     return this.personalSaludRepository.save(personalSalud);
//   }


//   // Método para realizar una eliminación lógica
//   async deletePersonalSalud(id: number): Promise<PersonalSalud> {
//     const personalSalud = await this.personalSaludRepository.findOne({ where: { personal_ID: id } });
//     if (!personalSalud) {
//       throw new NotFoundException(`Personal de salud con ID ${id} no encontrado`);
//     }
//     personalSalud.estado = 0; 
//     return this.personalSaludRepository.save(personalSalud);
//   }



//   // Función para generar el nombre de usuario
//   generarNombreUsuario(nombres: string, primerApellido: string, segundoApellido: string): string {
//     const nombreInicial = nombres.charAt(0).toLowerCase();
//     const apellidoPaterno = primerApellido.toLowerCase();
//     const apellidoMaternoInicial = segundoApellido.charAt(0).toLowerCase();
//     return `${nombreInicial}${apellidoPaterno}${apellidoMaternoInicial}`;
//   }

//   // Función para generar una contraseña aleatoria
//   generarContrasenia(): string {
//     return Math.random().toString(36).slice(-8);
//   }

// }
