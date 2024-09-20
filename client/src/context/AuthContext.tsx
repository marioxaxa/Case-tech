import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// Define os tipos para o contexto
interface AuthContextType {
  auth: AuthState;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// Define os tipos para o estado de autenticação
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

// Define os tipos para o usuário
interface User {
  username: string;
  email: string;
  manager: boolean;
}

// Criação do contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente provedor do contexto
export const AuthenticationContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      setAuth((prevState) => ({ ...prevState, isAuthenticated: true }));
    }
  }, [auth.token]);

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    setAuth({ token, isAuthenticated: true, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
