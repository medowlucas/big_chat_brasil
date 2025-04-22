import { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { toast } from 'sonner';
import { AuthRequest, AuthResponse } from '../models/auth';
import { loginRequest } from '../api/auth';

interface AuthContextProps {
  token: string | null;
  client: AuthResponse['client'] | null;
  login: (authRequest: AuthRequest) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [client, setClient] = useState<AuthResponse['client'] | null>(() => {
    const storedClient = localStorage.getItem('client');
    return storedClient ? JSON.parse(storedClient) : null;
  });

  const login = async (authRequest: AuthRequest): Promise<AuthResponse> => {
    try {
      const data = await loginRequest(authRequest);

      setToken(data.token);
      setClient(data.client);
      localStorage.setItem('token', data.token);
      localStorage.setItem('client', JSON.stringify(data.client));

      toast.success('Login bem-sucedido!');
      return data;
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique seus dados.');
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setClient(null);
    localStorage.removeItem('token');
    localStorage.removeItem('client');

    toast.success('Você foi desconectado com sucesso!');
  };

  const contextValue = useMemo(() => ({
    token,
    client,
    login,
    logout,
  }), [token, client]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
