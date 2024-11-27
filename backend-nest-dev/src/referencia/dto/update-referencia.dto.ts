// src/referencia/dto/update-referencia.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenciaDto } from './create-referencia.dto';

export class UpdateReferenciaDto extends PartialType(CreateReferenciaDto) {
    fecha_ingreso?: Date;
  fecha_envio?: Date;
  motivo_referencia?: string;
  nombre_contacto_receptor?: string;
  medio_comunicacion?: string;
  fecha_recepcion?: Date;
  hora_recepcion?: string;
  establecimiento_salud_receptor?: number;
  establecimiento_salud_referente?: number;
  estado_aprobacion?: number;
}
