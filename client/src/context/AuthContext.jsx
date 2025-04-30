import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga para verificar el token
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Verificar el token con el backend
          const res = await api.get("/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user); // Establecer el usuario autenticado
        } catch (error) {
          console.error('Error al verificar el token:', error);
          logout(); // Si el token no es válido, cerrar sesión
        }
      }
      setLoading(false); // Finalizar la carga
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token); // Guardar el token en localStorage
        setUser(res.data.user); // Establecer el usuario autenticado
        navigate('/dashboard'); // Redirigir al dashboard
      } else {
        throw new Error('No se recibió token');
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await api.post('/auth/register', { username, email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token); // Guardar el token en localStorage
        setUser(res.data.user); // Establecer el usuario autenticado
        navigate('/login'); // Redirigir al dashboard
      } else {
        throw new Error('No se recibió token');
      }
    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message);
      throw error;
    }
  };

  const loginWithSocial = (token) => {
    localStorage.setItem('token', token); // Guardar el token en localStorage
    setUser({ token }); // Puedes agregar más datos del usuario si están disponibles
    navigate('/dashboard'); // Redirigir al dashboard
  };

  const logout = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    setUser(null); // Limpiar el estado del usuario
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithSocial, logout }}>
      {!loading && children} {/* Renderizar los hijos solo cuando termine la carga */}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);