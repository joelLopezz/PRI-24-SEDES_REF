// src/FormularioReferencias.tsx
import React, { useState, useEffect } from 'react';
import ExpandableSection from '../../Components/ExpandableSection';
import './Styles/App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FormularioReferencias: React.FC = () => {
  const [paciente, setPaciente] = useState({
    nombres: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    ci: '',
    domicilio: '',
    telefono: '',
    historia_clinica: '',
    procedencia: '',
    sexo: '',
    discapacidad: '',
    tipo_discapacidad: '',
    grado_discapacidad: '',
  });

  const [referencia, setReferencia] = useState({
    fecha_ingreso: '',
    fecha_envio: '2024-11-10',
    motivo_referencia: '',
    nombre_contacto_receptor: '',
    cargo: '',
    telefono: '',
    medio_comunicacion: '',
    fecha_recepcion: null,
    hora_recepcion: null,
    establecimiento_salud_receptor: '',
    establecimiento_salud_referente: '',
    estado_aprobacion: 1,
  });

  const [establecimientos, setEstablecimientos] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [referenteDetails, setReferenteDetails] = useState({
    nivel: '',
    red: '',
    municipio: '',
    telefono: '',
  });
  const [receptorDetails, setReceptorDetails] = useState({
    nivel: '',
  });
  
  const [doctores, setDoctores] = useState<{ id: number; nombreCompleto: string }[]>([]);


  const { hasPermission } = useAuth();
  const navigate = useNavigate();

  // Cargar datos de establecimientos
  useEffect(() => {
    const fetchEstablecimientos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/establecimiento/nombres`);
        setEstablecimientos(response.data);
      } catch (error) {
        console.error('Error al obtener los establecimientos:', error);
      }
    };

    fetchEstablecimientos();
  }, []);

  // Manejar cambios en los selects
  const handleEstablecimientoChange = async (
    field: 'establecimiento_salud_referente' | 'establecimiento_salud_receptor',
    id: string
  ) => {
    setReferencia((prev) => ({
      ...prev,
      [field]: id, // Guardar el ID del establecimiento seleccionado
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
      } else if (field === 'establecimiento_salud_receptor') {
        setReceptorDetails({
          nivel: data.nivel || '',
        });
  
        // Fetch doctores del establecimiento receptor
        console.log('Fetching doctores for establecimiento receptor:', id);
        const doctoresResponse = await axios.get(
          `${API_BASE_URL}/personal-salud?establecimientoId=${id}`
        );
  
        if (doctoresResponse.data?.data && doctoresResponse.data.data.length > 0) {
          console.log('Doctores encontrados:', doctoresResponse.data.data);
  
          // Filtrar los doctores del establecimiento
          const doctoresData = doctoresResponse.data.data
            .filter((personal: any) => personal.cargo.toLowerCase() === 'doctor') // Filtrar por cargo "Doctor"
            .map((doctor: { personal_ID: number; nombres: string; primer_apellido: string }) => ({
              id: doctor.personal_ID,
              nombreCompleto: `${doctor.nombres} ${doctor.primer_apellido}`,
            }));
  
          setDoctores(doctoresData);
        } else {
          console.warn('No se encontraron doctores para el establecimiento:', id);
          setDoctores([]);
        }
      }
    } catch (error) {
      console.error('Error al cargar los detalles del establecimiento o doctores:', error);
      setDoctores([]); // Limpiar la lista de doctores en caso de error
    }
  };
  
  
  

  // Maneja los cambios en los inputs del formulario de referencia
  const handleReferenciaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReferencia((prev) => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));
  };

  // Maneja los cambios en los inputs del formulario de paciente
  const handlePacienteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaciente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Obtener los datos del usuario logueado y usar su ID para obtener los datos del personal de salud
  const fetchUserData = async () => {
    try {
      const authResponse = await axios.get(`${API_BASE_URL}/auth/me`);
      const authData = authResponse.data.data;

      // Usar el usuarioID para obtener los datos del personal de salud relacionado
      const personalResponse = await axios.get(`${API_BASE_URL}/personal-salud/${authData.usuarioID}`);
      const personalData = personalResponse.data.data;

      // Actualizar los campos del formulario C10 con los datos recuperados
      setReferencia((prevReferencia) => ({
        ...prevReferencia,
        nombre_contacto_receptor: `${personalData.nombres} ${personalData.primer_apellido}`,
        telefono: personalData.telefono?.toString() || '',
        cargo: authData.rol,
      }));

      // Cargar el establecimiento relacionado al usuario logueado
      if (personalData.establecimiento_salud_idestablecimiento_ID) {
        const establecimientoId = personalData.establecimiento_salud_idestablecimiento_ID.toString();
        setReferencia((prevReferencia) => ({
          ...prevReferencia,
          establecimiento_salud_referente: establecimientoId,
        }));

        // Autocompletar los detalles del establecimiento
        await handleEstablecimientoChange('establecimiento_salud_referente', establecimientoId);
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario o personal de salud:', error);
      alert('No se pudieron cargar los datos del usuario o del personal de salud.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  // Enviar el formulario
  const handleSubmit = async () => {
    try {
      // Verificar si los datos de C12 están completos
      const isC12Complete =
        referencia.fecha_recepcion || referencia.hora_recepcion || referencia.medio_comunicacion;
  
      // Construir el objeto referencia asegurando valores válidos
      const referenciaData = {
        ...referencia,
        establecimiento_salud_referente: referencia.establecimiento_salud_referente || null, // Validar valor de C1
        establecimiento_salud_receptor: isC12Complete
          ? referencia.establecimiento_salud_receptor || null // Validar valor de C12 si C12 está completo
          : null,
        estado: isC12Complete ? 2 : 1, // Estado según la lógica de C12
      };
  
      // Construir el DTO del registro
      const registroDto = {
        paciente,
        referencia: referenciaData,
      };
  
      // Enviar la solicitud
      await axios.post(`${API_BASE_URL}/registro`, registroDto);
      alert('Registro creado exitosamente');
    } catch (error) {
      console.error('Error al crear el registro:', error);
      alert('Error al crear el registro');
    }
  };

  const handleClear = () => {
    setPaciente({
      nombres: '',
      primer_apellido: '',
      segundo_apellido: '',
      fecha_nacimiento: '',
      ci: '',
      domicilio: '',
      telefono: '',
      historia_clinica: '',
      procedencia: '',
      sexo: '',
      discapacidad: '',
      tipo_discapacidad: '',
      grado_discapacidad: '',
    });

    setReferencia({
      fecha_ingreso: '',
      fecha_envio: '',
      motivo_referencia: '',
      nombre_contacto_receptor: '',
      cargo: '',
      telefono: '',
      medio_comunicacion: '',
      fecha_recepcion: null,
      hora_recepcion: null,
      establecimiento_salud_receptor: '',
      establecimiento_salud_referente: '',
      estado_aprobacion: 1,
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const allowedRolesC12 = ['Admin Sedes', 'Admin Hospital'];
  
  return (
    <div className="formulario-referencias">
      <h2 className="titulo-formulario">Formulario Referencias</h2>
      
      {/* Desplegable C1 */}
      <ExpandableSection title="DATOS DEL ESTABLECIMIENTO DE SALUD REFERENTE (C1)">
      <div className="grid-container">
      <div className="grid-container">
          <div className="form-group">
            <label>Nombre del establecimiento:</label>
            <select value={referencia.establecimiento_salud_referente}disabled
            style={{ width: '100%' }}>
              <option>
                {
                  establecimientos.find(
                    (e) => e.id.toString() === referencia.establecimiento_salud_referente
                  )?.nombre || 'Cargando...'
                }
              </option>
            </select>
          </div>
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
              <option value="grado2">grado 3</option>
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

         {/* Desplegable C10 */}
         <ExpandableSection title="NOMBRE Y CARGO DE QUIEN ENVIA AL PACIENTE O RESPONSABLE DEL ESTABLECIMIENTO DE SALUD QUE REQUIERE (C10)">
          <div className="grid-container">
            <div className="form-group">
              <label>Nombre:</label>
              <input value = {referencia.nombre_contacto_receptor} onChange ={handleReferenciaChange} type="text" name='nombre_contacto_receptor' placeholder="Ingrese el nombre" />
            </div>
            <div className="form-group">
            <label>Cargo:</label>
            <input
              value={referencia.cargo}
              type="text"
              name="cargo"
              placeholder="Ingrese el cargo"
              readOnly // Evita que el usuario edite el cargo
            />
          </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input
            type="text"
            name="telefono"
            value={referencia.telefono}
            onChange={handleReferenciaChange}
            placeholder="Teléfono del contacto"
          />
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
  <label>Doctor Receptor:</label>
  <select
    value={referencia.medio_comunicacion || ''}
    onChange={(e) =>
      setReferencia((prev) => ({ ...prev, medio_comunicacion: e.target.value }))
    }
  >
    <option value="">Seleccione un doctor</option>
    {doctores.length === 0 && (
      <option value="" disabled>No hay doctores disponibles</option>
    )}
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

      <div className="form-buttons">
      <button className="btn-save" onClick={handleSubmit}>Guardar</button>
      <button className="btn-clear" onClick={handleClear}>Limpiar</button>
      <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default FormularioReferencias;   