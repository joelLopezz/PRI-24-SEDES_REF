/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { PersonalSalud } from './personal_salud.entity';
import { UsuarioService } from '../usuario/usuario.service';  
import { MailService } from '../correo_electronico/correo_electronico.service';
import { Usuario } from '../usuario/usuario.entity';  
import { CreatePersonalSaludDto } from './dto/personal_salud.dto';
import { AuthService } from '../Auth/auth.service';

import { PersoEspeciaHospitalService } from '../perso_especia_hospital/perso_especia_hospital.service';
import { CreatePersoEspeciaHospitalDto } from '../perso_especia_hospital/dto/create-perso_especia_hospital.dto';
import {UpdatePersoEspeciaHospitalDto} from '../perso_especia_hospital/dto/update-perso_especia_hospital.dto';
import {EstablecimientoSalud} from '../establecimiento/establecimiento.entity';


@Injectable()
export class PersonalSaludService {
  constructor(
    @InjectRepository(PersonalSalud)
    private personalSaludRepository: Repository<PersonalSalud>,

    @InjectRepository(EstablecimientoSalud)
    private readonly establecimientoRepository: Repository<EstablecimientoSalud>, // Inyección correcta para EstablecimientoSalud

    private usuarioService: UsuarioService, 
    private persoEspeciaHospitalService: PersoEspeciaHospitalService,
    private mailService: MailService,
    private dataSource: DataSource, 
    private authService: AuthService,
  ) {}


  //Prueba

  async createPersonalSalud_v2(createPersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect(); // Conectar el queryRunner
      await queryRunner.startTransaction(); // Iniciar la transacción
  

      // Obtener el usuario autenticado desde AuthService
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        console.error('Error: Usuario no autenticado.');
        throw new Error('Usuario no autenticado');
      }

      // Variables adicionales para el usuario de creación
      const usuarioCreacionId = currentUser.usuarioID; 
      const establecimientoSaludId = currentUser.establecimientoID;
      const usuarioRol = currentUser.rol; // Rol del usuario autenticado

      console.log('Paso 5: Establecimiento de salud ID:', establecimientoSaludId);
      console.log('Paso 6: Role:', usuarioRol);

    // Determinar el establecimiento según el rol
    let establecimiento: number;
    if (usuarioRol === 'Admin Sedes') {
      // Si el rol es 'Admin Sedes', tomar el id del establecimiento recibido desde el frontend
      const establecimientoAsig = await this.establecimientoRepository.findOne({
        where: { id: createPersonalSaludDto.establecimiento_salud_idestablecimiento_ID },
      });

      // Asegurarse de que establecimientoAsig no sea null o undefined antes de acceder al id
      if (!establecimientoAsig) {
        throw new Error('Establecimiento no encontrado');
      }
      // Asignar el id del establecimiento, que es de tipo 'number'
      establecimiento = establecimientoAsig.id;

    } else if(usuarioRol === 'Admin Hospital') {
      // Para otros roles, usar el establecimiento del usuario logueado
      establecimiento = establecimientoSaludId;
    }else{
      throw new ForbiddenException('Acceso denegado'); // Si el rol no es reconocido, se lanza un error de acceso denegado
    }
    
    console.log('Paso 7: Establecimiento ID:', establecimiento);

    const personalSaludData = {
       ...createPersonalSaludDto,
      fecha_creacion: new Date(),
      usuario_creacion: usuarioCreacionId,
      establecimiento_salud_idestablecimiento_ID: establecimiento,
    };


    // Crear el registro de personal de salud
    const personalSalud = this.personalSaludRepository.create(personalSaludData);
    const savedPersonalSalud = await queryRunner.manager.save(personalSalud);

    // Crear el usuario asociado al personal de salud creado
    const nombreUsuario = this.generarNombreUsuario(
       personalSaludData.nombres,
      personalSaludData.primer_apellido,
      personalSaludData.segundo_apellido
    );

    const contrasenia = this.generarContrasenia();
    const usuarioData: Partial<Usuario> = {
      nombre_usuario: nombreUsuario,
      contrasenia,
      estado: 1,
       rol: createPersonalSaludDto.rol,
       personal: savedPersonalSalud,
       establecimiento_id: establecimientoSaludId,
      fecha_creacion: new Date(),
    };

    await this.usuarioService.createUsuario(usuarioData, queryRunner);

      // Crear la relación entre PersonalSalud, Especialidad y Hospital
    const createPersoEspeciaHospitalDto: CreatePersoEspeciaHospitalDto = {
        personal_salud: savedPersonalSalud.personal_ID,
        especialidad: createPersonalSaludDto.especialidad,
        hospital: establecimientoSaludId,
      }; 

    //console.log('Paso 10: Datos para la relación entre personal, especialidad y hospital:', createPersoEspeciaHospitalDto);
    await this.persoEspeciaHospitalService.create(createPersoEspeciaHospitalDto, queryRunner);

      // Enviar las credenciales por correo electrónico
      //console.log('Paso 12: Enviando credenciales al correo electrónico del personal de salud.');
      await this.mailService.sendUserCredentials(
        personalSaludData.nombres,
        personalSaludData.primer_apellido,
        personalSaludData.segundo_apellido,
        personalSaludData.correo_electronico,
        nombreUsuario,
        contrasenia,
        personalSaludData.telefono
      );  

