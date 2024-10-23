import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout'; // Layout con Sidebar, NavBar y Footer
import Login from './pages/Login/login'; // Página de Login

// Páginas relacionadas con Personal de Salud
import PersonalSaludList from './pages/personal_salud/PersonalSaludList';
import PersonalSaludCreate from './pages/personal_salud/PersonalSaludCreate';
import PersonalSaludEdit from './pages/personal_salud/PersonalSaludEdit';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir a login cuando se accede a la raíz */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta exclusiva para el login sin el Layout */}
        <Route path="/login" element={<Login />} />

        {/* Rutas que utilizan el Layout */}
        <Route element={<Layout />}>
          {/* Rutas de Personal de Salud */}
          <Route path="/personal-salud" element={<PersonalSaludList />} />
          <Route path="/personal-salud/create" element={<PersonalSaludCreate isEditing={false} />} />
          <Route path="/personal-salud/edit/:id" element={<PersonalSaludEdit isEditing={true} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
