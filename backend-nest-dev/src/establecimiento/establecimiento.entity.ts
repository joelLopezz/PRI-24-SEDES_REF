//import { RedCordinacion } from '../red-cordinacion/red-cordinacion.entity'; // Importa la entidad RedCordinacion
import {Cama}  from '../cama/cama.entity'; 
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

@Entity('establecimiento_salud')
export class EstablecimientoSalud {
  @PrimaryGeneratedColumn({ name: 'idestablecimiento_ID', type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 65 })
  nombre: string;

  @Column({ type: 'varchar', length: 30 })
  nivel: string;

  @Column({ type: 'varchar', length: 12 })
  telefono: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  sello: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitud: number;

  @Column({ type: 'tinyint' })
  red_cordinacion_red_ID: number; // Campo que sigue existiendo

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  // Relación con la entidad RedCordinacion
//   @ManyToOne(() => RedCordinacion, (red) => red.red_ID)
//   @JoinColumn({ name: 'red_cordinacion_red_ID' }) // Vincula esta columna con red_ID
//   redCordinacion: RedCordinacion;


  // Relación con la entidad Cama (relación inversa)
  @OneToMany(() => Cama, (cama) => cama.servicio)
  camas: Cama[];

  @Column({ type: 'mediumint', nullable: false })
  usuario_creacion: number;

  @Column({ type: 'mediumint', nullable: true })
  usuario_modificacion: number;
}