import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PersonalSalud } from '../personal_salud/personal_salud.entity';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn() 
    usuario_ID: number;

    @Column({ type: 'varchar', length: 50 })
    nombre_usuario: string;

    @Column({ type: 'varchar', length: 255 })
    contrasenia: string;

    @Column({ type: 'tinyint' })
    estado: number;

    @Column({ type: 'varchar', length: 20 })
    rol: string;

    @Column({ type: 'datetime' })
    fecha_creacion: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_modificacion: Date;

    @Column({ type: 'smallint' })
    establecimiento_id: number;

    @ManyToOne(() => PersonalSalud, (personal) => personal.usuarios, { nullable: false })
    @JoinColumn({ name: 'personal_ID' })
    personal: PersonalSalud;
}

