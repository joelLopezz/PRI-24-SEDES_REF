import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { Municipio } from './municipio.entity';

@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  // Crear un nuevo municipio
  @Post()
  async create(@Body() data: Partial<Municipio>): Promise<Municipio> {
    return this.municipioService.create(data);
  }

  // Obtener todos los municipios
  @Get()
  async findAll(): Promise<Municipio[]> {
    return this.municipioService.findAll();
  }

  // Obtener un municipio por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Municipio> {
    return this.municipioService.findOne(id);
  }

  // Actualizar un municipio
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Municipio>,
  ): Promise<Municipio> {
    return this.municipioService.update(id, data);
  }

  // Eliminar un municipio (eliminación lógica)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.municipioService.delete(id);
  }
}
