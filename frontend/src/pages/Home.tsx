import { Box, Typography, Paper, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { useEffect, useState } from 'react';
import { getClientProfile } from '../api/client';
import { Client } from '../models/client';

export const Home = () => {
  const { logout, token } = useAuth();
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const updatedClient = await getClientProfile(token??'');
        setCurrentClient(updatedClient);
      } catch (error) {
        console.error('Erro ao buscar cliente', error);
      }
    };

    fetchClient();
  }, []);

  return (
    <>
      <HamburgerMenu />
      <Box sx={{ p: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom>
            Bem-vindo(a), {currentClient?.name}!
          </Typography>

          <Typography variant="body1" color="textSecondary" gutterBottom>
            Documento: {currentClient?.documentId} ({currentClient?.documentType})
          </Typography>

          <Typography variant="body1" color="textSecondary" gutterBottom>
            Plano: {currentClient?.planType === 'prepaid' ? 'Pré-pago' : 'Pós-pago'}
          </Typography>

          {currentClient?.planType === 'prepaid' ? (
            <Typography variant="body1" color="success.main">
              Saldo: R${currentClient?.balance ?? '0.00'} 
            </Typography>
          ) : (
            <Typography variant="body1" color="info.main">
              Limite disponível: R${currentClient?.limit ?? '0.00'}
            </Typography>
          )}

          <Button
            onClick={logout}
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
          >
            Sair
          </Button>
        </Paper>
      </Box>
    </>
  );
};
