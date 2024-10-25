import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('municipio')
export class Municipio {
  @PrimaryGeneratedColumn({ name: 'municipio_ID', type: 'smallint' })
  municipio_ID: number;

  @Column({ type: 'varchar', length: 45 })
  nombre: string;

  @Column({ name: 'provincia_provincia_ID', type: 'tinyint' })
  provincia_ID: number;

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;
}
