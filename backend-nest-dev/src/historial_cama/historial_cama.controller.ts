import { Controller, Patch, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { HistoriaCamaService } from './historial_cama.service';

@Controller('historia-cama')
export class HistoriaCamaController {
  constructor(private readonly historiaCamaService: HistoriaCamaService) {}

  

  @Patch('reinsertar/:id')
  async reinsertarDatosHistoria(@Param('id') historia_ID: number) {
    return await this.historiaCamaService.reinsertarDatosHistoria(historia_ID);
  }







  // @Patch(':id')
  // async insertarNuevoHistorial(
  //   @Param('id') id: string,
  //   @Body() body: { disponible: number; alta: number; usuarioModificacion: number },
  // ) {
  //   const { disponible, alta, usuarioModificacion } = body;

  //   // Validación de los parámetros
  //   if (disponible === undefined || alta === undefined || usuarioModificacion === undefined) {
  //     throw new BadRequestException('Faltan datos obligatorios: disponible, alta o usuarioModificacion');
  //   }

  //   if (disponible < 0 || alta < 0) {
  //     throw new BadRequestException('Los valores de disponible y alta deben ser mayores o iguales a 0');
  //   }

  //   if (isNaN(+id)) {
  //     throw new BadRequestException('El ID de la cama debe ser un número válido');
  //   }

  //   // Llamada al servicio para insertar un nuevo registro en el historial
  //   // return await this.historiaCamaService.insertarNuevoHistorial(+id, { disponible, alta }, usuarioModificacion);
  // }


}
