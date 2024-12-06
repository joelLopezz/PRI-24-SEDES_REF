import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExpandableSection from '../../Components/ExpandableSection';
import axios from 'axios';
import './Styles/App.css';
import { useAuth } from '../../Context/AuthContext';

type Referencia = {
  fecha_ingreso: string;
  fecha_envio: string;
  motivo_referencia: string;
  nombre_contacto_receptor: string;
  medio_comunicacion: string;
  fecha_recepcion: string | null;
  hora_recepcion: string | null;
  establecimiento_salud_referente: string;
  establecimiento_salud_receptor: string;
  cargo?: string;
  telefono?: string;
};

type Paciente = {
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_nacimiento: string;
  ci: string;
  domicilio: string;
  telefono: string;
  procedencia: string;
  historia_clinica: string;
  sexo: string;
  discapacidad: string;
  tipo_discapacidad: string;
  grado_discapacidad: string;
};

type EstablecimientoDetails = {
  nivel: string;
  red?: string;
  municipio?: string;
  telefono?: string;
};

type Establecimiento = {
  id: number;
  nombre: string;
};

type Doctor = {
  id: number;
  nombreCompleto: string;
};


const ReferenciaEdit: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [referencia, setReferencia] = useState<Referencia>({
    fecha_ingreso: '',
    fecha_envio: '',
    motivo_referencia: '',
    nombre_contacto_receptor: '',
    medio_comunicacion: '',
    fecha_recepcion: null,
    hora_recepcion: null,
    establecimiento_salud_referente: '',
    establecimiento_salud_receptor: '',
  });

  const [paciente, setPaciente] = useState<Paciente>({
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
    discapacidad: '',
    tipo_discapacidad: '',
    grado_discapacidad: '',
  });

  const [referenteDetails, setReferenteDetails] = useState<EstablecimientoDetails>({
    
    nivel: '',
    red: '',
    municipio: '',
    telefono: '',
  });

  const [receptorDetails, setReceptorDetails] = useState<EstablecimientoDetails>({
    nivel: '',
  });

  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [doctores, setDoctores] = useState<Doctor[]>([]);
  const [isC12Editable, setIsC12Editable] = useState(false);
  const [referenteNombre, setReferenteNombre] = useState<string>('');
  const [receptorNombre, setReceptorNombre] = useState<string>('');

  useEffect(() => {
    // Cargar datos iniciales para el formulario de edición
    const fetchReferencia = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/referencias/${id}`);
        const data = response.data;
  
        // Setear datos de referencia
        setReferencia({
          fecha_ingreso: data.fecha_ingreso || '',
          fecha_envio: data.fecha_envio || '',
          motivo_referencia: data.motivo_referencia || '',
          nombre_contacto_receptor: data.nombre_contacto_receptor || '',
          medio_comunicacion: data.medio_comunicacion || '',
          fecha_recepcion: data.fecha_recepcion || null,
          hora_recepcion: data.hora_recepcion || null,
          establecimiento_salud_referente: data.establecimiento_salud_referente || '',
          establecimiento_salud_receptor: data.establecimiento_salud_receptor || '',
        });
  
        // Setear datos del paciente
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
  
        // Cargar detalles del establecimiento referente (C1)
        if (data.establecimiento_salud_referente) {
          const responseReferente = await axios.get(
            `${API_BASE_URL}/establecimiento/${data.establecimiento_salud_referente}`
          );
          setReferenteNombre(responseReferente.data.nombre || 'Desconocido');
          await handleEstablecimientoChange(
            'establecimiento_salud_referente',
            data.establecimiento_salud_referente
          );
        }
  
        // Controlar el estado de C12 y cargar detalles del establecimiento receptor
        if (data.establecimiento_salud_receptor) {
          const responseReceptor = await axios.get(
            `${API_BASE_URL}/establecimiento/${data.establecimiento_salud_receptor}`
          );
          setReceptorNombre(responseReceptor.data.nombre || 'Desconocido');
          await handleEstablecimientoChange(
            'establecimiento_salud_receptor',
            data.establecimiento_salud_receptor
          );
  
          // Si los datos de C12 están completos, bloquear el campo C12
          if (data.fecha_recepcion && data.hora_recepcion && data.medio_comunicacion) {
            setIsC12Editable(false);
          } else {
            // Permitir la edición si faltan datos en C12
            setIsC12Editable(true);
          }
        } else {
          // Si no hay datos en establecimiento_salud_receptor, hacer C12 editable
          setIsC12Editable(true);
        }
  
        // Cargar datos del campo C10 (Nombre, Cargo, Teléfono)
        if (data.nombre_contacto_receptor) {
          try {
            const encodedName = encodeURIComponent(data.nombre_contacto_receptor.trim());
            const responseC10 = await axios.get(
              `${API_BASE_URL}/personal-salud/buscar-por-nombre/${encodedName}`
            );
            const personalData = responseC10.data.data;
            setReferencia((prev) => ({
              ...prev,
              cargo: personalData.cargo || '',
              telefono: personalData.telefono || '',
            }));
          } catch (error) {
            console.error('Error fetching C10 data:', error);
            alert(
              `No se encontraron datos para el nombre proporcionado: ${data.nombre_contacto_receptor}`
            );
          }
        }
        // Cargar lista de doctores para el establecimiento receptor
      if (data.establecimiento_salud_receptor) {
        const doctoresResponse = await axios.get(
          `${API_BASE_URL}/personal-salud?establecimientoId=${data.establecimiento_salud_receptor}`
        );
        if (doctoresResponse.data?.data) {
          setDoctores(
            doctoresResponse.data.data.map((doctor: any) => ({
              id: doctor.personal_ID,
              nombreCompleto: `${doctor.nombres} ${doctor.primer_apellido}`,
            }))
          );
        }
      }
      } catch (error) {
        console.error('Error cargando la referencia:', error);
        alert('Error cargando la referencia.');
      }
    };
  
    fetchReferencia();
  }, [id]);

  useEffect(() => {
    const fetchEstablecimientos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/establecimiento/nombres`);
        setEstablecimientos(response.data); // Cargar los establecimientos
      } catch (error) {
        console.error('Error al cargar los establecimientos:', error);
      }
    };
  
    fetchEstablecimientos();
  }, []);

  // Manejo de cambios en inputs
  const handleReferenciaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setReferencia((prev) => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));
  };

  const handlePacienteChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPaciente((prev: Paciente) => ({
      ...prev,
      [name]: value,
    }));
  };

 // Actualización del handleEstablecimientoChange
