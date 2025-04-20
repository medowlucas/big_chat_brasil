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
} from '@mui/material';

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
              onChange={(e) => setDocumentId(e.target.value)}
              required
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
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
