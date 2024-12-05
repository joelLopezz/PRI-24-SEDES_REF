import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './../src/Context/AuthContext';
import Layout from './Components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';

// Importaciones adicionales de las páginas
import EstablecimientoList from './pages/EstablecimientoSalud/EstablecimientoList';
import EstablecimientoRegister from './pages/EstablecimientoSalud/EstablecimientoRegister';
import EstablecimientoEdit from './pages/EstablecimientoSalud/EstablecimientoEdit';
import EspecialidadesList from './pages/Especialidades/EspecialidadesList';
import EspecialidadCreate from './pages/Especialidades/EspecialidadCreate';
import EspecialidadEdit from './pages/Especialidades/EspecialidadEdit';
import ServiceList from './pages/Servicio/ServiceList';
import CreateService from './pages/Servicio/CreateService';
import EditService from './pages/Servicio/EditService';
import MiHospital from './pages/Mi_Hospital/Mi_Hospital';
import AgregarEspecialidades from './pages/Mi_Hospital/add_specialtys';
import ServiciosEspecialidad from './pages/Mi_Hospital/ServiciosEspecialidad';
import AgregarServicios from './pages/Mi_Hospital/AgregarServicios';
import EstablecerDisponible from './pages/Mi_Hospital/EstablecerDisponible';
import VerDisponibilidadPorMes from './pages/Mi_Hospital/VerDisponibilidadPorMes';
import EspecialidadesSemana from './pages/Mi_Hospital/EspecialidadesSemana';
import RedesList from './pages/Red_Cordinacion/RedesList';
import RedCreate from './pages/Red_Cordinacion/RedCreate';
import RedEdit from './pages/Red_Cordinacion/RedEdit';
import HospitalesList from './pages/Hospitales/HospitalesList';
import HospitalInfo from './pages/Hospitales/HospitalInfo';
import ServiciosEspInfo from './pages/Hospitales/ServiciosEspInfo';
import Credits from './pages/HomePage/Credits';
import CambiarContrasenia from './pages/Login/CambiarContrasenia';

import PersonalSaludList from    './pages/personal_salud/PersonalSaludList';
import PersonalSaludEdit from    './pages/personal_salud/PersonalSaludEdit';
import PersonalSaludCreate from  './pages/personal_salud/PersonalSaludCreate';
import EspecialidadesReport from './reporte/especialidadReport';

import RolTurnosList from './pages/RoldeTurnos/RolTurnosList';
import ConsultaExternaList from './pages/ConsultaExterna/ConsultaExternaList';

import CamaList from './pages/Cama/CamaList';
import CamaCreate from './pages/Cama/CamaCreate';

import ReferenciaList from './pages/Referencia/ReferenciaList';
import ReferenciaCreate from './pages/Referencia/FormularioReferencias';
import ReferenciaPendiente from './pages/Referencia/ReferenciaPendientes';
import ReferenciaEdit from './pages/Referencia/ReferenciaEdit';

