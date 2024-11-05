import { Controller, Get, Param } from '@nestjs/common';
import { ReporteService } from './reporte.service';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Get('hospital/:hospitalId')
  async generarReportePorHospital(@Param('hospitalId') hospitalId: number) {
    return await this.reporteService.generarReportePorHospital(hospitalId);
  }
}
