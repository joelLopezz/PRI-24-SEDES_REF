// src/Context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  role: string;
  usuarioID: number | null;
  establecimientoID: number | null;
  isAuthenticated: boolean;
  hasPermission: (allowedRoles: string[]) => boolean;
  setRole: (newRole: string) => void;
  setUsuarioID: (id: number | null) => void;
  setEstablecimientoID: (id: number | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

  const [role, setRole] = useState<string>(storedUser?.rol || '');
  const [usuarioID, setUsuarioID] = useState<number | null>(storedUser?.usuario_ID || null);
  const [establecimientoID, setEstablecimientoID] = useState<number | null>(storedUser?.establecimiento_id || null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!storedUser);

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
