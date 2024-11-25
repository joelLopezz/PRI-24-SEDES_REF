import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { RedCordinacionService } from './red-cordinacion.service';
import { RedCordinacion } from './red-cordinacion.entity';

@Controller('red-cordinacion')
export class RedCordinacionController {
  constructor(private readonly redCordinacionService: RedCordinacionService) {}
  // Crear una nueva red de coordinación
  @Post()
  async create(
    @Body() data: Partial<RedCordinacion> & { usuario_ID: number },
  ): Promise<RedCordinacion> {
    return this.redCordinacionService.create(data);
  }
  // Obtener todas las redes de coordinación
  @Get()
  async findAll(): Promise<RedCordinacion[]> {
    return this.redCordinacionService.findAll();
  }
  // Obtener solo ID, nombre y numeración de redes activas
  @Get('activos')
  async findActive(): Promise<Partial<RedCordinacion[]>> {
    return this.redCordinacionService.findActive();
  }
  // Obtener una red por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RedCordinacion> {
    return this.redCordinacionService.findOne(id);
  }
  // Actualizar una red de coordinación en el controlador
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<RedCordinacion> & { usuario_modificacion: number },
  ): Promise<RedCordinacion> {
    return this.redCordinacionService.update(id, data);
  }
  // Eliminar una red (eliminación lógica)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Body() data: { usuario_ID: number },
  ): Promise<void> {
    return this.redCordinacionService.delete(id, data.usuario_ID);
  }
}
