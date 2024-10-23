import { Controller, Get, Param } from '@nestjs/common';
import { CamaService } from './cama.service';
import { Cama } from './cama.entity';

@Controller('camas')
export class CamaController {
  constructor(private readonly camaService: CamaService) {}

  // Obtener todas las camas
  @Get()
  async findAll(): Promise<Cama[]> {
    return await this.camaService.findAll();
  }

  // Obtener una cama por su número
  @Get(':numero')
  async findOne(@Param('numero') numero: number): Promise<Cama> {
    return await this.camaService.findOne(numero);
  }
}
