import { Injectable } from '@nestjs/common';
import { CreatePersoEspeciaHospitalDto } from './dto/create-perso_especia_hospital.dto';
import { UpdatePersoEspeciaHospitalDto } from './dto/update-perso_especia_hospital.dto';
import { PersoEspeciaHospital } from './entities/perso_especia_hospital.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { PersonalSalud } from 'src/personal_salud/personal_salud.entity';
import { Specialty } from 'src/specialty/specialty.entity';
import { EstablecimientoSalud } from 'src/establecimiento/establecimiento.entity';

@Injectable()
export class PersoEspeciaHospitalService {

  constructor(
    @InjectRepository(PersoEspeciaHospital)
    private readonly persoEspeciaHospitalRepository: Repository<PersoEspeciaHospital>,

    @InjectRepository(PersonalSalud)
    private readonly personalSaludRepository: Repository<PersonalSalud>,

    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,

    @InjectRepository(EstablecimientoSalud)
    private readonly hospitalRepository: Repository<EstablecimientoSalud>,
  ) {}

  async create(createPersoEspeciaHospitalDto: CreatePersoEspeciaHospitalDto, queryRunner: QueryRunner) {
    const { personal_salud, especialidad, hospital } = createPersoEspeciaHospitalDto;

    //console.log('Paso A: Inicio de la creación de PersoEspeciaHospital.');
    //console.log('Paso B: Datos recibidos:', createPersoEspeciaHospitalDto);

    // Buscar las entidades relacionadas
    //console.log('Paso C: Buscando la entidad PersonalSalud con ID:', personal_salud);
    const personalSalud = await queryRunner.manager.findOne(PersonalSalud, { where: { personal_ID: personal_salud } });
    //console.log('Resultado de búsqueda de PersonalSalud:', personalSalud);

    //console.log('Paso D: Buscando la entidad Especialidad con ID:', especialidad);
    const specialty = await queryRunner.manager.findOne(Specialty, { where: { id: especialidad } });
    //console.log('Resultado de búsqueda de Especialidad:', specialty);

    //console.log('Paso E: Buscando la entidad Hospital con ID:', hospital);
    const hospitalEntity = await queryRunner.manager.findOne(EstablecimientoSalud, { where: { id: hospital } });
    //console.log('Resultado de búsqueda de Hospital:', hospitalEntity);

    // Validar que existan las relaciones
    if (!personalSalud || !specialty || !hospitalEntity) {
      //console.error('Error: Una o más entidades relacionadas no fueron encontradas.');
      throw new Error('One or more related entities were not found.');
    }

    //console.log('Paso F: Todas las entidades relacionadas fueron encontradas.');

    // Crear y guardar el registro
    const newRecord = this.persoEspeciaHospitalRepository.create({
      personal_salud: personalSalud,
      especialidad: specialty,
      hospital: hospitalEntity,
    });

    //console.log('Paso G: Registro de PersoEspeciaHospital creado:', newRecord);

    const savedRecord = await queryRunner.manager.save(newRecord);
    //console.log('Paso H: Registro de PersoEspeciaHospital guardado exitosamente:', savedRecord);

    return savedRecord;
  }


  
  async deleteByPersonalSalud(personalSaludId: number) {
    // Buscar el registro relacionado con personal_salud
    const record = await this.persoEspeciaHospitalRepository.findOne({
      where: { personal_salud: { personal_ID: personalSaludId } },
      relations: ['personal_salud'],
    });
  
    if (!record) {
      throw new Error(`Record with personal_salud ID ${personalSaludId} not found.`);
    }
  
    // Eliminar el registro 2
    await this.persoEspeciaHospitalRepository.remove(record);
  
    return { message: `Record with personal_salud ID ${personalSaludId} deleted successfully.` };
  }
  

  async updateByPersonalSalud(
    personalSaludId: number,
    updateDto: UpdatePersoEspeciaHospitalDto,
  ) {
    const record = await this.persoEspeciaHospitalRepository.findOne({
      where: { personal_salud: { personal_ID: personalSaludId } },
      relations: ['personal_salud', 'especialidad', 'hospital'],
    });
  
    if (!record) {
      throw new Error(`Record with personal_salud ID ${personalSaludId} not found`);
    }
  
    Object.assign(record, updateDto); // Actualiza los campos que vengan en el DTO
    return await this.persoEspeciaHospitalRepository.save(record);
  }

  findAll() {
    return `This action returns all persoEspeciaHospital`;
  }

  async findOne(id: number) {
    const record = await this.persoEspeciaHospitalRepository.findOne({
      where: { idPersonal_Especialidad_Hospital: id },
      relations: ['personal_salud', 'especialidad', 'hospital'], // Incluye las relaciones necesarias
    });
    console.log(`Fetching record with ID: ${id}`);

  
    if (!record) {
      throw new Error(`Record with ID ${id} not found.`);
    }
  
    return record;
  }
  

  update(id: number, updatePersoEspeciaHospitalDto: UpdatePersoEspeciaHospitalDto) {
    return `This action updates a #${id} persoEspeciaHospital`;
  }

  remove(id: number) {
    return `This action removes a #${id} persoEspeciaHospital`;
  }
}
