import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository  } from '@nestjs/typeorm';
import { DataSource, Repository  } from 'typeorm';


import { PacientesService } from '../pacientes/paciente.service';
import { DatosAcompananteService } from '../acompañante/acompañante.service';
import { DiagnosticosService } from '../diagnosticos/diagnostico.service';
import { DatosClinicosService } from '../datosclinicos/datoclinico.service';
import { CreateReferenciaDto } from '../referencias/dto/create-referencia.dto';
import { TransferenciasService } from '../transferencias/transferencia.service';
import { AntecedenteObstetricoService } from '../antecedentesobstetricos/antecedentesobstetrico.service';
import { Referencia } from './referencia.entity';



@Injectable()
export class ReferenciaService {
  constructor(
    @InjectDataSource() private readonly connection: DataSource,
    @InjectRepository(Referencia) private readonly referenciaRepository: Repository<Referencia>, // Inyecta el repositorio de Referencia
    private pacientesService: PacientesService,
    private acompananteService: DatosAcompananteService,
    private diagnosticosService: DiagnosticosService,
    private datosClinicosService: DatosClinicosService,
    private transferenciasService: TransferenciasService,
    private antecedentesObstetricosService: AntecedenteObstetricoService,
  ) {}
   

    //Crear ref.
    async createReferencia(createReferenciaDto: CreateReferenciaDto) {
        return await this.connection.transaction(async manager => {
        // Crear paciente
        const paciente = await this.pacientesService.createPaciente(createReferenciaDto.paciente, manager);
        
        // Crear acompañantes
        for (const acompananteData of createReferenciaDto.acompanantes) {
            await this.acompananteService.createDatosAcompanante ({
            ...acompananteData,
            //paciente_ID_Paciente: paciente.ID_Paciente,
            paciente: paciente,
            }, manager);
        }
        
        // Crear datos clínicos
        await this.datosClinicosService.createDatosClinicos({
            ...createReferenciaDto.datosClinicos,
            //ID_Paciente: paciente.ID_Paciente,
            paciente: paciente,
        }, manager);

        // Crear diagnósticos
        for (const diagnosticoData of createReferenciaDto.diagnosticos) {
            await this.diagnosticosService.createDiagnosticos({
            ...diagnosticoData,
            //ID_Paciente: paciente.ID_Paciente,
            paciente: paciente,
            }, manager);
        }

        // Crear antecedentes obstétricos
        await this.antecedentesObstetricosService.createAntecedenteObstetrico({
            ...createReferenciaDto.antecedentesObstetricos,
            //ID_Paciente: paciente.ID_Paciente,
            paciente: paciente,
        }, manager);

        // Crear transferencias
        await this.transferenciasService.createTransferencia({
            ...createReferenciaDto.transferencia,
            paciente: paciente,    //==>no se por xdd
            //ID_Paciente: paciente.ID_Paciente,
        }, manager);

        return { message: 'Referencia creada exitosamente' };
        });
    }


    // Método para obtener todas las referencias
    async getAllReferencias(): Promise<Referencia[]> {
        try {
        // Consulta todas las referencias almacenadas
        return await this.referenciaRepository.find();
        } catch (error) {
        // Manejo básico de errores
        throw new Error(`Error al obtener referencias: ${error.message}`);
        }
    }


    // Método para obtener una referencia por ID
    async getReferenciaById(id: number): Promise<Referencia> {
        try {
        const referencia = await this.referenciaRepository.findOne({ where: { referencia_ID: id } });
        
        if (!referencia) {
            throw new Error('Referencia no encontrada');
        }
    
        return referencia;
        } catch (error) {
        // Manejo básico de errores
        throw new Error(`Error al obtener la referencia con ID ${id}: ${error.message}`);
        }
    }


    //metodo para filtrar todas las referencias  ======>Necesitamos todo lo relacionado a esblecientoHospital
    // async getFilteredReferencias() {
    //     return this.referenciaRepository
    //         .createQueryBuilder('referencia')
    //         .leftJoinAndSelect('referencia.paciente', 'paciente')
    //         .leftJoinAndSelect('referencia.personalSalud', 'doctor') // Asumiendo que la relación con el doctor es así
    //         .select([
    //             'paciente.Nombres',            // Nombre del paciente
    //             'paciente.CI',                 // CI del paciente
    //             'doctor.names',                // Nombre del doctor (PersonalSalud)
    //             'referencia.Fecha_Ingreso',    // Fecha de creación del formulario
    //         ])
    //     .getMany();
    // }

}

