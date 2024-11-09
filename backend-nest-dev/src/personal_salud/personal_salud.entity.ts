/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('personal_salud')
export class PersonalSalud {
  @PrimaryGeneratedColumn() // Clave primaria autogenerada
  personal_ID: number;

  @Column({ type: 'varchar', length: 70 })
  nombres: string;

  @Column({ type: 'varchar', length: 45 })
  primer_apellido: string;

  @Column({ type: 'varchar', length: 45 })
  segundo_apellido: string;

  @Column({ type: 'varchar', length: 12 })
  ci: string;

  @Column({ type: 'varchar', length: 60 })
  matricula_profesional: string;

  @Column({ type: 'char', length: 1 })
  sexo: string;

  @Column({ type: 'varchar', length: 50 })
  cargo: string;

  @Column({ type: 'varchar', length: 100 })
  correo_electronico: string;

  @Column({ type: 'smallint' })
  establecimiento_salud_idestablecimiento_ID: number;

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @CreateDateColumn({ type: 'datetime' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  @Column({ type: 'mediumint', nullable: true })
  usuario_creacion: number;

  @Column({ type: 'mediumint', nullable: true })
  usuario_modificacion: number;

  @OneToMany(() => Usuario, (usuario) => usuario.personal)
  usuarios: Usuario[];
}
