//import { Tipo } from '../tipo/tipo.entity'; // Importa la entidad 
import {Cama}  from '../cama/cama.entity'; // Importa la entidad

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

@Entity('servicio')
export class Servicio {
  @PrimaryGeneratedColumn({ name: 'servicio_ID', type: 'smallint' })
  servicio_ID: number;

  @Column({ type: 'varchar', length: 45 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'smallint' })
  tipo_tipo_ID: number; // Este campo debe seguir existiendo

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  // Relación con la entidad Tipo
//   @ManyToOne(() => Tipo, (tipo) => tipo.tipo_ID)
//   @JoinColumn({ name: 'tipo_tipo_ID' }) // Vincula esta columna con el tipo_ID
//   tipo: Tipo;

  // Relación con la entidad Cama (relación inversa)
  @OneToMany(() => Cama, (cama) => cama.servicio)
  camas: Cama[];
}