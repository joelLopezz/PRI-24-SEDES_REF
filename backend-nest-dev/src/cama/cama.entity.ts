import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EstablecimientoSalud } from 'src/establecimiento/establecimiento.entity';
import { Especialidad } from 'src/especiaidad/especialidad.entity';
import { Servicio } from 'src/servicio/servico.entity';

@Entity('cama')
export class Cama {
  @Column({ type: 'tinyint' })
  numero: number;

  @Column({ type: 'tinyint' })
  estado: number;

  @ManyToOne(() => EstablecimientoSalud, (establecimientoSalud) => establecimientoSalud.camas)
  @JoinColumn({ name: 'establecimiento_salud_idestablecimiento_ID' })
  establecimientoSalud: EstablecimientoSalud;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.camas)
  @JoinColumn({ name: 'especialidad_especialidad_ID' })
  especialidad: Especialidad;

  @ManyToOne(() => Servicio, (servicio) => servicio.camas)
  @JoinColumn({ name: 'servicio_servicio_ID' })
  servicio: Servicio;

  @CreateDateColumn({ type: 'datetime' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime' })
  fecha_modificacion: Date;
}