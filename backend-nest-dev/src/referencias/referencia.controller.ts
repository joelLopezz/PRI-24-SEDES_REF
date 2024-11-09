import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { ReferenciaService } from "./referencia.service";
import  { Referencia } from "./referencia.entity";
import { CreateReferenciaDto } from './dto/create-referencia.dto';


@Controller('referencias')
export class ReferenciaController {
  constructor(private readonly referenciaService: ReferenciaService) {}

    // Endpoint para crear una referencia, junto con los datos relacionados (pacientes, acompañantes, etc.)
    @Post()
    async createReferencia(@Body() createReferenciaDto: CreateReferenciaDto) {
      return this.referenciaService.createReferencia(createReferenciaDto);
    }


    // Ruta para obtener las referencias filtradas     =======> Necesitamos todo lo relacionado a esblecientoHospital
    // @Get('filtradas')
    // async getFilteredReferencias() {
    //   return this.referenciaService.getFilteredReferencias();
    // }


    // Obtener todas las referencias
    @Get()
    async getAllReferencias() {
      return this.referenciaService.getAllReferencias();
    }

    // Obtener una referencia por ID
    @Get(':id')
    async getReferenciaById(@Param('id') id: number) {
      return this.referenciaService.getReferenciaById(id);
    }
}
