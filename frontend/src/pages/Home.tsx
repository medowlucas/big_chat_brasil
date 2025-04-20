import { Box, Typography, Paper, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { client, logout } = useAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo(a), {client?.name}!
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Documento: {client?.documentId} ({client?.documentType})
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Plano: {client?.planType === 'prepaid' ? 'Pré-pago' : 'Pós-pago'}
        </Typography>

        {client?.planType === 'prepaid' ? (
          <Typography variant="body1" color="success.main">
            Saldo: R${client?.balance ?? '0.00'} 
          </Typography>
        ) : (
          <Typography variant="body1" color="info.main">
            Limite disponível: R${client?.limit ?? '0.00'}
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
  );
};
