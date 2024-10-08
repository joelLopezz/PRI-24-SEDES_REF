// src/tipo/entities/tipo.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tipo')
export class Tipo {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  tipo_ID: number;

  @Column({ type: 'varchar', length: 55 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
  //prettier-ignore
  @UpdateDateColumn({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  fecha_modificacion: Date;
}
