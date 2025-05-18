import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '@/services/api';
import { secureStore } from '@/services/secureStore';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  branch_id: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup?: (data: { name: string; email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await secureStore.getItem('user');
        const storedToken = await secureStore.getItem('token');
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored user:', error);
      }
    };

    loadStoredUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.login(email, password);
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        const { token, user } = response.data;
        
        await secureStore.setItem('token', token);
        await secureStore.setItem('user', JSON.stringify(user));
        
        setUser(user);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await secureStore.removeItem('token');
      await secureStore.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}