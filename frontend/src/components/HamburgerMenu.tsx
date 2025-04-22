import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logout } from '@mui/icons-material';

export const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const { logout } = useAuth();

  return (
    <header style={{ display: 'flex', alignItems: 'top', padding: '1rem' }}>
        <Box>
            <IconButton onClick={toggleDrawer} color="inherit">
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
            <List sx={{ width: 250 }}>
                <ListItem onClick={() => handleNavigation('/')} sx={{ cursor: 'pointer' }}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Início" />
                </ListItem>
                <ListItem onClick={() => handleNavigation('/chat')} sx={{ cursor: 'pointer' }}>
                    <ListItemIcon><ChatIcon /></ListItemIcon>
                    <ListItemText primary="Conversas" />
                </ListItem>
                <ListItem sx={{ cursor: 'not-allowed' }}>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Configurações (em breve)" />
                </ListItem>
                <ListItem
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }} 
                    sx={{ cursor: 'pointer' }}
                >
                    <ListItemIcon><Logout /></ListItemIcon>
                    <ListItemText primary="Sair" />
                </ListItem>
            </List>
            </Drawer>
        </Box>
    </header>
  );
};
