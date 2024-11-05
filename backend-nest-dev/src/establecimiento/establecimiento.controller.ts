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
      return this.establecimientoService.create(data);
    }
  
    // Obtener todos los establecimientos
    @Get()
    async findAll(): Promise<EstablecimientoSalud[]> {
      return this.establecimientoService.findAll();
    }

    // Endpoint para obtener todos los establecimientos de salud
    @Get('nombres')
    async obtenerNombresEstablecimientos() {
      return await this.establecimientoService.obtenerNombresEstablecimientos();
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
      return this.establecimientoService.update(id, data);
    }
  
    // Eliminar un establecimiento (eliminación lógica)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      return this.establecimientoService.delete(id);
    }
  }