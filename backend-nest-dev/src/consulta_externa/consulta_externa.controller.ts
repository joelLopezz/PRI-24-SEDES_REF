import { Controller, Get } from '@nestjs/common';
import { ConsultaExternaService } from './consulta_externa.service';

@Controller('consulta-externa')
export class ConsultaExternaController {
  constructor(private readonly consultaExternaService: ConsultaExternaService) {}

  @Get('reporte-especialidades')
  async obtenerReporte(): Promise<any[]> {
    return this.consultaExternaService.obtenerReporteEspecialidades();
  }

  @Get('reporte-completo')
  async obtenerReporteCompleto() {
    try {
      const reporteCompleto = await this.consultaExternaService.obtenerReporteCompleto();
      return reporteCompleto;
    } catch (error) {
      console.error('Error al obtener el reporte completo:', error);
      throw error;
    }
  }
}
