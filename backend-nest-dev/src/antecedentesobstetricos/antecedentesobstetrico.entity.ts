import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, NumericType } from "typeorm";
import { Paciente } from '../paciente/paciente.entity';

@Entity('antecedentesobstetricos')
export class AntecedenteObstetrico {
    @PrimaryGeneratedColumn()
    antecedente_obstetrico: number;

    @Column({ type: 'date' })
    FUN: Date;

    @Column({ type: 'varchar', length: 10 })
    gpa: string;

    @Column({ type: 'date' })
    fpp: Date;

    @Column({ type: 'time' })
    rpm: string;

    @Column({ type: 'int'})
    fcf: number;

    @Column({ type: 'int', default:1})
    maduracion_pulmonar: number;

    @Column({ type: 'float'})
    is_value: number;

    // @Column({type: 'int'})
    // paciente_paciente_ID: number;

    @Column({ type: 'tinyint' })
    estado: number; 

    @Column({ type: 'datetime' })
    fecha_creacion: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_modificacion: Date;

    // Relación ManyToOne con Paciente
    @ManyToOne(() => Paciente, (paciente) => paciente.antecedentesobstetrico)
    @JoinColumn({ name: 'paciente_paciente_ID' })  // Aquí especificas el nombre correcto de la clave foránea
    paciente: Paciente;

}