import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import HospitalList from './pages/Hospital/hospitalList';
import HospitalRegister from './pages/Hospital/HospitalRegister';
import HospitalEdit from './pages/Hospital/HospitalEdit';
import EspecialidadesList from './pages/Especialidades/EspecialidadesList';
import EspecialidadCreate from './pages/Especialidades/EspecialidadCreate';
import EspecialidadEdit from './pages/Especialidades/EspecialidadEdit';

// Importar las páginas relacionadas con servicios
import ServiceList from './pages/Servicio/ServiceList';
import CreateService from './pages/Servicio/CreateService'; // Para la creación de un servicio
import EditService from './pages/Servicio/EditService'; // Para la edición de un servicio

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Rutas de hospitales */}
          <Route path="/hospitales" element={<HospitalList />} />
          <Route path="/hospitales/registrar" element={<HospitalRegister />} />
          <Route path="/hospitales/editar/:id" element={<HospitalEdit />} />
          
          {/* Rutas de especialidades */}
          <Route path="/especialidades" element={<EspecialidadesList />} />
          <Route path="/especialidades/crear" element={<EspecialidadCreate />} />
          <Route path="/especialidades/editar/:id" element={<EspecialidadEdit />} />
          
          {/* Rutas de servicios */}
          <Route path="/servicios" element={<ServiceList />} />
          <Route path="/servicios/crear" element={<CreateService />} />
          <Route path="/servicios/editar/:id" element={<EditService />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
