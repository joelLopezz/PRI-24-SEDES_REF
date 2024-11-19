import React, { useState, useEffect } from 'react';
import styles from './Style.module.css';



const ShiftTable: React.FC = () => {

  const [mesSeleccionado, setMesSeleccionado] = useState<number>(() => {
    const mesGuardado = localStorage.getItem('mesSeleccionado');
    return mesGuardado ? parseInt(mesGuardado) : 11; // Si no hay valor guardado, por defecto noviembre (11)
  });


  const [turnos, setTurnos] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<{ doctor_id: number; name: string; area: string; shifts: { [key: string]: { turno: string; turno_id: number } } }[]>([]);
  const [doctorsOriginal, setDoctorsOriginal] = useState<typeof doctors>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showSiglaModal, setShowSiglaModal] = useState(false);
  const [areaInputs, setAreaInputs] = useState<{ areaId: number; areaName: string; areaPersonalSaludId?: number }[]>([]);
  const [newAreas, setNewAreas] = useState<{ areaId: number; areaName: string }[]>([]);
  const [areaEditMode, setAreaEditMode] = useState<boolean>(false);
  const [siglaEditMode, setSiglaEditMode] = useState<boolean>(false);
  const [newAreaValue, setNewAreaValue] = useState<string>('');
  const [fixedAreas, setFixedAreas] = useState<string[]>([]);
  const [areasToDelete, setAreasToDelete] = useState<number[]>([]);
  const [newTurno, setNewTurno] = useState<{ Turno: string; Sigla: string; Hora_Inicio: string; Hora_Fin: string }>({ Turno: '', Sigla: '', Hora_Inicio: '', Hora_Fin: '' });

  const handleOpenModal = () => setShowSiglaModal(true);
  const handleCloseModal = () => setShowSiglaModal(false);

  const [turnosParaEnviar, setTurnosParaEnviar] = useState<any[]>([]);
  const [turnosParaEditar, setTurnosParaEditar] = useState<any[]>([]);


  const handleOpenAreaModal = (areaNames: string | null, doctorId: number) => {
    const areasArray = areaNames
      ? areaNames.split(',').map((area, index) => {
          const [areaPersonalSaludId, areaName] = area.split(':');
          return { areaId: index, areaName: areaName ? areaName.trim() : '', areaPersonalSaludId: parseInt(areaPersonalSaludId) };
        })
      : []; // Si no hay áreas, inicializamos con un array vacío.
  
    setAreaInputs(areasArray);
    setNewAreas([]); // Reiniciar las nuevas áreas al abrir el modal
    setAreasToDelete([]); // Reiniciar las áreas a eliminar
  
    // Establecer las áreas fijas actuales del doctor al abrir el modal
    const fixedAreaNames = ["Emergencia", "Consulta Externa", "Internado"];
    const assignedFixedAreas = fixedAreaNames.filter(fixedArea =>
      areasArray.some(area => area.areaName === fixedArea)
    );
    setFixedAreas(assignedFixedAreas);
  
    setShowAreaModal(true);
    setCurrentDoctorId(doctorId);
  };
  
  // Función para alternar la selección de áreas fijas
  const toggleFixedArea = (areaName: string) => {
    const areaExists = fixedAreas.includes(areaName);
    
    if (areaExists) {
      // Eliminar área fija de las seleccionadas
      setFixedAreas(fixedAreas.filter((area) => area !== areaName));
  
      // Buscar si el área que se está deseleccionando tiene un ID (área existente)
      const existingArea = areaInputs.find((area) => area.areaName === areaName && area.areaPersonalSaludId !== undefined);
      if (existingArea) {
        // Si tiene un `areaPersonalSaludId`, añadirlo a `areasToDelete`
        setAreasToDelete((prev) => [...prev, existingArea.areaPersonalSaludId!]);
      }
  
      // Eliminar del `areaInputs` si ya está presente
      setAreaInputs((prevAreas) => prevAreas.filter((area) => area.areaName !== areaName));
    } else {
      // Agregar área fija a las seleccionadas
      setFixedAreas([...fixedAreas, areaName]);
  
      // Verificar si el área ya existe en los inputs (para evitar duplicados)
      const isAlreadyInAreaInputs = areaInputs.some((area) => area.areaName === areaName);
      if (!isAlreadyInAreaInputs) {
        setAreaInputs((prevAreas) => [
          ...prevAreas,
          {
            areaId: prevAreas.length + 1,
            areaName: areaName,
          },
        ]);
      }
    }
  };

  const handleDeleteArea = (areaId: number, areaPersonalSaludId?: number) => {
    const areaToDelete = areaInputs.find((area) => area.areaId === areaId);
  
    // Primero eliminamos el área de areaInputs
    setAreaInputs(areaInputs.filter((area) => area.areaId !== areaId));
  
    // Si el área a eliminar es una de las fijas (Emergencia, Consulta Externa, etc.)
    if (areaToDelete && fixedAreas.includes(areaToDelete.areaName)) {
      setFixedAreas((prevFixedAreas) => prevFixedAreas.filter((area) => area !== areaToDelete.areaName));
    }
  
    // Si el área tiene un ID, agregamos al arreglo de áreas para eliminar
    if (areaPersonalSaludId !== undefined) {
      setAreasToDelete((prev) => {
        const updatedAreasToDelete = [...prev, areaPersonalSaludId];
        console.log('Areas marcadas para eliminar:', updatedAreasToDelete); // Log para verificar los IDs almacenados
        return updatedAreasToDelete;
      });
    }
  };

  const [totalHorasPorDoctor, setTotalHorasPorDoctor] = useState<{ [doctorId: number]: number }>({});

  const calcularTotalHorasDoctor = (doctor: any) => {
    let totalHoras = 0;
  
    Object.keys(doctor.shifts).forEach((dia) => {
      const turnoSigla = doctor.shifts[dia]?.turno;
      if (turnoSigla) {
        const turnoInfo = turnos.find((t) => t.Sigla === turnoSigla);
        if (turnoInfo && turnoInfo.Carga_Horaria) {
          const cargaHoraria = parseInt(turnoInfo.Carga_Horaria.replace('h', ''), 10);
          if (!isNaN(cargaHoraria)) {
            totalHoras += cargaHoraria;
          }
        }
      }
    });
  
    return totalHoras;
  };

  const calcularCargaHoraria = (horaInicio: string, horaFin: string): string => {
    if (!horaInicio || !horaFin) {
      return 'N/A'; // Retorna un valor por defecto si alguno de los valores no está definido
    }
  
    // Asegurarse de que ambos valores estén en formato "HH:MM"
    const horaInicioFormateada = horaInicio.length === 8 ? horaInicio.substring(0, 5) : horaInicio;
    const horaFinFormateada = horaFin.length === 8 ? horaFin.substring(0, 5) : horaFin;
  
    try {
      const inicio = new Date(`1970-01-01T${horaInicioFormateada}:00`);
      const fin = new Date(`1970-01-01T${horaFinFormateada}:00`);
      const diferenciaMilisegundos = fin.getTime() - inicio.getTime();
  
      if (diferenciaMilisegundos < 0) {
        return 'N/A';
      }
  
      const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
      const diferenciaMinutos = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
  
      // Devolver solo horas si minutos es 0
      if (diferenciaMinutos > 0) {
        return `${diferenciaHoras}h ${diferenciaMinutos}m`;
      } else {
        return `${diferenciaHoras}h`;
      }
    } catch (error) {
      console.error('Error al calcular la carga horaria:', error);
      return 'N/A';
    }
  };
  
  const [especialidadId, setEspecialidadId] = useState<number | "">("");
  const [anioSeleccionado] = useState<number>(2024); 
  const [currentDoctorId, setCurrentDoctorId] = useState<number | null>(null);

  useEffect(() => {
    // Cargar la lista de turnos para el modal desde el backend con el nuevo endpoint
    const fetchTurnos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/codificacion-turnos/filter?especialidadId=${especialidadId}&year=${anioSeleccionado}&month=${mesSeleccionado}`
        );
        const data = await response.json();
        setTurnos(data);
      } catch (error) {
        console.error("Error al cargar los turnos:", error);
      }
    };

    fetchTurnos();
  }, [especialidadId, anioSeleccionado, mesSeleccionado]);

  


  const fetchDoctors_actualizar = async () => {
    if (especialidadId !== "") {
      try {
        const establecimientoID = 1; // Dato estático por ahora
        const response = await fetch(
          `http://localhost:3000/rol-turnos/Listado?mes=${mesSeleccionado}&anio=2024&especialidadId=${especialidadId}&hospitalId=${establecimientoID}`
        );
        if (!response.ok) {
          throw new Error("Error al cargar la lista de doctores");
        }
        const data = await response.json();
  
        const formattedDoctors = data.map((doctor: any) => {
          const shifts = doctor.Turnos.split(',').reduce((acc: any, turno: string) => {
            const [day, sigla, turno_id] = turno.split(':');
            acc[day] = { turno: sigla, turno_id: Number(turno_id) };
            return acc;
          }, {});
  
          return {
            doctor_id: doctor["Personal ID"],
            name: doctor["Nombre Completo"],
            area: doctor.Area,
            shifts,
          };
        });
  
        setDoctors(formattedDoctors);
        setDoctorsOriginal(formattedDoctors); // Guardar una copia de los datos originales
      } catch (error) {
        console.error("Error al cargar la lista de doctores:", error);
      }
    }
  };

  
  
  // useEffect para cargar la lista de doctores
  useEffect(() => {
    if (especialidadId !== "") {
      const fetchDoctors = async () => {
        try {
          const establecimientoID = 1; // Dato estático por ahora
          const response = await fetch(
            `http://localhost:3000/rol-turnos/Listado?mes=${mesSeleccionado}&anio=2024&especialidadId=${especialidadId}&hospitalId=${establecimientoID}`
          );
          if (!response.ok) {
            throw new Error('Error al cargar la lista de doctores');
          }
          const data = await response.json();

          const formattedDoctors = data.map((doctor: any) => {
            const shifts = doctor.Turnos.split(',').reduce((acc: any, turno: string) => {
              const [day, sigla, turno_id] = turno.split(':');
              acc[day] = { turno: sigla, turno_id: Number(turno_id) };
              return acc;
            }, {});

            return {
              doctor_id: doctor["Personal ID"],
              name: doctor["Nombre Completo"],
              area: doctor.Area,
              shifts,
            };
          });

          setDoctors(formattedDoctors);
          setDoctorsOriginal(formattedDoctors); // Guardar una copia de los datos originales

          // Calcular el total de horas por cada doctor al inicializar
          const totalHorasCalculadas: { [key: number]: number } = {};
          formattedDoctors.forEach((doctor: typeof formattedDoctors[0]) => {
            totalHorasCalculadas[doctor.doctor_id] = calcularTotalHorasDoctor(doctor);
          });
          setTotalHorasPorDoctor(totalHorasCalculadas);

        } catch (error) {
          console.error("Error al cargar la lista de doctores:", error);
        }
      };

      fetchDoctors();
    }
  }, [especialidadId, mesSeleccionado]);
  // Cargar la lista de doctores y sus turnos desde el backend según el mes seleccionado
  useEffect(() => {
    const fetchDoctors = async () => {
      if (especialidadId !== "") {
        try {
          const establecimientoID = 1; // Dato estático por ahora
          const response = await fetch(
            `http://localhost:3000/rol-turnos/Listado?mes=${mesSeleccionado}&anio=2024&especialidadId=${especialidadId}&hospitalId=${establecimientoID}`
          );
          if (!response.ok) {
            throw new Error("Error al cargar la lista de doctores");
          }
          const data = await response.json();
  
          const formattedDoctors = data.map((doctor: any) => {
            const shifts = doctor.Turnos.split(',').reduce((acc: any, turno: string) => {
              const [day, sigla, turno_id] = turno.split(':');
              acc[day] = { turno: sigla, turno_id: Number(turno_id) };
              return acc;
            }, {});
  
            return {
              doctor_id: doctor["Personal ID"],
              name: doctor["Nombre Completo"],
              area: doctor.Area,
              shifts,
            };
          });
  
          setDoctors(formattedDoctors);
          setDoctorsOriginal(formattedDoctors); // Guardar una copia de los datos originales
        } catch (error) {
          console.error("Error al cargar la lista de doctores:", error);
        }
      }
    };
  
    fetchDoctors();
  }, [mesSeleccionado, especialidadId]);
  

  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<{
    nombres: string;
    primer_apellido: string;
    segundo_apellido: string;
    ci: string;
    correo_electronico: string;
    telefono: number;
  } | null>(null);
  const [loadingDoctorInfo, setLoadingDoctorInfo] = useState(false);
  

  const handleOpenDoctorModal = async (doctorId: number) => {
    setLoadingDoctorInfo(true); // Muestra un indicador de carga
    try {
      const response = await fetch(`http://localhost:3000/personal-salud/${doctorId}`);
      if (!response.ok) {
        throw new Error('Error al obtener la información del médico');
      }
      const data = await response.json();
      setSelectedDoctor(data.data); // Almacena los datos del doctor en el estado
    } catch (error) {
      console.error('Error al obtener la información del médico:', error);
      setSelectedDoctor(null);
    } finally {
      setLoadingDoctorInfo(false); // Oculta el indicador de carga
      setShowDoctorModal(true);
    }
  };
  
  
  const handleCloseDoctorModal = () => {
    setSelectedDoctor(null);
    setShowDoctorModal(false);
  };
  

  


  // Manejar cambio de mes
  const handleMesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoMes = Number(event.target.value);
    setMesSeleccionado(nuevoMes);
    localStorage.setItem('mesSeleccionado', nuevoMes.toString()); // Guardar el mes seleccionado en localStorage
  };

  const numeroDeDias = new Date(2024, mesSeleccionado, 0).getDate(); // Número de días en el mes seleccionado

  // Funciones para manejar los botones de Editar, Guardar, Cancelar
  const handleEditar = () => {
    setEditando(true);
    setDoctorsOriginal(doctors); // Guardar el estado actual como original al iniciar edición
  };

  const handleCancelar = () => {
    setEditando(false);
    setDoctors(doctorsOriginal); // Revertir los cambios al estado original
  };

  const handleAreaInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newAreaInputs = [...areaInputs];
    newAreaInputs[index].areaName = event.target.value;
    setAreaInputs(newAreaInputs);
  };

  const handleNewAreaInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAreaValue(event.target.value);
  };

  const handleAddArea = () => {
    if (newAreaValue.trim() !== '') {
      setNewAreas([...newAreas, { areaId: newAreas.length, areaName: newAreaValue.trim() }]);
      setNewAreaValue('');
    }
  };

  const handleAreaEdit = () => {
    setAreaEditMode(true);
  };

  const handleAreaSave = async () => {
    setAreaEditMode(false);
    // Guardar las áreas nuevas
    if (currentDoctorId !== null) {
      const areasToSave = [...newAreas, ...fixedAreas.map((areaName, index) => ({
        areaId: index,
        areaName
      }))].map((area) => ({
        area: area.areaName,
        personal_salud_personal_ID: currentDoctorId,
        fecha: `2024-${mesSeleccionado.toString().padStart(2, '0')}-01`,
      }));

      try {
        const response = await fetch('http://localhost:3000/area-personal/multiple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(areasToSave),
        });
        if (!response.ok) {
          throw new Error('Error al guardar las áreas');
        }
        console.log('Áreas guardadas correctamente');
      } catch (error) {
        console.error('Error al guardar las áreas:', error);
      }
    }

    // Actualizar las áreas existentes
    const areasToUpdate = areaInputs.filter(area => area.areaPersonalSaludId !== undefined && area.areaName !== doctorsOriginal.find(doc => doc.doctor_id === currentDoctorId)?.area.split(',').find(a => a.includes(area.areaPersonalSaludId?.toString() || ''))?.split(':')[1].trim());
    const updateData = areasToUpdate.map(area => ({
      area_personal_salud_ID: area.areaPersonalSaludId,
      area: area.areaName
    }));

    if (updateData.length > 0) {
      try {
        const response = await fetch('http://localhost:3000/area-personal/update-multiple', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });
        if (!response.ok) {
          throw new Error('Error al actualizar las áreas');
        }
        console.log('Áreas actualizadas correctamente');
      } catch (error) {
        console.error('Error al actualizar las áreas:', error);
      }
    }

    // Eliminar las áreas marcadas para eliminar
    if (areasToDelete.length > 0) {
      console.log('Áreas a eliminar despues del if:', areasToDelete); // Log para verificar los IDs de las áreas a eliminar
      try {
        console.log('Enviando solicitud para eliminar áreas...');
        const response = await fetch('http://localhost:3000/area-personal/delete-multiple', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: areasToDelete }),
        });

        console.log('Response received:', response.status); // Log response status

        if (!response.ok) {
          throw new Error('Error al eliminar las áreas');
        }

        console.log('Áreas eliminadas correctamente');
      } catch (error) {
        console.error('Error al eliminar las áreas:', error);
      }
    } else {
      console.log('No hay áreas para eliminar');
    }

    fetchDoctors_actualizar();
    setShowAreaModal(false);
};


  const handleAreaCancel = () => {
    setAreaEditMode(false);
  };
  const handleSiglaCancel = () => {
    setSiglaEditMode(false);
  };
  const handleAreaSalir = () => {
    setAreaEditMode(false);
    setShowAreaModal(false);
  };

  const handleNewTurnoInputChange = (field: string, value: string) => {
    setNewTurno({ ...newTurno, [field]: value });
  };
  
  const handleGuardarTurnos = async () => {
    setSiglaEditMode(false);
  
    // Guardar nuevos turnos
    if (turnosParaEnviar.length > 0) {
      try {
        const response = await fetch('http://localhost:3000/codificacion-turnos/multiple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codificacionTurnos: turnosParaEnviar }),
        });
  
        if (!response.ok) {
          throw new Error('Error al guardar los turnos');
        }
  
        console.log('Turnos guardados correctamente');
        setTurnosParaEnviar([]);
      } catch (error) {
        console.error('Error al guardar los turnos:', error);
      }
    }
  
    // Guardar ediciones de turnos existentes
    if (turnosParaEditar.length > 0) {
      try {
        const response = await fetch('http://localhost:3000/codificacion-turnos/update-multiple', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(turnosParaEditar),
        });
  
        if (!response.ok) {
          throw new Error('Error al editar los turnos');
        }
  
        console.log('Turnos editados correctamente');
        setTurnosParaEditar([]);
      } catch (error) {
        console.error('Error al editar los turnos:', error);
      }
    }
  
    fetchDoctors_actualizar();
    setShowSiglaModal(false);
  };
  
  
    const handleEditarsigla = () => {
      setSiglaEditMode(true);
    };

    const [turnosParaActualizar, setTurnosParaActualizar] = useState<any[]>([]); // Estado para turnos que necesitan ser actualizados

    const [especialidades, setEspecialidades] = useState<{ ID: number; nombre: string }[]>([]);
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<number | "">("");

    useEffect(() => {
      const fetchEspecialidades = async () => {
        try {
          const response = await fetch('http://localhost:3000/rol-turnos/Especialidades');
          if (!response.ok) {
            throw new Error('Error al cargar las especialidades');
          }
          const data = await response.json();
          setEspecialidades(data);
        } catch (error) {
          console.error('Error al cargar las especialidades:', error);
        }
      };
    
      fetchEspecialidades();
    }, []);

    const handleGuardarTurnosDoctor = async () => {
      // Aquí manejar el modo de edición
      setEditando(false);
    
      // Guardar nuevos turnos (inserts)
      if (turnosParaEnviar.length > 0) {
        try {
          const response = await fetch('http://localhost:3000/rol-turnos/Registro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(turnosParaEnviar),
          });
    
          if (!response.ok) {
            throw new Error('Error al guardar los turnos');
          }
    
          console.log('Turnos guardados correctamente');
          setTurnosParaEnviar([]);
        } catch (error) {
          console.error('Error al guardar los turnos:', error);
        }
      }
    
      // Guardar ediciones de turnos existentes (updates)
      if (turnosParaActualizar.length > 0) {
        try {
          const response = await fetch('http://localhost:3000/rol-turnos/update-multiple', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(turnosParaActualizar),
          });
    
          if (!response.ok) {
            throw new Error('Error al actualizar los turnos');
          }
    
          console.log('Turnos actualizados correctamente');
          setTurnosParaActualizar([]);
        } catch (error) {
          console.error('Error al actualizar los turnos:', error);
        }
      }
    
      // Actualizar la lista de doctores después de guardar cambios
      fetchDoctors_actualizar();
    };

  return (
    <div>
      {showSiglaModal && (
        <div className={`${styles.modal_container} ${styles.show}`}>
        <div className={`${styles.modal_own} ${styles.modal_sigla}`}>
          {siglaEditMode && (
            <div className={`${styles.button_agregar} ${styles.box_sigla_agregar}`}>
            <div className={styles.input_group_time}>
              <label htmlFor="turno" className={styles.input_label}>Turno</label>
              <input
                type="text"
                id="turno"
                placeholder="Turno"
                value={newTurno.Turno}
                onChange={(e) => handleNewTurnoInputChange('Turno', e.target.value)}
                className={`${styles.input_area} ${styles.agregar_imput} ${styles.input_area_boton}`}
              />
            </div>

            <div className={styles.input_group_time}>
              <label htmlFor="sigla" className={styles.input_label}>Sigla</label>
              <input
                type="text"
                id="sigla"
                placeholder="Sigla"
                value={newTurno.Sigla}
                onChange={(e) => handleNewTurnoInputChange('Sigla', e.target.value)}
                className={`${styles.input_area} ${styles.agregar_imput} ${styles.input_area_boton} ${styles.input_sigla}`}
              />
            </div>
            <div className={styles.input_group_time}>
              <label htmlFor="horaInicio" className={styles.input_label}>Hora Inicio</label>
              <input
                type="time"
                id="horaInicio"
                placeholder="Hora Inicio (HH:MM)"
                value={newTurno.Hora_Inicio}
                onChange={(e) => handleNewTurnoInputChange('Hora_Inicio', e.target.value)}
                className={`${styles.input_area} ${styles.agregar_imput} ${styles.input_area_boton} ${styles.input_sigla_hora}`}
              />
            </div>
            <div className={styles.input_group_time}>
              <label htmlFor="horaFin" className={styles.input_label}>Hora Fin</label>
              <input
                type="time"
                id="horaFin"
                placeholder="Hora Fin (HH:MM)"
                value={newTurno.Hora_Fin}
                onChange={(e) => handleNewTurnoInputChange('Hora_Fin', e.target.value)}
                className={`${styles.input_area} ${styles.agregar_imput} ${styles.input_area_boton} ${styles.input_sigla_hora}`}
              />
            </div>
            <button className={`${styles.Btn_rol} ${styles.buton_sigla_agregar}`} onClick={() => {}}>Agregar</button>
          </div>
          )}
          <table>
            <thead>
              <tr className= {`${styles.header_control} ${styles.tabla_popup}`}>
                <th>Turnos</th>
                <th>Sigla</th>
                <th colSpan={2}>Horario</th>
                <th>Carga Horaria</th>
              </tr>
            </thead>
            <tbody>
              {turnos.map((turno) => (
                <tr key={turno.codificacion_turnos_id}>
                  <td>
                    {siglaEditMode ? (
                      <input
                        type="text"
                        value={turno.Turno}
                        onChange={(e) =>
                          setTurnos((prevTurnos) =>
                            prevTurnos.map((t) =>
                              t.codificacion_turnos_id === turno.codificacion_turnos_id
                                ? { ...t, Turno: e.target.value }
                                : t
                            )
                          )
                        }
                        onBlur={() =>
                          setTurnosParaEditar((prevTurnos) => [
                            ...prevTurnos.filter(
                              (t) => t.codificacion_turnos_id !== turno.codificacion_turnos_id
                            ),
                            {
                              ...turno,
                              Turno: turno.Turno,
                              Carga_Horaria: calcularCargaHoraria(
                                turno.Hora_Inicio,
                                turno.Hora_Fin
                              ),
                            },
                          ])
                        }
                        className={styles.input_area}
                      />
                    ) : (
                      turno.Turno
                    )}
                  </td>
                  <td>
                    {siglaEditMode ? (
                      <input
                        type="text"
                        value={turno.Sigla}
                        onChange={(e) =>
                          setTurnos((prevTurnos) =>
                            prevTurnos.map((t) =>
                              t.codificacion_turnos_id === turno.codificacion_turnos_id
                                ? { ...t, Sigla: e.target.value }
                                : t
                            )
                          )
                        }
                        onBlur={() =>
                          setTurnosParaEditar((prevTurnos) => [
                            ...prevTurnos.filter(
                              (t) => t.codificacion_turnos_id !== turno.codificacion_turnos_id
                            ),
                            {
                              ...turno,
                              Sigla: turno.Sigla,
                              Carga_Horaria: calcularCargaHoraria(
                                turno.Hora_Inicio,
                                turno.Hora_Fin
                              ),
                            },
                          ])
                        }
                        className={styles.input_area}
                      />
                    ) : (
                      turno.Sigla
                    )}
                  </td>
                  <td>
                    {siglaEditMode ? (
                      <input
                        type="time"
                        value={turno.Hora_Inicio}
                        onChange={(e) =>
                          setTurnos((prevTurnos) =>
                            prevTurnos.map((t) =>
                              t.codificacion_turnos_id === turno.codificacion_turnos_id
                                ? { ...t, Hora_Inicio: e.target.value }
                                : t
                            )
                          )
                        }
                        onBlur={() =>
                          setTurnosParaEditar((prevTurnos) => [
                            ...prevTurnos.filter(
                              (t) => t.codificacion_turnos_id !== turno.codificacion_turnos_id
                            ),
                            {
                              ...turno,
                              Hora_Inicio: turno.Hora_Inicio,
                              Carga_Horaria: calcularCargaHoraria(
                                turno.Hora_Inicio,
                                turno.Hora_Fin
                              ),
                            },
                          ])
                        }
                        className={styles.input_area}
                      />
                    ) : (
                      turno.Hora_Inicio.substring(0, 5)
                    )}
                  </td>
                  <td>
                    {siglaEditMode ? (
                      <input
                        type="time"
                        value={turno.Hora_Fin}
                        onChange={(e) =>
                          setTurnos((prevTurnos) =>
                            prevTurnos.map((t) =>
                              t.codificacion_turnos_id === turno.codificacion_turnos_id
                                ? { ...t, Hora_Fin: e.target.value }
                                : t
                            )
                          )
                        }
                        onBlur={() =>
                          setTurnosParaEditar((prevTurnos) => [
                            ...prevTurnos.filter(
                              (t) => t.codificacion_turnos_id !== turno.codificacion_turnos_id
                            ),
                            {
                              ...turno,
                              Hora_Fin: turno.Hora_Fin,
                              Carga_Horaria: calcularCargaHoraria(
                                turno.Hora_Inicio,
                                turno.Hora_Fin
                              ),
                            },
                          ])
                        }
                        className={styles.input_area}
                      />
                    ) : (
                      turno.Hora_Fin.substring(0, 5)
                    )}
                  </td>
                  <td>{calcularCargaHoraria(turno.Hora_Inicio, turno.Hora_Fin)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.buttons_container}>
            {!siglaEditMode ? (
              <>
              <button className={`${styles.Btn_rol} ${styles.btn_editar}`} onClick={handleEditarsigla}>
                Editar
              </button>
              <button className={`${styles.Btn_rol} ${styles.btn_cancelar}`} onClick={handleCloseModal}>
                Salir
              </button>
              </>
            ) : (
              <>
                <button className={`${styles.Btn_rol} ${styles.btn_guardar}`} onClick={handleGuardarTurnos}>
                  Guardar
                </button>
                <button className={`${styles.Btn_rol} ${styles.btn_cancelar}`} onClick={handleSiglaCancel}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      )}

      {showDoctorModal && (
        <div className={`${styles.modal_container} ${styles.show}`}>
          <div className={styles.modal_own}>
            {loadingDoctorInfo ? (
              <p>Cargando información...</p>
            ) : selectedDoctor ? (
              <>
                <h2>Información del Médico</h2>
                <p><strong>Nombre Completo:</strong> {`${selectedDoctor.nombres} ${selectedDoctor.primer_apellido} ${selectedDoctor.segundo_apellido}`}</p>
                <p><strong>CI:</strong> {selectedDoctor.ci}</p>
                <p><strong>Correo Electrónico:</strong> {selectedDoctor.correo_electronico}</p>
                <p><strong>Teléfono:</strong> {selectedDoctor.telefono}</p>
                <button
                  className={`${styles.Btn_rol} ${styles.btn_cancelar}`}
                  onClick={handleCloseDoctorModal}
                >
                  Cerrar
                </button>
              </>
            ) : (
              <p>No se pudo cargar la información del médico.</p>
            )}
          </div>
        </div>
      )}



      {showAreaModal && (
        <div className={`${styles.modal_container} ${styles.show}`}>
          <div className={styles.modal_own}>
            <div className={styles.input_container}>
              {areaEditMode && (
                <div className={styles.button_agregar}>
                  <input
                    type="text"
                    value={newAreaValue}
                    onChange={handleNewAreaInputChange}
                    className={`${styles.input_area} ${styles.agregar_imput} ${styles.input_area_boton}`}
                  />
                  <button className={styles.input_area_boton} onClick={handleAddArea}>Agregar</button>
                </div>
              )}
              {areaEditMode && (
                <div className={styles.inputs_fijos}>
                  {["Emergencia", "Consulta Externa", "Internado"].map((fixedArea) => (
                    <div key={fixedArea} className={`${styles.input_editable_button} ${styles.input_fijo_check}`}>
                      <button
                        className={styles.input_checkbox}
                        onClick={() => toggleFixedArea(fixedArea)}
                      >
                        <i className={
                          fixedAreas.includes(fixedArea)
                            ? 'bx bx-checkbox-checked'
                            : 'bx bx-checkbox'
                        }></i>
                      </button>
                      <input
                        type="text"
                        value={fixedArea}
                        disabled
                        className={`${styles.input_area} ${styles.input_area_check}`}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.inputs_multiples}>
                {areaInputs.map((area, index) => (
                  <div key={area.areaId} className={styles.input_editable_button}>
                    {areaEditMode && (
                      <button className={styles.input_button_eliminar} onClick={() => handleDeleteArea(area.areaId, area.areaPersonalSaludId)}>
                        <i className='bx bx-trash'></i>
                      </button>
                    )}
                    <input
                      type="text"
                      value={area.areaName}
                      onChange={(e) => handleAreaInputChange(index, e)}
                      disabled={!areaEditMode}
                      className={styles.input_area}
                    />
                  </div>
                ))}
                {newAreas.map((area, index) => (
                  <div key={area.areaId} className={styles.input_editable_button}>
                    {areaEditMode && (
                      <button className={styles.input_button_eliminar} onClick={() => setNewAreas(newAreas.filter((_, i) => i !== index))}>
                        <i className='bx bx-trash'></i>
                      </button>
                    )}
                    <input
                      type="text"
                      value={area.areaName}
                      onChange={(e) => handleAreaInputChange(index, e)}
                      disabled={!areaEditMode}
                      className={styles.input_area}
                    />
                  </div>
                ))}
              </div>
            </div>           
            <div className={styles.buttons_container}>
              {!areaEditMode && (
                <>
                  <button className={`${styles.Btn_rol} ${styles.btn_editar}`} onClick={handleAreaEdit}>Editar</button>
                  <button className={`${styles.Btn_rol} ${styles.btn_cancelar}`} onClick={handleAreaSalir}>Salir</button>
                </>                
              )}
              {areaEditMode && (
                <>
                  <button className={`${styles.Btn_rol} ${styles.btn_guardar}`} onClick={handleAreaSave}>Guardar</button>
                  <button className={`${styles.Btn_rol} ${styles.btn_cancelar}`} onClick={handleAreaCancel}>Cancelar</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={styles.contenedor}>
        <h1>Control de Horarios - Agosto 2024</h1>
        <div onClick={handleOpenModal} className={styles.preguntas}>
          <label>Significado siglas</label>
          <i className="fa-solid fa-circle-info help"></i>
        </div>
      </div>

      <table>
        <thead>
          <tr className={styles.header_control}>
            <th colSpan={3}>Control años</th>
            <th colSpan={4}>2024</th>
            <th colSpan={4}>Control meses</th>
            <th colSpan={4} className={styles.highlight}>
              <select value={mesSeleccionado} onChange={handleMesChange}>
                <option value="">Seleccionar Mes</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </th>
            <th colSpan={6} className={styles.highlight}>
              <select
                value={especialidadSeleccionada}
                onChange={(e) => {
                  const selectedId = Number(e.target.value) || "";
                  setEspecialidadSeleccionada(selectedId);
                  setEspecialidadId(selectedId);
                }}
              >
                <option value="">Seleccionar Especialidad</option>
                {especialidades.map((especialidad) => (
                  <option key={especialidad.ID} value={especialidad.ID}>
                    {especialidad.nombre}
                  </option>
                ))}
              </select>
            </th>
          </tr>
          <tr>
            <th rowSpan={2}>N°</th>
            <th rowSpan={2}>NOMBRE COMPLETO</th>
            <th rowSpan={2}>ÁREA</th>
            {Array.from({ length: numeroDeDias }, (_, i) => {
              const fecha = new Date(2024, mesSeleccionado - 1, i + 1);
              const nombreDia = fecha.toLocaleString('es-ES', { weekday: 'short' });
              const esFinDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6; // 0 es domingo, 6 es sábado

              return (
                <th
                  key={`dia-${i + 1}`}
                  className={esFinDeSemana ? styles.fin_de_semana : ''}
                >
                  {nombreDia}
                </th>
              );
            })}
            <th rowSpan={2}>Total Horas</th>
          </tr>
          <tr>
            {Array.from({ length: numeroDeDias }, (_, i) => {
              const fecha = new Date(2024, mesSeleccionado - 1, i + 1);
              const esFinDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6;

              return (
                <th
                  key={`fecha-${i + 1}`}
                  className={esFinDeSemana ? styles.fin_de_semana : ''}
                >
                  {i + 1}
                </th>
              );
            })}
          </tr>       
        </thead>
        <tbody>
          {doctors
            .filter((doctor) => doctor.name !== "S/D") // Filtrar doctores sin datos
            .map((doctor) => {
              // Procesar las áreas del doctor
              const areasArray = doctor.area.split(',').map((areaString) => {
                const [areaId, areaName] = areaString.split(':');
                return { areaId: parseInt(areaId, 10), areaName };
              });

              // Concatenar los nombres de las áreas con " - "
              const areaNames = areasArray.map((area) => area.areaName).join(' - ');

              return (
                <tr key={doctor.doctor_id}>
                  <td>{doctor.doctor_id}</td>
                  <td onClick={() => handleOpenDoctorModal(doctor.doctor_id)}>
                    {doctor.name}
                  </td>


                  {/* Mostrar los nombres de las áreas concatenados */}
                  <td onClick={() => handleOpenAreaModal(doctor.area || '', doctor.doctor_id)}>
                    {areaNames || 'Agregar área'}
                  </td>
                  {Array.from({ length: numeroDeDias }, (_, i) => {
                    const dia = (i + 1).toString();
                    const turno = doctor.shifts[dia]?.turno || '';
                    const turnoId = doctor.shifts[dia]?.turno_id ?? null;
                    
                    // Calcular el día de la semana y asignar la clase correspondiente si es sábado o domingo
                    const fecha = new Date(2024, mesSeleccionado - 1, parseInt(dia));
                    const diaSemana = fecha.getDay(); // 0 para domingo, 6 para sábado
                    const esFinDeSemana = diaSemana === 0 || diaSemana === 6;
                    const claseFinDeSemana = esFinDeSemana ? styles.fin_de_semana : '';

                    return (
                      <td key={dia} className={claseFinDeSemana}>
                        <select
                          value={turno}
                          disabled={!editando}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            const codificacionTurno = turnos.find((t) => t.Sigla === newValue)?.codificacion_turnos_id ?? null;

                            setDoctors((prevDoctors) =>
                              prevDoctors.map((d) =>
                                d.doctor_id === doctor.doctor_id
                                  ? {
                                      ...d,
                                      shifts: {
                                        ...d.shifts,
                                        [dia]: {
                                          turno: newValue,
                                          turno_id: codificacionTurno,
                                        },
                                      },
                                    }
                                  : d
                              )
                            );

                            // Diferenciar entre insert y update
                            if (turno === '' && newValue !== '') {
                              // Caso Insert
                              setTurnosParaEnviar((prev) => [
                                ...prev.filter(
                                  (t) =>
                                    t.fecha !==
                                      `${anioSeleccionado}-${mesSeleccionado.toString().padStart(2, '0')}-${dia.padStart(2, '0')}` ||
                                    t.personal_salud_personal_ID !== doctor.doctor_id
                                ),
                                {
                                  fecha: `${anioSeleccionado}-${mesSeleccionado.toString().padStart(2, '0')}-${dia.padStart(2, '0')}`,
                                  personal_salud_personal_ID: doctor.doctor_id,
                                  establecimiento_salud_idestablecimiento_ID: 1, // Dato estático por ahora
                                  especialidad_especialidad_ID: especialidadId, // Dato estático por ahora
                                  codificacion_codificacion_turno_ID: codificacionTurno,
                                  usuario_creacion: 1, // Dato estático por ahora
                                },
                              ]);
                            } else if (turno !== '' && newValue !== '') {
                              // Caso Update
                              setTurnosParaActualizar((prev) => [
                                ...prev.filter((t) => t.turno_ID !== turnoId),
                                {
                                  turno_ID: turnoId,
                                  codificacion_codificacion_turno_ID: codificacionTurno,
                                },
                              ]);
                            } else if (turno !== '' && newValue === '') {
                              // Caso Update para dejar vacío
                              setTurnosParaActualizar((prev) => [
                                ...prev.filter((t) => t.turno_ID !== turnoId),
                                {
                                  turno_ID: turnoId,
                                  codificacion_codificacion_turno_ID: null,
                                },
                              ]);
                            } else {
                              // Si el valor se deja vacío después de haber sido un valor nuevo (revertir)
                              setTurnosParaEnviar((prev) =>
                                prev.filter(
                                  (t) =>
                                    t.fecha !== `${anioSeleccionado}-${mesSeleccionado.toString().padStart(2, '0')}-${dia.padStart(2, '0')}` ||
                                    t.personal_salud_personal_ID !== doctor.doctor_id
                                )
                              );
                            }

                            // Actualizar el total de horas para el doctor actualizado
                            setTotalHorasPorDoctor((prevTotalHoras) => ({
                              ...prevTotalHoras,
                              [doctor.doctor_id]: calcularTotalHorasDoctor({
                                ...doctor,
                                shifts: {
                                  ...doctor.shifts,
                                  [dia]: {
                                    turno: newValue,
                                    turno_id: codificacionTurno,
                                  },
                                },
                              }),
                            }));
                          }}
                        >
                          <option value=""></option>
                          {turnos.map((t) => (
                            <option key={t.codificacion_turnos_id} value={t.Sigla}>
                              {t.Sigla}
                            </option>
                          ))}
                        </select>
                      </td>
                    );
                  })}

                  <td>{totalHorasPorDoctor[doctor.doctor_id] || 0}h</td>
                </tr>
              );
            })}
        </tbody>

      </table>

      {/* Botones Editar, Guardar, Cancelar */}
      <div className={styles.button_group}>
        {!editando && (
          <button className={`${styles.Btn_rol} ${styles.btn_editar}`} onClick={handleEditar}>
            Editar
          </button>
        )}
        {editando && (
          <>
            <button className={`${styles.Btn_rol} ${styles.btn_guardar}`} onClick={handleGuardarTurnosDoctor}>
              Guardar
            </button>
            <button className={`${styles.Btn_rol} ${styles.btn_cancelar}`} onClick={handleCancelar}>
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShiftTable;
