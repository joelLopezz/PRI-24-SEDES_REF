import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaCama } from '../historial_cama/historial_cama.entity';
import { Cama } from '../cama/cama.entity';

@Injectable()
export class HistoriaCamaService {
  constructor(
    @InjectRepository(HistoriaCama)
    private readonly historiaCamaRepository: Repository<HistoriaCama>,

    @InjectRepository(Cama)
    private readonly camaRepository: Repository<Cama>,
  ) {}
  

  async reinsertarDatosHistoria(historia_ID: number, disponible: number, alta: number): Promise<HistoriaCama> {
    await this.actualizarRegistroAnterior(historia_ID);
    const historiaExistente = await this.historiaCamaRepository.findOne({
      where: { historia_ID },
      relations: ['cama', 'cama.especialidad'],
    });

    if (!historiaExistente) {
      throw new NotFoundException('No se encontró ningún historial con ID ${historia_ID}');
    }

    const cama_ID = historiaExistente.cama.cama_ID;
    console.log("cama_ID asociado:", cama_ID);

    const ultimoRegistro = await this.historiaCamaRepository.findOne({
      where: { cama: { cama_ID } },
      order: { fecha_modificacion: 'DESC' },
    });

    if (!ultimoRegistro) {
      console.log("cama_ID asociado:", cama_ID);
      throw new NotFoundException('No se encontró un registro anterior de historial para la cama con ID ${cama_ID}');
    }
    console.log("Último registro encontrado para la misma cama_ID:", ultimoRegistro);

    const ocupada = ultimoRegistro.ocupada;
    const instaladaConstante = ultimoRegistro.instalada;
    const ofertadaConstante = ultimoRegistro.ofertada;
    console.log("Valores constantes obtenidos del último registro:", { instaladaConstante, ofertadaConstante });

    // Calcular el valor de ocupada usando la fórmula correcta: ocupada = ofertada - disponible - alta
    //const nuevaOcupada = ofertadaConstante - disponible - alta;
    //console.log("Valor calculado para ocupada:", nuevaOcupada);

    const nuevoRegistro = new HistoriaCama();
    nuevoRegistro.cama = { cama_ID } as Cama;
    nuevoRegistro.instalada = instaladaConstante; 
    nuevoRegistro.ofertada = ofertadaConstante; 
    nuevoRegistro.disponible = disponible;
    nuevoRegistro.ocupada = ocupada;
    nuevoRegistro.alta = alta;
    nuevoRegistro.usuario_modificacion = 0;
    nuevoRegistro.es_actual = 1;
    console.log("Nuevo registro preparado para guardar:", nuevoRegistro);

    const resultado = await this.historiaCamaRepository.save(nuevoRegistro);
    console.log("Nuevo registro guardado en la base de datos:", resultado);

    return resultado;
  }



  // Método para actualizar el registro previo con es_actual = false
  async actualizarRegistroAnterior(historia_ID: number): Promise<void> {
    const registroAnterior = await this.historiaCamaRepository.findOne({
      where: { historia_ID, es_actual: 1 },
    });

    if (registroAnterior) {
      registroAnterior.es_actual = 0;
      await this.historiaCamaRepository.save(registroAnterior);
    }
}

}
