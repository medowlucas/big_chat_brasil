import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export const MessageInput = () => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      console.log('Mensagem enviada:', text);
      setText('');
    }
  };

  return (
    <Box display="flex" p={2} bgcolor="#1c1c1c">
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite uma mensagem..."
        sx={{ backgroundColor: 'white', borderRadius: 1 }}
      />
      <IconButton onClick={handleSend} color="primary" sx={{ ml: 1 }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};
