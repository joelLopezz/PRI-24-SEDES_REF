import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import Login from './pages/Login/login';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Ruta pública para el login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        path="/*"
        element={isAuthenticated ? <ProtectedRoutes /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
