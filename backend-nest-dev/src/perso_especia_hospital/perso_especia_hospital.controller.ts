import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersoEspeciaHospitalService } from './perso_especia_hospital.service';
import { CreatePersoEspeciaHospitalDto } from './dto/create-perso_especia_hospital.dto';
import { UpdatePersoEspeciaHospitalDto } from './dto/update-perso_especia_hospital.dto';

@Controller('perso-especia-hospital')
export class PersoEspeciaHospitalController {
  constructor(private readonly persoEspeciaHospitalService: PersoEspeciaHospitalService) {}

  @Post()
  create(@Body() createPersoEspeciaHospitalDto: CreatePersoEspeciaHospitalDto) {
    return this.persoEspeciaHospitalService.create(createPersoEspeciaHospitalDto);
  }

  @Get()
  findAll() {
    return this.persoEspeciaHospitalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.persoEspeciaHospitalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersoEspeciaHospitalDto: UpdatePersoEspeciaHospitalDto) {
    return this.persoEspeciaHospitalService.update(+id, updatePersoEspeciaHospitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.persoEspeciaHospitalService.remove(+id);
  }
}
