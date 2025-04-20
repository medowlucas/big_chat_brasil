import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [documentId, setDocumentId] = useState('');
  const [documentType, setDocumentType] = useState<'CPF' | 'CNPJ'>('CPF');
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(documentId, documentType);
      navigate('/');
    } catch (err) {
      setError('Erro ao fazer login. Verifique seus dados.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Digite seu CPF ou CNPJ"
        value={documentId}
        onChange={(e) => setDocumentId(e.target.value)}
        required
      />

      <select value={documentType} onChange={(e) => setDocumentType(e.target.value as 'CPF' | 'CNPJ')}>
        <option value="CPF">CPF</option>
        <option value="CNPJ">CNPJ</option>
      </select>

      <button type="submit">Entrar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};
