import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

@Entity('referencia')
export class Referencia {
    @PrimaryGeneratedColumn()
    referencia_ID: number;

    @Column({ type: 'date' })
    fecha_ingreso: Date;

    @Column({ type: 'date' })
    fecha_envio: Date;

    @Column({ type: 'varchar', length: 255 })
    motivo_referencia: string;

    @Column({ type: 'varchar', length: 65 })
    nombre_contacto_receptor: string;

    @Column({ type: 'varchar', length: 60, nullable: true })
    medio_comunicacion: string;

    @Column({ type: 'date' })
    fecha_recepcion: Date;

    @Column({ type: 'time' })
    hora_recepcion: string;

    @Column({ type: 'smallint' })
    establecimiento_salud_receptor: number;

    @Column({ type: 'smallint' })
    establecimiento_salud_referente: number;

    @Column({ type: 'tinyint' })
    estado_aprobacion: number;

    @Column({ type: 'tinyint' })
    estado: number;

    @CreateDateColumn({ type: 'datetime' })
    fecha_creacion: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    fecha_modificacion: Date;

    // Relación ManyToOne con Paciente
    @ManyToOne(() => Paciente, (paciente) => paciente.referencias)
    @JoinColumn({ name: 'paciente_paciente_ID' })
    paciente: Paciente;
}
