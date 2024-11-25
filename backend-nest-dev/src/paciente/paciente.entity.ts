// src/paciente/paciente.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Acompanante } from 'src/acompañante/acompañante.entity';
import { AntecedenteObstetrico } from 'src/antecedentesobstetricos/antecedentesobstetrico.entity';
import { DatosClinicos } from 'src/datosclinicos/datoclinico.entity';
import { Diagnosticos } from 'src/diagnosticos/diagnostico.entity';
import { Transferencia } from 'src/transferencias/transferencia.entity';
import { Tratamientos } from 'src/tratamientos/tratamiento.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  paciente_ID: number;

  @Column({ type: 'varchar', length: 70 })
  nombres: string;

  @Column({ type: 'varchar', length: 45 })
  primer_apellido: string;

  @Column({ type: 'varchar', length: 45 })
  segundo_apellido: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ type: 'varchar', length: 12 })
  ci: string;

  @Column({ type: 'text', nullable: true })
  domicilio: string;

  @Column({ type: 'varchar', length: 12 })
  telefono: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  historia_clinica: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  procedencia: string;

  @Column({ type: 'char', length: 1 })
  sexo: string;

  @Column({ type: 'char', length: 2 })
  discapacidad: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo_discapacidad: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  grado_discapacidad: string;

  @Column({ type: 'tinyint' })
  estado: number;

  @Column({ type: 'datetime' })
  fecha_creacion: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_modificacion: Date;

  @Column({ type: 'mediumint' })
  usuario_creacion: number;

  @Column({ type: 'mediumint', nullable: true })
  usuario_modificacion: number;


  // Agregados :


  @OneToMany(() => Acompanante, (acompanante) => acompanante.paciente)
  acompanantes: Acompanante[];

  @OneToMany(() => AntecedenteObstetrico, (antecedente) => antecedente.paciente)
antecedentesobstetrico: AntecedenteObstetrico[];

@OneToMany(() => DatosClinicos, (datosClinicos) => datosClinicos.paciente)
datosClinicos: DatosClinicos[];

@OneToMany(() => Diagnosticos, (diagnostico) => diagnostico.paciente)
diagnostico: Diagnosticos[];

@OneToMany(() => Transferencia, (transferencias) => transferencias.paciente)
transferencias: Transferencia[];

@OneToMany(() => Tratamientos, (tratamiento) => tratamiento.paciente)
tratamiento: Tratamientos[];
}
