import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstablecimientoSalud } from '../establecimiento/establecimiento.entity';
import { Specialty } from '../specialty/specialty.entity';

@Entity('establecimiento_salud_has_especialidad')
export class EstablecimientoSaludHasEspecialidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  establecimiento_salud_idestablecimiento_ID: number;

  @Column()
  especialidad_ID: number;

  @ManyToOne(() => EstablecimientoSalud)
  @JoinColumn({ name: 'establecimiento_salud_idestablecimiento_ID' })
  establecimiento: EstablecimientoSalud;

  @ManyToOne(() => Specialty)
  @JoinColumn({ name: 'especialidad_ID' })
  especialidad: Specialty;
}
