// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  role: string;
  usuarioID: number | null;
  establecimientoID: number | null;
  isAuthenticated: boolean;
  hasPermission: (allowedRoles: string[]) => boolean;
  setRole: (newRole: string) => void;
  setUsuarioID: (id: number) => void;
  setEstablecimientoID: (id: number) => void;
  setIsAuthenticated: (value: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [role, setRole] = useState<string>('');
  const [usuarioID, setUsuarioID] = useState<number | null>(null);
  const [establecimientoID, setEstablecimientoID] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.rol) {
      setRole(user.rol);
      setUsuarioID(user.usuario_ID);
      setEstablecimientoID(user.establecimiento_id);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const hasPermission = (allowedRoles: string[]) => allowedRoles.includes(role);

  return (
    <AuthContext.Provider
      value={{
        role,
        usuarioID,
        establecimientoID,
        isAuthenticated,
        hasPermission,
        setRole,
        setUsuarioID,
        setEstablecimientoID,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
