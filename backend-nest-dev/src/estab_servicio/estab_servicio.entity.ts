// src/estab_servicio/estab_servicio.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstablecimientoSalud } from '../establecimiento/establecimiento.entity';
import { Servicio } from '../servicio/servicio.entity';

@Entity('establecimiento_salud_servicio')
export class EstablecimientoSaludServicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  establecimiento_salud_id: number;

  @Column()
  servicio_id: number;

  @Column({ type: 'tinyint', default: 0 })
  equipo_instrumental: number;

  @Column({ type: 'tinyint', default: 0 })
  medicamentos_reactivos: number;

  @Column({ type: 'tinyint', default: 0 })
  insumos: number;

  @ManyToOne(() => EstablecimientoSalud, { eager: false }) // Puedes ajustar eager según tus necesidades
  @JoinColumn({ name: 'establecimiento_salud_id' })
  establecimiento: EstablecimientoSalud;

  @ManyToOne(() => Servicio, { eager: true }) // Eager true si deseas que cargue el servicio automáticamente
  @JoinColumn({ name: 'servicio_id' })
  servicio: Servicio;
}
