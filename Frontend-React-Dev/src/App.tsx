import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import EstablecimientoList from './pages/EstablecimientoSalud/EstablecimientoList'; // Cambiar el nombre
import EstablecimientoRegister from './pages/EstablecimientoSalud/EstablecimientoRegister'; // Cambiar el nombre
import EstablecimientoEdit from './pages/EstablecimientoSalud/EstablecimientoEdit'; // Cambiar el nombre
import EspecialidadesList from './pages/Especialidades/EspecialidadesList';
import EspecialidadCreate from './pages/Especialidades/EspecialidadCreate';
import EspecialidadEdit from './pages/Especialidades/EspecialidadEdit';

// Importar las páginas relacionadas con servicios
import ServiceList from './pages/Servicio/ServiceList';
import CreateService from './pages/Servicio/CreateService'; // Para la creación de un servicio
import EditService from './pages/Servicio/EditService'; // Para la edición de un servicio
import MiHospital from './pages/Mi_Hospital/Mi_Hospital'; // Página "Mi Hospital"
import AgregarEspecialidades from './pages/Mi_Hospital/add_specialtys';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
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

          <Route path="/miHospital" element={<MiHospital />} /> {/* Nueva ruta para "Mi Hospital" */}
          <Route path="/miHospital/agregar-especialidades" element={<AgregarEspecialidades />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
