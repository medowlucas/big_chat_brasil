import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster position="top-right" richColors expand />
    </ThemeProvider>
  </React.StrictMode>
);
