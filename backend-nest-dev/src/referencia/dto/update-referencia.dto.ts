// src/referencia/dto/update-referencia.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenciaDto } from './create-referencia.dto';

export class UpdateReferenciaDto extends PartialType(CreateReferenciaDto) {}
