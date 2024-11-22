import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersoEspeciaHospitalService } from './perso_especia_hospital.service';
import { CreatePersoEspeciaHospitalDto } from './dto/create-perso_especia_hospital.dto';
import { UpdatePersoEspeciaHospitalDto } from './dto/update-perso_especia_hospital.dto';

@Controller('perso-especia-hospital')
export class PersoEspeciaHospitalController {
  constructor(private readonly persoEspeciaHospitalService: PersoEspeciaHospitalService) {}

  

  @Patch('update-by-personal-salud/:personalSaludId')
  async updateByPersonalSalud(
    @Param('personalSaludId') personalSaludId: number,
    @Body() updateDto: UpdatePersoEspeciaHospitalDto,) {
    return await this.persoEspeciaHospitalService.updateByPersonalSalud(personalSaludId, updateDto);
  }

  @Delete('delete-by-personal-salud/:personalSaludId')
  async deleteByPersonalSalud(
    @Param('personalSaludId') personalSaludId: number,
  ) {
    return await this.persoEspeciaHospitalService.deleteByPersonalSalud(personalSaludId);
  }
  

  @Get()
  findAll() {
    return this.persoEspeciaHospitalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    console.log(`Fetching record with ID: ${id}`);

    return await this.persoEspeciaHospitalService.findOne(id);
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
