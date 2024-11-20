import { Injectable } from '@nestjs/common';
import { CreatePersoEspeciaHospitalDto } from './dto/create-perso_especia_hospital.dto';
import { UpdatePersoEspeciaHospitalDto } from './dto/update-perso_especia_hospital.dto';
import { PersoEspeciaHospital } from './entities/perso_especia_hospital.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async create(createPersoEspeciaHospitalDto: CreatePersoEspeciaHospitalDto) {
    const { personal_salud, especialidad, hospital } = createPersoEspeciaHospitalDto;

    // Buscar las entidades relacionadas
    const personalSalud = await this.personalSaludRepository.findOneBy({ personal_ID: personal_salud });
    const specialty = await this.specialtyRepository.findOneBy({ id: especialidad });
    const hospitalEntity = await this.hospitalRepository.findOneBy({ id: hospital });

    // Validar que existan las relaciones
    if (!personalSalud || !specialty || !hospitalEntity) {
      throw new Error('One or more related entities were not found.');
    }

    // Crear y guardar el registro
    const newRecord = this.persoEspeciaHospitalRepository.create({
      personal_salud: personalSalud,
      especialidad: specialty,
      hospital: hospitalEntity,
    });

    return await this.persoEspeciaHospitalRepository.save(newRecord);
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
  
    // Eliminar el registro
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
