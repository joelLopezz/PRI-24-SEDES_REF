import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage'; // Importa la página de inicio
import Login from './pages/Login/login'; // Página de inicio de sesión

// Importaciones adicionales
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
import CamaList from './pages/Cama/CamaList'; // Importación de Cama

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Redirigir a Login como página inicial */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Página de login */}
          <Route path="/login" element={<Login />} />

          {/* Nueva ruta para HomePage */}
          <Route path="/inicio" element={<HomePage />} />

          {/* Rutas de establecimientos de salud */}
          <Route path="/establecimientos" element={<EstablecimientoList />} />
          <Route path="/establecimientos/crear" element={<EstablecimientoRegister />} />
          <Route path="/establecimientos/editar/:id" element={<EstablecimientoEdit />} />

          {/* Rutas de especialidades */}
          <Route path="/especialidades" element={<EspecialidadesList />} />
          <Route path="/especialidades/crear" element={<EspecialidadCreate />} />
          <Route path="/especialidades/editar/:id" element={<EspecialidadEdit />} />

          {/* Rutas de servicios */}
          <Route path="/servicios" element={<ServiceList />} />
          <Route path="/servicios/crear" element={<CreateService />} />
          <Route path="/servicios/editar/:id" element={<EditService />} />

          {/* Rutas de Mi Hospital */}
          <Route path="/miHospital" element={<MiHospital />} />
          <Route path="/miHospital/agregar-especialidades" element={<AgregarEspecialidades />} />
          <Route path="/miHospital/especialidad/:especialidadId/servicios" element={<ServiciosEspecialidad />} />
          <Route path="/miHospital/especialidad/:especialidadId/agregar-servicios" element={<AgregarServicios />} />
          <Route path="/miHospital/especialidad/:especialidadId/establecer-disponibilidad" element={<EstablecerDisponible />} />
          <Route path="/miHospital/especialidad/:especialidadId/ver-disponibilidad" element={<VerDisponibilidadPorMes />} />
          <Route path="/miHospital/ver-disponibilidad" element={<EspecialidadesSemana />} />

          {/* Rutas para Redes de Coordinación */}
          <Route path="/red-coordinacion" element={<RedesList />} />
          <Route path="/red-coordinacion/crear" element={<RedCreate />} />
          <Route path="/red-coordinacion/editar/:id" element={<RedEdit />} />

          {/* Rutas de información de hospitales */}
          <Route path="/hospitales-info" element={<HospitalesList />} />
          <Route path="/hospitales-info/:id" element={<HospitalInfo />} />
          <Route path="/hospitales-info/servicios-especialidad/:especialidadId" element={<ServiciosEspInfo />} />

          {/* Ruta de créditos */}
          <Route path="/credits" element={<Credits />} />

          {/* Rutas de camas */}
          <Route path="/cama" element={<CamaList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