const handleEstablecimientoChange = async (
  field: 'establecimiento_salud_referente' | 'establecimiento_salud_receptor',
  id: string
) => {
  setReferencia((prev) => ({
    ...prev,
    [field]: id,
  }));

  try {
    const response = await axios.get(`${API_BASE_URL}/establecimiento/${id}`);
    const data = response.data;

    if (field === 'establecimiento_salud_referente') {
      setReferenteDetails({
        nivel: data.nivel || '',
        red: data.redCordinacion?.nombre || '',
        municipio: data.municipio?.nombre || '',
        telefono: data.telefono || '',
      });
      setReferenteNombre(data.nombre || 'Desconocido');
    } else if (field === 'establecimiento_salud_receptor') {
      setReceptorDetails({
        nivel: data.nivel || '',
      });
      setReceptorNombre(data.nombre || 'Desconocido');

      const doctoresResponse = await axios.get(
        `${API_BASE_URL}/personal-salud?establecimientoId=${id}`
      );
      if (doctoresResponse.data?.data) {
        setDoctores(
          doctoresResponse.data.data.map((doctor: any) => ({
            id: doctor.personal_ID,
            nombreCompleto: `${doctor.nombres} ${doctor.primer_apellido}`,
          }))
        );
      }
    }

  } catch (error) {
    console.error('Error cargando datos del establecimiento:', error);
  }
};

  // Guardar los cambios
  const handleSave = async () => {
    try {
      const isC12Complete =
        referencia.fecha_recepcion || referencia.hora_recepcion || referencia.medio_comunicacion;

      const updateRegistroDto = {
        paciente,
        referencia: {
          ...referencia,
          estado: isC12Complete ? 2 : 1,
        },
      };


    
      await axios.patch(`${API_BASE_URL}/registro/${id}`, updateRegistroDto);
      alert('Referencia actualizada exitosamente.');
      navigate('/referencia');
    } catch (error) {
      console.error('Error guardando los cambios:', error);
      alert('Error guardando los cambios.');
    }
  };
  
  return (
    <div className="formulario-referencias">
      <h2 className="titulo-formulario">Editar Referencia</h2>
      {/* Campo C1 */}
      <ExpandableSection title="DATOS DEL ESTABLECIMIENTO DE SALUD REFERENTE (C1)">
        <div className="grid-container">
        <div className="form-group">
            <label>Nombre del establecimiento:</label>
            <input type="text" value={referenteNombre} readOnly />
          </div>


          <div className="form-group">
            <label>Nivel del EESS:</label>
            <input type="text" value={referenteDetails.nivel} readOnly />
          </div>
          <div className="form-group">
            <label>Red de Salud:</label>
            <input type="text" value={referenteDetails.red} readOnly />
          </div>
          <div className="form-group">
            <label>Municipio:</label>
            <input type="text" value={referenteDetails.municipio} readOnly />
          </div>
          <div className="form-group">
            <label>Tel/Cel del EESS:</label>
            <input type="tel" value={referenteDetails.telefono} readOnly />
          </div>
          <div className="form-group">
            <label>Fecha de envío:</label>
            <div className="date-time-inputs">
              <input value = {referencia.fecha_ingreso} onChange={handleReferenciaChange} type="date" name='fecha_ingreso'/>
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
            <label>Tipo Discapacidad:</label>
            <select value = {paciente.tipo_discapacidad} 
            onChange={handlePacienteChange}
            name='tipo_discapacidad'>
              <option value="">Seleccione una opción</option>
              <option value="Discapacidad 1">Discapacidad Visual</option>
              <option value="Discapacidad 2">Discapacidad Auditiva</option>
              <option value="Discapacidad 3">Discapacidad Motora</option>
              {/* Agregar opciones adicionales aquí */}
            </select>
          </div>
          <div className="form-group">
            <label>Grado de Discapacidad:</label>
            <select value = {paciente.grado_discapacidad} onChange={handlePacienteChange} name='grado_discapacidad'>
              <option value="">Seleccione una opción</option>
              <option value="grado1">grado 1</option>
              <option value="grado2">grado 2</option>
              <option value="grado3">grado 3</option>
              {/* Agregar opciones adicionales aquí */}
            </select>
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

      {/* Campo C10 */}
      <ExpandableSection title="NOMBRE Y CARGO DE QUIEN ENVIA AL PACIENTE (C10)">
        <div className="grid-container">
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" value={referencia.nombre_contacto_receptor} readOnly />
          </div>
          <div className="form-group">
            <label>Cargo:</label>
            <input type="text" value={referencia.cargo} readOnly />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input type="text" value={referencia.telefono} readOnly />
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
      {/* Campo C12 */}
      
      <ExpandableSection title="DATOS DEL ESTABLECIMIENTO RECEPTOR (C12)">
        <div className="grid-container">
          {isC12Editable ? (
            <>
              {/* Funcionalidad como en FormularioReferencia */}
              <div className="form-group">
                <label>Nombre del establecimiento:</label>
                <select
                  value={referencia.establecimiento_salud_receptor}
                  onChange={(e) =>
                    handleEstablecimientoChange('establecimiento_salud_receptor', e.target.value)
                  }
                >
                  <option value="">Seleccione un establecimiento</option>
                  {establecimientos.map((establecimiento) => (
                    <option key={establecimiento.id} value={establecimiento.id}>
                      {establecimiento.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Nivel:</label>
                <input type="text" value={receptorDetails.nivel} readOnly />
              </div>
              <div className="form-group">
                <label>Doctor Receptor:</label>
                <select
                  value={referencia.medio_comunicacion || ''}
                  onChange={(e) =>
                    setReferencia((prev) => ({ ...prev, medio_comunicacion: e.target.value }))
                  }
                >
                  <option value="">Seleccione un doctor</option>
                  {doctores.map((doctor) => (
                    <option key={doctor.id} value={doctor.nombreCompleto}>
                      {doctor.nombreCompleto}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Fecha y hora de recepción:</label>
                <input
                  type="date"
                  name="fecha_recepcion"
                  value={referencia.fecha_recepcion || ''}
                  onChange={handleReferenciaChange}
                />
                <input
                  type="time"
                  name="hora_recepcion"
                  value={referencia.hora_recepcion || ''}
                  onChange={handleReferenciaChange}
                />
              </div>
            </>
          ) : (
            <>
              {/* Mostrar datos ya guardados */}
              <div className="form-group">
            <label>Nombre del establecimiento:</label>
            <input type="text" value={receptorNombre} readOnly />
          </div>
              <div className="form-group">
                <label>Nivel:</label>
                <input type="text" value={receptorDetails.nivel} readOnly />
              </div>
              <div className="form-group">
                <label>Doctor Receptor:</label>
                <input type="text" value={referencia.medio_comunicacion} readOnly />
              </div>
              <div className="form-group">
                <label>Fecha y hora de recepción:</label>
                <input type="text" value={referencia.fecha_recepcion || ''} readOnly />
                <input type="text" value={referencia.hora_recepcion || ''} readOnly />
              </div>
            </>
          )}
        </div>
      </ExpandableSection>
      
      

      {/* Botones */}
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