      //console.log('Paso 13: Correo electrónico enviado exitosamente.');

      // Confirmar la transacción
      await queryRunner.commitTransaction();

      // Retornar el personal de salud creado
      return savedPersonalSalud;
    } catch (error) {
      console.error('Error durante la creación del personal de salud:', error);
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction(); // Hacer rollback si ocurre un error
        console.log('Transacción revertida debido a un error.');
      }
      throw error;
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release(); // Liberar el queryRunner
       //console.log('QueryRunner liberado.');
      }
    }
  }

  //fin de prueba

  

  // Crear un registro de personal de salud y usuario
  async createPersonalSalud(createPersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
    const { rol, especialidad, ...personalSaludData } = createPersonalSaludDto;
    const queryRunner = this.dataSource.createQueryRunner();
    try {
        await queryRunner.connect(); // Conectar el queryRunner
        await queryRunner.startTransaction(); // Iniciar la transacción

        // Obtener el usuario autenticado desde AuthService
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
          throw new Error('Usuario no autenticado'); // Lanzar un error si no hay usuario autenticado
        }

        // Variables adicionales para el usuario de creación
        const usuarioCreacionId = currentUser.usuarioID; 
        const establecimiento_salud_idestablecimiento_ID = currentUser.establecimientoID;
        
        // Añadir la fecha de creación y el usuario que está creando este registro
        personalSaludData.fecha_creacion = new Date();
        personalSaludData.usuario_creacion = usuarioCreacionId;
        personalSaludData.establecimiento_salud_idestablecimiento_ID = establecimiento_salud_idestablecimiento_ID;

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
            establecimiento_id: establecimiento_salud_idestablecimiento_ID, // Se utiliza el valor establecido anteriormente
            fecha_creacion: new Date(),
        };

        await this.usuarioService.createUsuario(usuarioData, queryRunner);

        // Crear la relación entre PersonalSalud, Especialidad y Hospital
        const especialidadId = especialidad;
        const personalId = savedPersonalSalud.personal_ID;

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
            personalSaludData.telefono
        );
        return savedPersonalSalud;

    } catch (error) {
        if (queryRunner.isTransactionActive) { // Solo hacer rollback si la transacción está activa
            await queryRunner.rollbackTransaction();
        }
        throw error;
    } finally {
        if (queryRunner.isReleased === false) { // Solo liberar si no está liberado
            await queryRunner.release();
        }
    }
}

  // Método para obtener todos los registros
  async getAllPersonalSalud(): Promise<PersonalSalud[]> {
    // Obtener el usuario autenticado desde AuthService
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error('Error: Usuario no autenticado.');
      throw new Error('Usuario no autenticado'); // Lanzar un error si no hay usuario autenticado
    }
    // Variables adicionales para el usuario de creación
    const usuarioCreacionId = currentUser.usuarioID; 
    const establecimientoSaludId = currentUser.establecimientoID;

    // Verificar si el establecimiento de salud existe
    const establecimientoAsig = await this.establecimientoRepository.findOne({
      where: { id: establecimientoSaludId },
    });

    if (!establecimientoAsig) {
      console.error('Error: Establecimiento de salud no encontrado.');
      throw new Error('Establecimiento de salud no encontrado'); // Lanzar un error si el establecimiento no se encuentra
    }

    // Filtrar PersonalSalud por estado = 1 y por establecimientoSaludId
    return this.personalSaludRepository.find({
      where: {
        estado: 1,
        establecimientoSalud: establecimientoAsig, // Asegúrate de que la relación sea la correcta
      },
      relations: ['usuarios'], // Asegúrate de que estás cargando la relación de usuarios
    });

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
    
    // Guardar cambios en el registro de PersonalSalud
    const updatedPersonalSalud = await this.personalSaludRepository.save(personalSalud);

    console.log('Paso X: Actualizando relación entre personal, especialidad y hospital.');
    const updateDto: UpdatePersoEspeciaHospitalDto = {
      especialidad: updatePersonalSaludDto.especialidad,
      // Puedes añadir otros campos necesarios aquí
    };
    await this.persoEspeciaHospitalService.updateByPersonalSalud(id, updateDto);
    console.log('Paso Y: Relación actualizada exitosamente.');

    return updatedPersonalSalud;
}


  // Método para realizar una eliminación lógica
  async deletePersonalSalud(id: number): Promise<PersonalSalud> {
    const personalSalud = await this.personalSaludRepository.findOne({ where: { personal_ID: id } });
    if (!personalSalud) {
      throw new NotFoundException(`Personal de salud con ID ${id} no encontrado`);
    }

    // Primero eliminar la relación en PersoEspeciaHospital
    console.log('Paso A: Eliminando la relación en PersoEspeciaHospital antes de desactivar PersonalSalud.');
    await this.persoEspeciaHospitalService.deleteByPersonalSalud(id);
    console.log('Paso B: Relación eliminada exitosamente.');

    // Desactivar el personal de salud estableciendo estado a 0
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