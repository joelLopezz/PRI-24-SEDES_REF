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
    private readonly establecimientoRepository: Repository<EstablecimientoSalud>, 

    private usuarioService: UsuarioService, 
    private persoEspeciaHospitalService: PersoEspeciaHospitalService,
    private mailService: MailService,
    private dataSource: DataSource, 
    private authService: AuthService,
  ) {}


  //Registro Personal Salud
  async createPersonalSalud_v2(createPersonalSaludDto: CreatePersonalSaludDto): Promise<PersonalSalud> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction(); 
  
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        console.error('Error: Usuario no autenticado.');
        throw new Error('Usuario no autenticado');
      }

      const usuarioCreacionId = currentUser.usuarioID; 
      const establecimientoSaludId = currentUser.establecimientoID;
      const usuarioRol = currentUser.rol; 

      console.log('Paso 5: Establecimiento de salud ID:', establecimientoSaludId);
      console.log('Paso 6: Role:', usuarioRol);

    let establecimiento: number;
    if (usuarioRol === 'Admin Sedes' || usuarioRol === 'ADMIN') {
      const establecimientoAsig = await this.establecimientoRepository.findOne({
        where: { id: createPersonalSaludDto.establecimiento_salud_idestablecimiento_ID },
      });

      if (!establecimientoAsig) {
        throw new Error('Establecimiento no encontrado');
      }
      establecimiento = establecimientoAsig.id;

    } else if(usuarioRol === 'Admin Hospital') {
      establecimiento = establecimientoSaludId;
    }else{
      throw new ForbiddenException('Acceso denegado');
    }
    
    //console.log('Paso 7: Establecimiento ID:', establecimiento);

    const personalSaludData = {
       ...createPersonalSaludDto,
      fecha_creacion: new Date(),
      usuario_creacion: usuarioCreacionId,
      establecimiento_salud_idestablecimiento_ID: establecimiento,
    };

    const personalSalud = this.personalSaludRepository.create(personalSaludData);
    const savedPersonalSalud = await queryRunner.manager.save(personalSalud);

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

    const createPersoEspeciaHospitalDto: CreatePersoEspeciaHospitalDto = {
        personal_salud: savedPersonalSalud.personal_ID,
        especialidad: createPersonalSaludDto.especialidad,
        hospital: establecimientoSaludId,
      }; 

    await this.persoEspeciaHospitalService.create(createPersoEspeciaHospitalDto, queryRunner);

      await this.mailService.sendUserCredentials(
        personalSaludData.nombres,
        personalSaludData.primer_apellido,
        personalSaludData.segundo_apellido,
        personalSaludData.correo_electronico,
        nombreUsuario,
        contrasenia,
        personalSaludData.telefono
      );  

      await queryRunner.commitTransaction();

      return savedPersonalSalud;
    } catch (error) {
      console.error('Error durante la creación del personal de salud:', error);
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
        console.log('Transacción revertida debido a un error.');
      }
      throw error;
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  // Método para obtener todos los registros
  async getAllPersonalSalud(): Promise<PersonalSalud[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error('Error: Usuario no autenticado.');
      throw new Error('Usuario no autenticado');
    }

    const usuarioCreacionId = currentUser.usuarioID; //No utilizado en este caso
    const establecimientoSaludId = currentUser.establecimientoID;

    const establecimientoAsig = await this.establecimientoRepository.findOne({
      where: { id: establecimientoSaludId },
    });

    if (!establecimientoAsig) {
      console.error('Error: Establecimiento de salud no encontrado.');
      throw new Error('Establecimiento de salud no encontrado');
    }

    return this.personalSaludRepository.find({
      where: {
        estado: 1,
        establecimientoSalud: establecimientoAsig,
      },
      relations: ['usuarios'],
    });
  }

  // Método para obtener el personal de salud por ID
  async getPersonalSaludById(id: number): Promise<PersonalSalud> {
    const personalSalud = await this.personalSaludRepository.findOne({
      where: { personal_ID: id },
      relations: ['usuarios'],  
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

    const updatedPersonalSalud = await this.personalSaludRepository.save(personalSalud);

    console.log('Paso X: Actualizando relación entre personal, especialidad y hospital.');
    const updateDto: UpdatePersoEspeciaHospitalDto = {
      especialidad: updatePersonalSaludDto.especialidad,
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

    console.log('Paso A: Eliminando la relación en PersoEspeciaHospital antes de desactivar PersonalSalud.');
    await this.persoEspeciaHospitalService.deleteByPersonalSalud(id);
    console.log('Paso B: Relación eliminada exitosamente.');

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