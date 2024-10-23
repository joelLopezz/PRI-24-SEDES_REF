import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transferencia } from '../transferencias/transferencia.entity';
import { DatosClinicos } from '../datosclinicos/datoclinico.entity';
import { Acompanante } from '../acompañante/acompañante.entity';
import { Referencia } from '../referencias/referencia.entity';
import { AntecedenteObstetrico } from '../antecedentesobstetricos/antecedentesobstetrico.entity';
import { Diagnosticos } from '../diagnosticos/diagnostico.entity';
import { Tratamientos } from '../tratamientos/tratamiento.entity';



export enum Sexo {
    Masculino = 'M',
    Femenino = 'F',
}

@Entity('paciente')
export class Paciente {
    @PrimaryGeneratedColumn()
    ID_Paciente: number;

    @Column({ type: 'varchar', length: 70 })
    Nombres: string;

    @Column({ type: 'varchar', length: 45 })
    Apellido_Paterno: string;

    @Column({ type: 'varchar', length: 45 })
    Apellido_Materno: string;

    @Column({ type: 'date' })
    Fecha_Nacimiento: Date;

    @Column({ type: 'varchar', length: 12 })
    ci: string;

    @Column({ type: 'text' })
    domicilio: string;

    @Column({ type: 'varchar', length: 12 })
    telefono: string;

    @Column({ type: 'varchar', length: 45 })
    historia_clinica: string;

    @Column({ type: 'varchar', length: 2 })
    procedencia: string;

    @Column({ type: 'enum', enum: Sexo })
    sexo: Sexo;

    @Column({ type: 'char', length: 2})
    Discapacidad: number;

    @Column({ type: 'varchar', length:255 })
    discapacidad: string;

    @Column({ type: 'varchar', length: 50 })
    tipo_discapacidad: string;

    @Column({ type: 'varchar', length: 50 })
    grado_discapacidad: string;

    @Column({ type: 'tinyint' })
    estado: number;

    @Column({ type: 'datetime' })
    fecha_creacion: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_modificacion: Date;

    @OneToMany(() => Acompanante, (acompanante) =>acompanante.paciente)
    acompanantes: Acompanante[];

    @OneToMany(() => AntecedenteObstetrico, (antecedentesobstetrico) =>antecedentesobstetrico.paciente)
    antecedentesobstetrico: AntecedenteObstetrico[];

    @OneToMany(() => DatosClinicos, (datosclinicos) => datosclinicos.paciente)
    datosClinicos: DatosClinicos[];

    //diagnostico
    @OneToMany(() => Diagnosticos, (diagnostico) => diagnostico.paciente)
    diagnostico: Diagnosticos[];

    @OneToMany(() => Referencia, (referencia) => referencia.paciente)
    referencias: Referencia[];

    @OneToMany(() => Transferencia, (transferencia) => transferencia.paciente)
    transferencias: Transferencia[];

    @OneToMany(() => Tratamientos, (tratamiento) => tratamiento.paciente)
    tratamiento: Tratamientos[];
}



//para cada tabla entidad 

// @ManyToOne(() => Paciente, (paciente) => paciente.acompanantes)
// @JoinColumn({ name: 'ID_Paciente' }) // Define el nombre de la clave foránea
// paciente: Paciente;

