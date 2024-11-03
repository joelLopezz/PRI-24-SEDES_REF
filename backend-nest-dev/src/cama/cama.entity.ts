// Cama Entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Especialidad } from '../especiaidad/especialidad.entity';
import { Servicio } from '../servicio/servico.entity';
import { EstablecimientoSalud } from 'src/establecimiento/establecimiento.entity';
import { HistoriaCama } from '../historial_cama/historial_cama.entity';

@Entity('cama')
export class Cama {
  @PrimaryGeneratedColumn()
  cama_ID: number;


  @Column({ type: 'tinyint' })
  estado: number;

  @ManyToOne(() => EstablecimientoSalud, (establecimiento) => establecimiento.camas)
  @JoinColumn({ name: 'establecimiento_salud_ID' })
  establecimientoSalud: EstablecimientoSalud;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.camas)
  @JoinColumn({ name: 'especialidad_ID' })
  especialidad: Especialidad;

  @ManyToOne(() => Servicio, (servicio) => servicio.camas)
  @JoinColumn({ name: 'servicio_ID' })
  servicio: Servicio;

  @OneToMany(() => HistoriaCama, (historiaCama) => historiaCama.cama)
  historial: HistoriaCama[];

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_modificacion: Date;
}  
