import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExpandableSection from '../../Components/ExpandableSection';
import axios from 'axios';
import './Styles/App.css';
import { useAuth } from '../../Context/AuthContext';

const ReferenciaEdit: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams<{ id: string }>();
  const [referencia, setReferencia] = useState<any>({
    fecha_ingreso: '',
    fecha_envio: '',
    motivo_referencia: '',
    nombre_contacto_receptor: '',
    medio_comunicacion: '',
    fecha_recepcion: '',
    hora_recepcion: '',
  });
  const [paciente, setPaciente] = useState<any>({
    nombres: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    ci: '',
    domicilio: '',
    telefono: '',
    procedencia: '',
    historia_clinica: '',
    sexo: '',
    discapacidad:'',
    tipo_discapacidad: '',
    grado_discapacidad:'',
  });
  const navigate = useNavigate();

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/referencias/${id}`)
      .then((response) => {
        const data = response.data;
        setReferencia({
          fecha_ingreso: data.fecha_ingreso || '',
          fecha_envio: data.fecha_envio || '',
          motivo_referencia: data.motivo_referencia || '',
          nombre_contacto_receptor: data.nombre_contacto_receptor || '',
          medio_comunicacion: data.medio_comunicacion || '',
          fecha_recepcion: data.fecha_recepcion || '',
          hora_recepcion: data.hora_recepcion || '',
        });
        setPaciente({
          nombres: data.paciente_paciente_ID?.nombres || '',
          primer_apellido: data.paciente_paciente_ID?.primer_apellido || '',
          segundo_apellido: data.paciente_paciente_ID?.segundo_apellido || '',
          fecha_nacimiento: data.paciente_paciente_ID?.fecha_nacimiento || '',
          ci: data.paciente_paciente_ID?.ci || '',
          domicilio: data.paciente_paciente_ID?.domicilio || '',
          telefono: data.paciente_paciente_ID?.telefono || '',
          procedencia: data.paciente_paciente_ID?.procedencia || '',
          historia_clinica: data.paciente_paciente_ID?.historia_clinica || '',
          sexo: data.paciente_paciente_ID?.sexo || '',
          discapacidad: data.paciente_paciente_ID?.discapacidad || '',
          tipo_discapacidad: data.paciente_paciente_ID?.tipo_discapacidad || '',
          grado_discapacidad: data.paciente_paciente_ID?.grado_discapacidad || '',
        });
      })
      .catch((error) => {
        console.error('Error fetching reference:', error);
        alert('Failed to load the reference data.');
      });
  }, [id]);

  // Manejar cambios en los inputs
  const handleReferenciaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReferencia((prev: any) => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));
  };

  const handlePacienteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaciente((prev: any) => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));
  };

  const { hasPermission } = useAuth(); // Usamos el contexto para verificar roles

  const handleSave = async () => {
    try {
      // Verificar si el campo C12 está lleno
      const isC12Complete =
        referencia.fecha_recepcion || referencia.hora_recepcion || referencia.medio_comunicacion;
      if (!referencia || !paciente) {
        alert('Faltan datos para actualizar.');
        return;
      }
  
      // Construir el cuerpo de la solicitud
      const updateRegistroDto = {
        paciente,
        referencia: {
          ...referencia,
          estado: isC12Complete ? 2 : 1, // Estado 2 si C12 está lleno, 1 de lo contrario
        },
      };
  
      // Hacer la solicitud PATCH al endpoint consolidado
      await axios.patch(`${API_BASE_URL}/registro/${id}`, updateRegistroDto);
  
      alert('Referencia y paciente actualizados correctamente');
      navigate('/referencia'); // Redirigir al listado
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Error al actualizar la referencia o el paciente');
    }
  };

  const allowedRolesC12 = ['Admin Sedes', 'Admin Hospital'];

  if (!referencia || !paciente) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="formulario-referencias">
      <h2 className="titulo-formulario">Editar Referencia</h2>

      {/* Desplegable C1 */}
      <ExpandableSection title="DATOS DEL ESTABLECIMIENTO DE SALUD REFERENTE (C1)">
        <div className="grid-container">
          <div className="form-group">
            <label>Nombre del establecimiento:</label>
            <input type="text" placeholder="Ingrese el nombre del establecimiento" />
          </div>
          <div className="form-group">
            <label>Nivel del EESS:</label>
            <input type="text" placeholder="Ingrese el nivel del EESS" />
          </div>
          <div className="form-group">
            <label>Red de Salud:</label>
            <input type="text" placeholder="Ingrese la red de salud" />
          </div>
          <div className="form-group">
            <label>Municipio:</label>
            <select>
              <option>Seleccione una opción</option>
              {/* Agregar opciones adicionales aquí */}
            </select>
          </div>
          <div className="form-group">
            <label>Tel/Cel del EESS:</label>
            <input type="tel" placeholder="Ingrese el teléfono o celular del EESS" />
          </div>
          <div className="form-group">
            <label>Fecha y hora:</label>
            <div className="date-time-inputs">
              <input type="date" />
              <input type="time" />
            </div>
          </div>
          <div className="form-group">
            <label>Fecha de envío:</label>
            <div className="date-time-inputs">
              <input value = {referencia.fecha_envio} onChange={handleReferenciaChange} type="date" name='fecha_envio'/>
              <input type="time" />
            </div>
          </div>
        </div>
      </ExpandableSection>

      {/* Desplegable C2 */}
      <ExpandableSection title="IDENTIFICACIÓN DEL PACIENTE (C2)">
        <div className="grid-container">
          <div className="form-group">
            <label>Nombres:</label>
            <input value = {paciente.nombres} onChange={handlePacienteChange} type="text" name="nombres"  placeholder="Ingrese los nombres" />
          </div>
          <div className="form-group">
            <label>Apellido Paterno:</label>
            <input value = {paciente.primer_apellido} onChange={handlePacienteChange} type="text" name="primer_apellido"  placeholder="Ingrese el apellido paterno" />
          </div>
          <div className="form-group">
            <label>Apellido Materno:</label>
            <input value = {paciente.segundo_apellido} onChange={handlePacienteChange} type="text" name='segundo_apellido' placeholder="Ingrese el apellido materno" />
          </div>
          <div className="form-group">
            <label>Domicilio:</label>
            <input value = {paciente.domicilio} onChange={handlePacienteChange} type="text" name='domicilio' placeholder="Ingrese el domicilio" />
          </div>
          <div className="form-group">
            <label>CI:</label>
            <input value = {paciente.ci} onChange={handlePacienteChange} type="text" name='ci' placeholder="Ingrese el CI" />
          </div>
          <div className="form-group">
            <label>Tel/Cel:</label>
            <input value = {paciente.telefono} onChange={handlePacienteChange} type="tel" name='telefono' placeholder="Ingrese el teléfono o celular" />
          </div>
          <div className="form-group">
            <label>Procedencia:</label>
            <input value = {paciente.procedencia} onChange={handlePacienteChange} type="text" name='procedencia' placeholder="Ingrese la procedencia" />
          </div>
          <div className="form-group">
            <label>Nº de Historia Clínica:</label>
            <input value = {paciente.historia_clinica} onChange={handlePacienteChange} type="text" name='historia_clinica' placeholder="Ingrese el número de historia clínica" />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento:</label>
            <input value = {paciente.fecha_nacimiento} onChange={handlePacienteChange} type="date" name='fecha_nacimiento'/>
          </div>
          <div className="form-group">
            <label>Edad:</label>
            <input type="number" placeholder="Ingrese la edad" />
          </div>
          <div className="form-group">
            <label>Tipo Discapacidad:</label>
            <select value = {paciente.tipo_discapacidad} 
            onChange={handlePacienteChange}
            name='tipo_discapacidad'>
              <option value="">Seleccione una opción</option>
              <option value="Discapacidad 1">Discapacidad 1</option>
              <option value="Discapacidad 2">Discapacidad 2</option>
              <option value="Discapacidad 3">Discapacidad 3</option>
              {/* Agregar opciones adicionales aquí */}
            </select>
          </div>
          <div className="form-group">
  <label>Sexo:</label>
  <div className="radio-group">
    <label>
      <input type="radio" name="sexo" value="M" checked={paciente.sexo === 'M'} onChange={handlePacienteChange}/> M
    </label>
    <label>
      <input type="radio" name="sexo" value="F" checked={paciente.sexo === 'F'} onChange={handlePacienteChange}/> F
    </label>
  </div>
</div>

<div className="form-group">
  <label>Persona con Discapacidad:</label>
  <div className="radio-group">
    <label>
      <input type="radio" name="discapacidad" value="si" checked={paciente.discapacidad === 'si'} onChange={handlePacienteChange}/> Sí
    </label>
    <label>
      <input type="radio" name="discapacidad" value="no" checked={paciente.discapacidad === 'no'} onChange={handlePacienteChange} /> No
    </label>
  </div>
</div>
          <div className="form-group">
            <label>Nombre del Acompañante:</label>
            <input type="text" placeholder="Ingrese el nombre del acompañante" />
          </div>
          <div className="form-group">
            <label>CI:</label>
            <input type="text" placeholder="Ingrese el CI del acompañante" />
          </div>
          <div className="form-group">
            <label>Parentesco:</label>
            <input type="text" placeholder="Ingrese el parentesco" />
          </div>
          <div className="form-group">
            <label>Tel/Cel del Acompañante:</label>
            <input type="tel" placeholder="Ingrese el teléfono o celular del acompañante" />
          </div>
          <div className="form-group">
            <label>Grado de Discapacidad:</label>
            <select value = {paciente.grado_discapacidad} onChange={handlePacienteChange} name='grado_discapacidad'>
              <option value="">Seleccione una opción</option>
              <option value="grado1">grado 1</option>
              <option value="grado2">grado 2</option>
              {/* Agregar opciones adicionales aquí */}
            </select>
          </div>
        </div>
      </ExpandableSection>
      {/* Desplegable C3 */}
      <ExpandableSection title="DATOS CLÍNICOS Y SIGNOS VITALES (C3)">
          <div className="grid-container">
            <div className="form-group">
              <label>F.C:</label>
              <input type="text" placeholder="Ingrese F.C" />
            </div>
            <div className="form-group">
              <label>F.R:</label>
              <input type="text" placeholder="Ingrese F.R" />
            </div>
            <div className="form-group">
              <label>P.A:</label>
              <input type="text" placeholder="Ingrese P.A" />
            </div>
            <div className="form-group">
              <label>mmHg:</label>
              <input type="text" placeholder="Ingrese mmHg" />
            </div>
            <div className="form-group">
              <label>T*:</label>
              <input type="text" placeholder="Ingrese T*" />
            </div>
            <div className="form-group">
              <label>Peso:</label>
              <input type="text" placeholder="Ingrese Peso" />
            </div>
            <div className="form-group">
              <label>Talla:</label>
              <input type="text" placeholder="Ingrese Talla" />
            </div>
            <div className="form-group">
              <label>GLASGOW:</label>
              <select>
                <option>Seleccione una opción</option>
                {/* Opciones adicionales */}
              </select>
            </div>
            <div className="form-group">
              <label>SPO2:</label>
              <input type="text" placeholder="Ingrese SPO2" />
            </div>
            <div className="form-group">
              <label>%:</label>
              <input type="text" placeholder="Ingrese %" />
            </div>
            <div className="form-group">
              <label>IMC:</label>
              <input type="text" placeholder="Ingrese IMC" />
            </div>
            {/* Campos adicionales para los Antecedentes Gineco Obstétricos */}
            <div className="form-group">
              <label>Antecedentes Gineco Obstétricos:</label>
              <input type="checkbox" />
            </div>
            <div className="form-group">
              <label>F.U.M:</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>G.P.A.C:</label>
              <input type="text" placeholder="Ingrese G.P.A.C" />
            </div>
            <div className="form-group">
              <label>F.P.P:</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>RPM horas:</label>
              <input type="text" placeholder="Ingrese RPM horas" />
            </div>
            <div className="form-group">
              <label>FCF:</label>
              <input type="text" placeholder="Ingrese FCF" />
            </div>
            <div className="form-group">
  <label>Maduracion Pulmonar:</label>
  <div className="radio-group">
    <label>
      <input type="radio" name="discapacidad" value="si" /> Sí
    </label>
    <label>
      <input type="radio" name="discapacidad" value="no" /> No
    </label>
  </div>
</div>
            {/* Campos restantes de C3 */}
          </div>
        </ExpandableSection>

         {/* Desplegable C4 */}
         <ExpandableSection title="RESUMEN ANAMNESIS Y EXAMEN FÍSICO (C4)">
          <div className="grid-container">
          <div className="form-group">
  <label>Estuvo Internado?</label>
  <div className="radio-group">
    <label>
      <input type="radio" name="discapacidad" value="si" /> Sí
    </label>
    <label>
      <input type="radio" name="discapacidad" value="no" /> No
    </label>
  </div>
</div>
            <div className="form-group">
              <label>Días de Internación:</label>
              <input type="number" placeholder="Ingrese días de internación" />
            </div>
            <div className="form-group">
              <label>Hallazgos clínicos:</label>
              <textarea placeholder="Ingrese hallazgos clínicos" rows={3}></textarea>
            </div>
          </div>
        </ExpandableSection>

        {/* Desplegable C5 */}
        <ExpandableSection title="REALIZO EXAMENES COMPLEMENTARIOS DE DIAGNOSTICO (C5)">
          <div className="grid-container">
            
            <div className="form-group">
  <label>Realizó Exámenes Complementarios de Diagnóstico:</label>
  <div className="radio-group">
    <label>
      <input type="radio" name="discapacidad" value="si" /> Sí
    </label>
    <label>
      <input type="radio" name="discapacidad" value="no" /> No
    </label>
  </div>
</div>
            <div className="form-group">
              <label>Hallazgos Llamativos:</label>
              <input type="text" placeholder="Ingrese hallazgos llamativos" />
            </div>
            <div className="form-group">
              <label>RX:</label>
              <input type="checkbox" />
            </div>
            <div className="form-group">
              <label>Laboratorio:</label>
              <input type="checkbox" />
            </div>
            <div className="form-group">
              <label>Ecografía:</label>
              <input type="checkbox" />
            </div>
            <div className="form-group">
              <label>Tomografía:</label>
              <input type="checkbox" />
            </div>
            <div className="form-group">
              <label>Otros, Especifique:</label>
              <input type="text" placeholder="Ingrese otros exámenes" />
            </div>
            <div className="form-group full-width">
              <label>Subir una imagen:</label>
              <div className="file-upload">
                <button className="upload-button">Adjuntar</button>
                <p>Es necesario adjuntar una imagen para poder revisar los resultados de los exámenes del paciente.</p>
              </div>
            </div>
          </div>
        </ExpandableSection>

         {/* Desplegable C6 */}
         <ExpandableSection title="DIAGNOSTICOS PRESUNTIVOS (C6)">
          <div className="grid-container">
            <div className="form-group">
              <label>CIE - 10</label>
              <div className="search-container">
                <input type="text" placeholder="Búsqueda de Patología" />
                <button className="search-button">🔍</button>
              </div>
            </div>
            <div className="form-group">
              <label>CIE - 10</label>
              <div className="search-container">
                <input type="text" placeholder="Búsqueda de Patología" />
                <button className="search-button">🔍</button>
              </div>
            </div>
            <div className="form-group">
              <label>CIE - 10</label>
              <div className="search-container">
                <input type="text" placeholder="Búsqueda de Patología" />
                <button className="search-button">🔍</button>
              </div>
            </div>
          </div>
        </ExpandableSection>

        {/* Desplegable C7 */}
        <ExpandableSection title="TRATAMIENTO (C7)">
          <div className="grid-container">
            <div className="form-group full-width">
              <label>Tratamiento:</label>
              <textarea placeholder="Ingrese el tratamiento" rows={3}></textarea>
            </div>
          </div>
        </ExpandableSection>

        {/* Desplegable C8 */}
        <ExpandableSection title="OBSERVACIONES (C8)">
          <div className="grid-container">
            <div className="form-group full-width">
              <label>Observaciones:</label>
              <textarea placeholder="Ingrese observaciones" rows={3}></textarea>
            </div>
          </div>
        </ExpandableSection>

{/* Desplegable C9 */}
<ExpandableSection title="CONSENTIMIENTO INFORMADO PARA EL TRASLADO (C9)">
  <div className="contract-container">
    <p>
      Yo, <input type="text" placeholder="Nombre" /> de <input type="text" placeholder="Edad" /> años de edad, con carnet
      <input type="text" placeholder="C.I" />.
    </p>
    <p>En calidad de:</p>
    <div className="form-group-inline">
      <select>
        <option>Seleccione una opción</option>
        {/* Opciones adicionales aquí */}
      </select>
    </div>
    <p>
      Habiéndome informado sobre el cuadro clínico, autorizo al médico tratante y personal de salud del establecimiento, realizar la referencia,
      teniendo en cuenta que he sido informado claramente sobre los riesgos, el traslado y posibles tratamientos, procedimientos durante el traslado o internación:
      <input type="text" placeholder="Firma del paciente o representante" />
      y beneficios que se puedan presentar.
    </p>
  </div>
</ExpandableSection>

         {/* Desplegable C10 */}
         <ExpandableSection title="NOMBRE Y CARGO DE QUIEN ENVIA AL PACIENTE O RESPONSABLE DEL ESTABLECIMIENTO DE SALUD QUE REQUIERE (C10)">
          <div className="grid-container">
            <div className="form-group">
              <label>Nombre:</label>
              <input value = {referencia.nombre_contacto_receptor} onChange ={handleReferenciaChange} type="text" name='nombre_contacto_receptor' placeholder="Ingrese el nombre" />
            </div>
            <div className="form-group">
              <label>Cargo:</label>
              <input type="text" placeholder="Ingrese el cargo" />
            </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input type="tel" placeholder="Ingrese el teléfono" />
            </div>
            <div className="form-group full-width">
              <label>Nombre del personal de salud que acompaña:</label>
              <input type="text" placeholder="Ingrese el nombre del personal que acompaña" />
            </div>
          </div>
        </ExpandableSection>

         {/* Desplegable C11 */}
    <ExpandableSection title="MOTIVO DE REFERENCIA (C11) SOLO MARQUE UNO">
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="motivo_referencia"
            value="urgencia"
            checked={referencia.motivo_referencia === 'urgencia'}
            onChange={handleReferenciaChange}
          />
          Urgencia
        </label>
        <label>
          <input
            type="radio"
            name="motivo_referencia"
            value="emergencia"
            checked={referencia.motivo_referencia === 'emergencia'}
            onChange={handleReferenciaChange}
          />
          Emergencia
        </label>
        <label>
          <input
            type="radio"
            name="motivo_referencia"
            value="consultaExterna"
            checked={referencia.motivo_referencia === 'consultaExterna'}
            onChange={handleReferenciaChange}
          />
          Consulta Externa
        </label>
        <label>
          <input
            type="radio"
            name="motivo_referencia"
            value="servicioEspecialidad"
            checked={referencia.motivo_referencia === 'servicioEspecialidad'}
            onChange={handleReferenciaChange}
          />
          Servicio/Especialidad
        </label>
        <label>
          <input
            type="radio"
            name="motivo_referencia"
            value="porTelesalud"
            checked={referencia.motivo_referencia === 'porTelesalud'}
            onChange={handleReferenciaChange}
          />
          Por Telesalud
        </label>
      </div>
    </ExpandableSection>

        
        {/* Desplegable C12 */}
        {hasPermission(allowedRolesC12) && (
        <ExpandableSection title="ESTABLECIMIENTO DE SALUD RECEPTOR (C12)">
          <div className="grid-container">
            <div className="form-group">
              <label>Nombre del establecimiento:</label>
              <input type="text" placeholder="Ingrese el nombre del establecimiento" />
            </div>
            <div className="form-group">
              <label>Nivel:</label>
              <select>
                <option>Seleccione un nivel</option>
                {/* Opciones adicionales */}
              </select>
            </div>
            <div className="form-group">
              <label>Subsector:</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="subsector" value="publico" /> Público
                </label>
                <label>
                  <input type="radio" name="subsector" value="seguridadSocial" /> Seguridad Social
                </label>
                <label>
                  <input type="radio" name="subsector" value="privado" /> Privado
                </label>
                <label>
                  <input type="radio" name="subsector" value="otro" /> Otro:
                </label>
                <input type="text" placeholder="Especifique" />
              </div>
            </div>
            <div className="form-group">
              <label>Nombre de la persona contactada:</label>
              <input type="text" placeholder="Ingrese el nombre de la persona" />
            </div>
            <div className="form-group">
              <label>Medio de comunicación:</label>
              <input
                value={referencia.medio_comunicacion}
                onChange={handleReferenciaChange}
                type="text"
                name="medio_comunicacion"
                placeholder="Ingrese el medio de comunicación"
              />
            </div>
            <div className="form-group">
              <label>Nombre de quien recibe al paciente:</label>
              <input type="text" placeholder="Nombre del receptor" />
            </div>
            <div className="form-group">
              <label>Fecha y hora de recepción:</label>
              <input
                value={referencia.fecha_recepcion ?? ''}
                onChange={handleReferenciaChange}
                type="date"
                name="fecha_recepcion"
              />
              <input
                value={referencia.hora_recepcion ?? ''}
                onChange={handleReferenciaChange}
                type="time"
                name="hora_recepcion"
              />
            </div>
            <div className="form-group">
              <label>Hora de llegada:</label>
              <input type="time" />
            </div>
            <div className="form-group full-width">
              <label>
                Médico responsable del establecimiento de salud receptor que evalúa los criterios de calidad A.I.O.:
              </label>
              <input type="text" placeholder="Nombre del médico responsable" />
            </div>
            <div className="form-group">
              <label>Paciente Admitido:</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="pacienteAdmitido" value="si" /> Sí
                </label>
                <label>
                  <input type="radio" name="pacienteAdmitido" value="no" /> No
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Motivo:</label>
              <input type="text" placeholder="Ingrese el motivo" />
            </div>
          </div>
        </ExpandableSection>
      )}

      {/* Botones de acción */}
      <div className="form-buttons">
        <button onClick={handleSave} className="btn-save">
          Guardar Cambios
        </button>
        <button onClick={() => navigate('/referencia')} className="btn-cancel">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ReferenciaEdit;
