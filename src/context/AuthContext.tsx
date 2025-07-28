import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';
import type { User } from '../types/User'; // Usamos el tipo definido previamente
 // Usamos el tipo definido previamente

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // ⛽ Si hay token guardado, obtenemos el usuario
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/me')
        .then(res => setUser(res.data))
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        });
    }
  }, [token]);

  // 🔐 Función de login
  const login = async (email: string, password: string) => {
    const res = await api.post('/login', { email, password });
    const accessToken = res.data.access_token;

    setToken(accessToken);
    localStorage.setItem('token', accessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const userRes = await api.get('/me');
    setUser(userRes.data);
  };

  // 🔓 Función de logout
  const logout = () => {
    api.post('/logout'); // opcional
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

