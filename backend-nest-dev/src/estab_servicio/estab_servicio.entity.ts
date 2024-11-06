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

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fecha_actualizacion: Date;

  @ManyToOne(() => EstablecimientoSalud, { eager: false })
  @JoinColumn({ name: 'establecimiento_salud_id' })
  establecimiento: EstablecimientoSalud;

  @ManyToOne(() => Servicio, { eager: true })
  @JoinColumn({ name: 'servicio_id' })
  servicio: Servicio;
}
