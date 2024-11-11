import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { AreaPersonalService } from './area_personal.service';
import { CreateAreaPersonalDto } from './dto/create-area_personal.dto';
import { UpdateAreaPersonalDto } from './dto/update-area_personal.dto';

@Controller('area-personal')
export class AreaPersonalController {
  constructor(private readonly areaPersonalService: AreaPersonalService) {}

  // Endpoint para crear un nuevo área personal
  @Post()
  async create(@Body() createAreaPersonalDto: CreateAreaPersonalDto) {
    return this.areaPersonalService.create(createAreaPersonalDto);
  }

  @Delete('delete-multiple')
  async deleteMultiple(@Body('ids') ids: number[]) {
    return this.areaPersonalService.deleteMultiple(ids);
  }

  // Endpoint para crear múltiples áreas personales
  @Post('multiple')
  async createMultiple(@Body() createAreaPersonalDtos: CreateAreaPersonalDto[]) {
    return this.areaPersonalService.createMultiple(createAreaPersonalDtos);
  }

  @Put('update-multiple')
  async updateMultiple(@Body() updateAreaPersonalDtos: UpdateAreaPersonalDto[]) {
    return this.areaPersonalService.updateMultiple(updateAreaPersonalDtos);
  }

  // Endpoint para obtener todas las áreas personales
  @Get()
  async findAll() {
    return this.areaPersonalService.findAll();
  }

  // Endpoint para obtener un área personal por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.areaPersonalService.findOne(+id);
  }

  // Endpoint para actualizar un área personal por ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAreaPersonalDto: UpdateAreaPersonalDto,
  ) {
    return this.areaPersonalService.update(+id, updateAreaPersonalDto);
  }

  // Endpoint para eliminar un área personal por ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.areaPersonalService.remove(+id);
  }
}