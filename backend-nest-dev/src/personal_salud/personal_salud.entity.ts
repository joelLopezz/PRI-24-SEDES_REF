import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import {AreaPersonal}  from '../area_personal/area_personal.entity'; 
import {RolTurno}  from '../rol_turnos/rol_turno.entity'; 
import { EstablecimientoSalud } from '../establecimiento/establecimiento.entity'; 
import {PersoEspeciaHospital} from '../perso_especia_hospital/entities/perso_especia_hospital.entity'

@Entity('personal_salud')
export class PersonalSalud {
  @PrimaryGeneratedColumn() 
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

  @OneToMany(() => AreaPersonal, (personal) => personal.personalSalud)
    areas: AreaPersonal[];

  @OneToMany(() => RolTurno, (turno) => turno.personalSalud)
  turnos: RolTurno[];

  @Column({type:'mediumint'})
  telefono:number;
  
  @ManyToOne(() => EstablecimientoSalud, (establecimiento) => establecimiento.personalSalud, { nullable: true })
  @JoinColumn({ name: 'establecimiento_salud_idestablecimiento_ID' }) 
  establecimientoSalud: EstablecimientoSalud; 

  @OneToMany(() => PersoEspeciaHospital, (especial) => especial.personal_salud)
  personalEspecialidadHospital: PersoEspeciaHospital[];
}
