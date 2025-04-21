// ChatWindow.tsx
import { Box, TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';

export const ChatWindow = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    <Box flex={1} display="flex" flexDirection="column" height="100%">
      {/* Área de mensagens */}
      <Box flex={1} overflow="auto" p={2}>
        {messages.map((msg, idx) => (
          <Box key={idx} mb={1} bgcolor="#333" p={1} borderRadius={2}>
            {msg}
          </Box>
        ))}
      </Box>

      {/* Input */}
      <Box p={2} borderTop="1px solid #444">
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Digite uma mensagem"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="contained" onClick={handleSend}>
            Enviar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
