/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EstablecimientoService } from './establecimiento.service';
import { EstablecimientoSalud } from './establecimiento.entity';

@Controller('establecimiento')
export class EstablecimientoController {
  constructor(
    private readonly establecimientoService: EstablecimientoService,
  ) {}

  // Crear un nuevo establecimiento
  @Post()
  async create(
    @Body() data: Partial<EstablecimientoSalud>,
  ): Promise<EstablecimientoSalud> {
    const usuarioID = data.usuario_creacion; // Extrae el usuario_ID de los datos
    return this.establecimientoService.create(data, usuarioID);
  }

  // Obtener todos los establecimientos
  @Get()
  async findAll(): Promise<EstablecimientoSalud[]> {
    return this.establecimientoService.findAll();
  }


  // Obtener nombres de establecimientos con ID
  @Get('nombres') // Nueva ruta para obtener solo los nombres e IDs
  async obtenerNombresEstablecimientos(): Promise<{ id: number; nombre: string }[]> {
    return this.establecimientoService.obtenerNombresEstablecimientos();
  }

  // Obtener un establecimiento por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EstablecimientoSalud> {
    return this.establecimientoService.findOne(id);
  }

  // Actualizar un establecimiento
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<EstablecimientoSalud>,
  ): Promise<EstablecimientoSalud> {
    const usuarioID = data.usuario_modificacion; // Extrae el usuario_ID de los datos
    return this.establecimientoService.update(id, data, usuarioID);
  }

  // Eliminar un establecimiento (eliminación lógica)
  // En el controlador de establecimiento
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Body() body: { usuario_modificacion: number },
  ) {
    const { usuario_modificacion } = body;
    await this.establecimientoService.delete(id, usuario_modificacion);
    return { message: 'Establecimiento eliminado correctamente' };
  }
}
