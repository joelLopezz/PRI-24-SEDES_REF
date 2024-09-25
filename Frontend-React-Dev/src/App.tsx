import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import HospitalList from './pages/hospitalList';
import HospitalRegister from './pages/HospitalRegister'; 
import HospitalEdit from './pages/HospitalEdit';// Importar la página Lista de Hospitales


const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/hospitales" element={<HospitalList />} />
          <Route path="/hospitales/registrar" element={<HospitalRegister />} />
          <Route path="/hospitales/editar/:id" element={<HospitalEdit />} />
          {/* Puedes agregar más rutas aquí para otras páginas */}
        </Routes>
      </Layout>
    </Router>
  );
};

// const App: React.FC = () => {
//   return (
//     <Layout>
//       {/* Aquí puedes poner el contenido que cambiará en cada ruta */}
//       <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
//       <p>This is the main dashboard area.</p>
//     </Layout>
//   );
// };

export default App;
