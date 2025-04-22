import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useMessages } from '../../hooks/useMessages';
import { MessageResponse } from '../../models/messsage';

type ChatWindowProps = {
  conversation: {
    id: string;
    recipientName: string;
  } | null;
};

export const ChatWindow = ({ conversation }: ChatWindowProps) => {
  const [input, setInput] = useState('');
  
  // Hook de mensagens
  const {
    messages,
    loading,
    error,
    sendMessage,
  } = useMessages(conversation?.id ?? '');

  const handleSend = async () => {
    if (!input.trim() || !conversation) return;

    await sendMessage({
      content: input,
      priority: 'normal',
    });

    setInput('');
  };

  if (!conversation) {
    return (
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" color="gray">
        <Typography variant="h6">Selecione uma conversa</Typography>
      </Box>
    );
  }

  return (
    <Box flex={1} display="flex" flexDirection="column" height="100%">
      <Box p={2} borderBottom="1px solid #444" bgcolor="#1e1e1e">
        <Typography variant="h6" color="white">
          {conversation.recipientName}
        </Typography>
      </Box>

      <Box flex={1} overflow="auto" p={2}>
        {(() => {
          if (loading) {
            return <Typography color="gray">Carregando mensagens...</Typography>;
          }
          if (error) {
            return <Typography color="red">{error}</Typography>;
          }
          if (messages.length === 0) {
            return <Typography color="gray">Sem mensagens ainda</Typography>;
          }
          return messages.map((msg: MessageResponse) => (
            <Box
              key={msg.id}
              mb={1}
              alignSelf={msg.sentBy.type === 'client' ? 'flex-end' : 'flex-start'}
              bgcolor={msg.sentBy.type === 'client' ? '#1976d2' : '#333'}
              p={1}
              borderRadius={2}
              color="white"
              maxWidth="70%"
            >
              <Typography variant="body2">{msg.content}</Typography>
              <Typography variant="caption" color="gray">
                {msg.status}
              </Typography>
            </Box>
          ));
        })()}
      </Box>

      <Box p={2} borderTop="1px solid #444">
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Digite uma mensagem"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            InputProps={{
              style: { color: 'white', backgroundColor: '#2a2a2a' },
            }}
          />
          <Button variant="contained" onClick={handleSend}>
            Enviar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
