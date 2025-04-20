import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Client {
  id: string;
  name: string;
  documentId: string;
  documentType: 'CPF' | 'CNPJ';
  balance?: number;
  limit?: number;
  planType: 'prepaid' | 'postpaid';
  active: boolean;
}

interface AuthContextProps {
  token: string | null;
  client: Client | null;
  login: (documentId: string, documentType: 'CPF' | 'CNPJ') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [client, setClient] = useState<Client | null>(() => {
    const storedClient = localStorage.getItem('client');
    return storedClient ? JSON.parse(storedClient) : null;
  });

  const login = async (documentId: string, documentType: 'CPF' | 'CNPJ') => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId, documentType }),
    });

    if (!response.ok) throw new Error('Login inválido');
    const data = await response.json();

    setToken(data.token);
    setClient(data.client);
    localStorage.setItem('token', data.token);
    localStorage.setItem('client', JSON.stringify(data.client));
  };

  const logout = () => {
    setToken(null);
    setClient(null);
    localStorage.removeItem('token');
    localStorage.removeItem('client');
  };

  return (
    <AuthContext.Provider value={{ token, client, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
