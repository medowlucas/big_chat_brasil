import { Box, List, ListItem, ListItemText } from '@mui/material';

export const ChatList = () => {
  const mockConversations = [
    { id: '1', title: 'Suporte' },
    { id: '2', title: 'Financeiro' },
  ];

  return (
    <Box bgcolor="#1e1e1e" color="white" p={2} overflow="auto">
      <h3>Conversas</h3>
      <List>
        {mockConversations.map((conv) => (
          <ListItem key={conv.id}>
            <ListItemText primary={conv.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
