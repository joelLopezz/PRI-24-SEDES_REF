import { Controller, Patch, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { HistoriaCamaService } from './historial_cama.service';

@Controller('historia-cama')
export class HistoriaCamaController {
  constructor(private readonly historiaCamaService: HistoriaCamaService) {}

  

  @Post('reinsertar/:id')
  async reinsertarDatosHistoria(
    @Param('id') historia_ID: number,
    @Body() body: { disponible: number; alta: number },
  ) {
    const { disponible, alta } = body;
    return await this.historiaCamaService.reinsertarDatosHistoria(historia_ID, disponible, alta);
  }


}