function ProtectedRoutes() {
  const { hasPermission } = useAuth();

  return (
      <Routes>
        <Route element={<Layout />}>
            {/* Redirigir a HomePage */}
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" element={<HomePage />} />

            {/* Rutas protegidas basadas en roles */}
            <Route
              path="/establecimientos"
              element={hasPermission(['Admin Sedes']) ? <EstablecimientoList /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/establecimientos/crear"
              element={hasPermission(['Admin Sedes']) ? <EstablecimientoRegister /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/establecimientos/editar/:id"
              element={hasPermission(['Admin Sedes']) ? <EstablecimientoEdit /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/especialidades"
              element={hasPermission(['Admin Sedes', 'Admin Hospital']) ? <EspecialidadesList /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/especialidades/crear"
              element={hasPermission(['Admin Sedes', 'Admin Hospital']) ? <EspecialidadCreate /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/especialidades/editar/:id"
              element={hasPermission(['Admin Sedes', 'Admin Hospital']) ? <EspecialidadEdit /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/servicios"
              element={hasPermission(['Admin Sedes', 'Admin Hospital']) ? <ServiceList /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/servicios/crear"
              element={hasPermission(['Admin Sedes', 'Admin Hospital']) ? <CreateService /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/servicios/editar/:id"
              element={hasPermission(['Admin Sedes', 'Admin Hospital']) ? <EditService /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/miHospital"
              element={hasPermission(['Admin Hospital', 'Doctor']) ? <MiHospital /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/miHospital/agregar-especialidades"
              element={hasPermission(['Admin Hospital']) ? <AgregarEspecialidades /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/miHospital/especialidad/:especialidadId/servicios"
              element={hasPermission(['Admin Hospital', 'Doctor']) ? <ServiciosEspecialidad /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/miHospital/especialidad/:especialidadId/agregar-servicios"
              element={hasPermission(['Admin Hospital']) ? <AgregarServicios /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/miHospital/especialidad/:especialidadId/establecer-disponibilidad"
              element={hasPermission(['Admin Hospital']) ? <EstablecerDisponible /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/miHospital/especialidad/:especialidadId/ver-disponibilidad"
              element={hasPermission(['Admin Hospital', 'Doctor']) ? <VerDisponibilidadPorMes /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/miHospital/ver-disponibilidad"
              element={hasPermission(['Admin Hospital', 'Doctor']) ? <EspecialidadesSemana /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/red-coordinacion"
              element={hasPermission(['Admin Sedes']) ? <RedesList /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/red-cordinacion/crear"
              element={hasPermission(['Admin Sedes']) ? <RedCreate /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/red-cordinacion/editar/:id"
              element={hasPermission(['Admin Sedes']) ? <RedEdit /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/hospitales-info"
              element={hasPermission(['Admin Sedes', 'Admin Hospital', 'Doctor']) ? <HospitalesList /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/hospitales-info/:id"
              element={hasPermission(['Admin Sedes', 'Admin Hospital', 'Doctor']) ? <HospitalInfo /> : <Navigate to="/inicio" />}
            />
            <Route
              path="/hospitales-info/servicios-especialidad/:especialidadId"
              element={hasPermission(['Admin Sedes', 'Admin Hospital', 'Doctor']) ? <ServiciosEspInfo /> : <Navigate to="/inicio" />}
            />
            <Route path="/credits" element={<Credits />} />
            <Route path="/cama" element={hasPermission(['Doctor', 'Enfermera', 'Admin Hospital']) ? <CamaList /> : <Navigate to="/inicio" />}
            />
            <Route path='/crearCama' element={hasPermission(['Doctor', 'Enfermero', 'Admin Hospital']) ? <CamaCreate /> : <Navigate to="/inicio" />}/>
 
            <Route path="/personal-salud" element={<PersonalSaludList />} />
            <Route path="/personal-salud/create" element={<PersonalSaludCreate />} />
            <Route path="/personal-salud/edit/:id" element={<PersonalSaludEdit />} />

            <Route path="/personal-salud/create" element={<PersonalSaludCreate/>} />

            {/* Ruta de reporte  */}
            <Route path="/reporte-especialidades" element={<EspecialidadesReport />} />

            {/* Ruta de Cronograma de turnos  */}
            <Route path='/cronograma-turnos' element={<RolTurnosList/>}/>
            <Route path='/consulta-externa' element={<ConsultaExternaList/>}/>

            <Route path="/cambiar-contrasenia" element={<CambiarContrasenia />} />

            
            <Route path="/referencia/create" element={<ReferenciaCreate />} />
            <Route path="/referencia/pendiente" element={<ReferenciaPendiente />} />
            
            <Route path="/referencia/edit/:id" element={<ReferenciaEdit />} />

            <Route path='/referencia' element={hasPermission(['Doctor']) ? <ReferenciaList /> : <Navigate to="/referencia/pendiente"/>}/>
        </Route>
      </Routes>
  );
}

export default ProtectedRoutes;