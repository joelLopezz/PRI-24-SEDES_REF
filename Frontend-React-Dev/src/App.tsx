import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './pages/Login/login'; // Página de inicio de sesión

// // Páginas relacionadas con Personal de Salud
// import PersonalSaludList from './pages/personal_salud/PersonalSaludList';
// import PersonalSaludCreate from './pages/personal_salud/PersonalSaludCreate';
// import PersonalSaludEdit from './pages/personal_salud/PersonalSaludEdit';

// Páginas relacionadas con Camas
import CamaList from './pages/Cama/CamaList';
// import CamaCreate from './pages/Cama/CamaCreate';
// import CamaEdit from './pages/Cama/CamaEdit';

import EspecialidadesReport from './reporte/especialidadReport';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir a login cuando se accede a la raíz */}
        {/* <Route path="/" element={<Navigate to="/cama" />} />  */}

        {/* Ruta exclusiva para el login */}
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Rutas de Camas */}
         <Route path="/cama" element={<CamaList />} />
        {/* <Route path="/cama/create" element={<CamaCreate />} />
        <Route path="/cama/edit/:id" element={<CamaEdit />} /> */}
         <Route path="/reporte-especialidades" element={<EspecialidadesReport />} /> 

        {/* Rutas de Personal de Salud */}
        {/* <Route path="/personal-salud" element={<PersonalSaludList />} />
        <Route path="/personal-salud/create" element={<PersonalSaludCreate isEditing={false} />} />
        <Route path="/personal-salud/edit/:id" element={<PersonalSaludEdit isEditing={true} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;





// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Layout from './Components/Layout/Layout'; // Layout con Sidebar, NavBar y Footer
// import Login from './pages/Login/login'; // Página de 


// // Páginas relacionadas con Personal de Salud
// import PersonalSaludList from './pages/personal_salud/PersonalSaludList';
// import PersonalSaludCreate from './pages/personal_salud/PersonalSaludCreate';
// import PersonalSaludEdit from './pages/personal_salud/PersonalSaludEdit';

// // Páginas relacionadas con Camas
// import CamaList from './pages/Cama/CamaList';
// import CamaCreate from './pages/Cama/CamaCreate';
// import CamaEdit from './pages/Cama/CamaEdit';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* // Redirigir a login cuando se accede a la raíz  */}
//         <Route path="/" element={<Navigate to="/login" />} />

//         {/* Ruta exclusiva para el login sin el Layout */}
//         <Route path="/login" element={<Login />} /> 

//         {/* Rutas que utilizan el Layout  */}
//         <Route element={<Layout />}>
//           {/* Rutas de Personal de Salud */}
//           <Route path="/personal-salud" element={<PersonalSaludList />} />
//           <Route path="/personal-salud/create" element={<PersonalSaludCreate isEditing={false} />} />
//           <Route path="/personal-salud/edit/:id" element={<PersonalSaludEdit isEditing={true} />} />

//            {/* Rutas de Camas */}
//           <Route path="/cama" element={<CamaList />} />
//           <Route path="/cama/create" element={<CamaCreate />} />
//           <Route path="/cama/edit/:establecimientoId/:especialidadId/:servicioId" element={<CamaEdit />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
