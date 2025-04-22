import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import { AuthRequest } from '../models/auth';

export const Login = () => {
  const [documentId, setDocumentId] = useState('');
  const [documentType, setDocumentType] = useState<'CPF' | 'CNPJ'>('CPF');
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDocumentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedInput = e.target.value.replace(/\D/g, '');

    setDocumentId(cleanedInput);
  };

  const validateDocument = (docId: string, docType: 'CPF' | 'CNPJ') => {
    if (docType === 'CPF') {
      return docId.length === 11;
    } else {
      return docId.length === 14;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDocument(documentId, documentType)) {
      setError('CPF ou CNPJ inválido. Verifique o número.');
      return;
    }

    setError('');
    setLoading(true);

    const authRequest: AuthRequest = { documentId, documentType };

    try {
      await login(authRequest);
      navigate('/');
    } catch (err) {
      setError('Erro ao fazer login. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
        p: 2,
      }}
    >
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              select
              label="Tipo de documento"
              fullWidth
              margin="normal"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as 'CPF' | 'CNPJ')}
            >
              <MenuItem value="CPF">CPF</MenuItem>
              <MenuItem value="CNPJ">CNPJ</MenuItem>
            </TextField>

            <TextField
              label="CPF ou CNPJ"
              fullWidth
              margin="normal"
              value={documentId}
              onChange={handleDocumentIdChange}
              required
              inputProps={{
                maxLength: documentType === 'CPF' ? 11 : 14,
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
