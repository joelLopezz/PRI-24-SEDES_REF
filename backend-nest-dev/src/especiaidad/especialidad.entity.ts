import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cama } from 'src/cama/cama.entity';

@Entity('especialidad')
export class Especialidad {
  @PrimaryGeneratedColumn()
  especialidad_ID: number;

  @Column({ type: 'varchar', length: 60 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'tinyint' })
  estado: number;

  @OneToMany(() => Cama, (cama) => cama.especialidad)
  camas: Cama[];

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_modificacion: Date;

  @Column({type: 'mediumint', nullable: false})
  eliminado: number
}
