import { Injectable } from '@nestjs/common';
import { CreatePersoEspeciaHospitalDto } from './dto/create-perso_especia_hospital.dto';
import { UpdatePersoEspeciaHospitalDto } from './dto/update-perso_especia_hospital.dto';

@Injectable()
export class PersoEspeciaHospitalService {
  create(createPersoEspeciaHospitalDto: CreatePersoEspeciaHospitalDto) {
    return 'This action adds a new persoEspeciaHospital';
  }

  findAll() {
    return `This action returns all persoEspeciaHospital`;
  }

  findOne(id: number) {
    return `This action returns a #${id} persoEspeciaHospital`;
  }

  update(id: number, updatePersoEspeciaHospitalDto: UpdatePersoEspeciaHospitalDto) {
    return `This action updates a #${id} persoEspeciaHospital`;
  }

  remove(id: number) {
    return `This action removes a #${id} persoEspeciaHospital`;
  }
}
