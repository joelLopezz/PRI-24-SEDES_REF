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
    // Llama al método para actualizar el registro anterior
    await this.actualizarRegistroAnterior(historia_ID);
    // Obtener el registro de HistoriaCama por historia_ID para obtener el cama_ID asociado
    const historiaExistente = await this.historiaCamaRepository.findOne({
      where: { historia_ID },
      relations: ['cama', 'cama.especialidad'],
    });

    // Validar que el registro exista
    if (!historiaExistente) {
      throw new NotFoundException('No se encontró ningún historial con ID ${historia_ID}');
    }

    const cama_ID = historiaExistente.cama.cama_ID;
    console.log("cama_ID asociado:", cama_ID);

    // Obtener los valores correctos de instalada y ofertada del último registro en HistoriaCama para la misma cama_ID
    const ultimoRegistro = await this.historiaCamaRepository.findOne({
      where: { cama: { cama_ID } },
      order: { fecha_modificacion: 'DESC' },
    });

    if (!ultimoRegistro) {
      console.log("cama_ID asociado:", cama_ID);
      throw new NotFoundException('No se encontró un registro anterior de historial para la cama con ID ${cama_ID}');
    }
    console.log("Último registro encontrado para la misma cama_ID:", ultimoRegistro);

    // Obtener instalada y ofertada desde el último registro sin modificación
    const ocupada = ultimoRegistro.ocupada;
    const instaladaConstante = ultimoRegistro.instalada;
    const ofertadaConstante = ultimoRegistro.ofertada;
    console.log("Valores constantes obtenidos del último registro:", { instaladaConstante, ofertadaConstante });

    // Calcular el valor de ocupada usando la fórmula correcta: ocupada = ofertada - disponible - alta
    //const nuevaOcupada = ofertadaConstante - disponible - alta;
    //console.log("Valor calculado para ocupada:", nuevaOcupada);

    // Crear el nuevo registro en HistoriaCama copiando instalada y ofertada exactamente como en el último registro
    const nuevoRegistro = new HistoriaCama();
    nuevoRegistro.cama = { cama_ID } as Cama;
    nuevoRegistro.instalada = instaladaConstante; 
    nuevoRegistro.ofertada = ofertadaConstante; 
    nuevoRegistro.disponible = disponible;
    nuevoRegistro.ocupada = ocupada;
    nuevoRegistro.alta = alta;
    nuevoRegistro.usuario_modificacion = 0; // Cambiar según el usuario actual
    nuevoRegistro.es_actual = 1;
    console.log("Nuevo registro preparado para guardar:", nuevoRegistro);

    // Guardar el nuevo registro en la base de datos
    const resultado = await this.historiaCamaRepository.save(nuevoRegistro);
    console.log("Nuevo registro guardado en la base de datos:", resultado);

    return resultado;
  }



  // Método para actualizar el registro previo con es_actual = false
  async actualizarRegistroAnterior(historia_ID: number): Promise<void> {
    // Buscar el último registro donde es_actual = true y coincide con el historia_ID
    const registroAnterior = await this.historiaCamaRepository.findOne({
      where: { historia_ID, es_actual: 1 },
    });

    // Validar si existe un registro actual y actualizarlo a false
    if (registroAnterior) {
      registroAnterior.es_actual = 0;
      await this.historiaCamaRepository.save(registroAnterior);
    }
}

}
