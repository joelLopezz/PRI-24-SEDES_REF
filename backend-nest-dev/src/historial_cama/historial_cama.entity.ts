import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import  { Cama } from '../cama/cama.entity';


@Entity('historial_cama')
export class HistoriaCama {
  @PrimaryGeneratedColumn()
  historia_ID: number;

  @ManyToOne(() => Cama, (cama) => cama.historial)
  @JoinColumn({ name: 'cama_ID' })
  cama: Cama;

  @Column({ type: 'mediumint' })
  instalada: number;
  
  @Column({ type: 'mediumint' })
  ofertada: number;

  @Column({ type: 'mediumint' })
  disponible: number;

  @Column({ type: 'mediumint' })
  ocupada: number;

  @Column({ type: 'mediumint' })
  alta: number;

  @Column({ type: 'boolean', default: false })
  es_actual: number;

  @Column({ type: 'mediumint' })
  usuario_modificacion: number;

  @CreateDateColumn()
  fecha_modificacion: Date;

}
