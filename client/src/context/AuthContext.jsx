import { createContext, useEffect, useState } from 'react';
import AuthService from '../service/AuthService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

const login = async (email, password) => {
  try {
    const response = await AuthService.login(email, password);
    if (!response.data?.accessToken) {
      throw new Error("Сервер не вернул accessToken");
    }

    localStorage.setItem('token', response.data.accessToken);
    setIsAuthenticated(true);
    
    return response.data; 
  } catch (error) {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    throw error;
  }
};

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        await AuthService.refresh();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        toast.error("Сессия истекла. Пожалуйста, войдите снова.");
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  const logout = () => {
  localStorage.removeItem('token');
  setIsAuthenticated(false);
};

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    login,
    logout 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;