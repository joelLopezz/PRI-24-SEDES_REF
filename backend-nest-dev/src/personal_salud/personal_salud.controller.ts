import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { PersonalSaludService } from './personal_salud.service';
import { PersonalSalud } from './personal_salud.entity';
import { CreatePersonalSaludDto } from './dto/personal_salud.dto';
import * as bcrypt from 'bcrypt';

@Controller('personal-salud')
export class PersonalSaludController {
  constructor(private readonly personalSaludService: PersonalSaludService) {}


  @Post()
  async createPersonalSalud(@Body() createPersonalSaludDto: CreatePersonalSaludDto) {
    return this.personalSaludService.createPersonalSalud(createPersonalSaludDto);
  }


  // Obtener todos los registros
  @Get()
  async getAllPersonalSalud(): Promise<PersonalSalud[]> {
    return this.personalSaludService.getAllPersonalSalud();
  }

  
  // Obtener personal de salud por ID
  @Get(':id')
  async getPersonalSaludById(@Param('id', ParseIntPipe) id: number): Promise<PersonalSalud> {
    return this.personalSaludService.getPersonalSaludById(id);
  }

  // Actualizar personal de salud por ID
  @Put(':id')
  async updatePersonalSalud(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonalSaludDto: CreatePersonalSaludDto,
  ): Promise<PersonalSalud> {
    return this.personalSaludService.updatePersonalSalud(id, updatePersonalSaludDto);
  }


  // Ruta para eliminación lógica
  @Delete(':id')
  async deletePersonalSalud(@Param('id', ParseIntPipe) id: number): Promise<PersonalSalud> {
    return this.personalSaludService.deletePersonalSalud(id);
  }

}
