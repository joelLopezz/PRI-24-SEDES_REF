import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { PersonalSaludService } from './personal_salud.service';
import { PersonalSalud } from './personal_salud.entity';
import { CreatePersonalSaludDto } from './dto/personal_salud.dto';

@Controller('personal-salud')
export class PersonalSaludController {
  constructor(private readonly personalSaludService: PersonalSaludService) {}

  @Post('create-new-personal-salud')
  async createPersonalSalud_v2(@Body() data: any) {
    return await this.personalSaludService.createPersonalSalud_v2(data);
  }


  // Obtener todos los registros de personal de salud
  @Get()
  async getAllPersonalSalud(): Promise<{ statusCode: number; message: string; data: PersonalSalud[] }> {
    try {
      const personalSaludList = await this.personalSaludService.getAllPersonalSalud();
      return {
        statusCode: HttpStatus.OK,
        message: 'Lista de personal de salud obtenida exitosamente',
        data: personalSaludList,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al obtener la lista de personal de salud',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener un registro específico de personal de salud por ID
  @Get(':id')
  async getPersonalSaludById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ statusCode: number; message: string; data: PersonalSalud }> {
    try {
      const personalSalud = await this.personalSaludService.getPersonalSaludById(id);
      return {
        statusCode: HttpStatus.OK,
        message: `Personal de salud con ID ${id} obtenido exitosamente`,
        data: personalSalud,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Personal de salud con ID ${id} no encontrado`,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Actualizar un registro de personal de salud por ID
  @Put(':id')
  async updatePersonalSalud(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonalSaludDto: CreatePersonalSaludDto,
  ): Promise<{ statusCode: number; message: string; data: PersonalSalud }> {
    try {
      const updatedPersonalSalud = await this.personalSaludService.updatePersonalSalud(id, updatePersonalSaludDto);
      return {
        statusCode: HttpStatus.OK,
        message: `Personal de salud con ID ${id} actualizado exitosamente`,
        data: updatedPersonalSalud,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Error al actualizar el personal de salud con ID ${id}`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Eliminación lógica de un registro de personal de salud por ID
  @Delete(':id')
  async deletePersonalSalud(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ statusCode: number; message: string; data: PersonalSalud }> {
    try {
      const deletedPersonalSalud = await this.personalSaludService.deletePersonalSalud(id);
      return {
        statusCode: HttpStatus.OK,
        message: `Personal de salud con ID ${id} eliminado exitosamente`,
        data: deletedPersonalSalud,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Error al eliminar el personal de salud con ID ${id}`,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
