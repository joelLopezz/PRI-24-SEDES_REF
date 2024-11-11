import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultaExternaDto } from './create-consulta_externa.dto';

export class UpdateConsultaExternaDto extends PartialType(CreateConsultaExternaDto) {}
