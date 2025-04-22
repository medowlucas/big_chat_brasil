import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { getConversations, createConversation } from '../../api/conversation';
import { ConversationResponse } from '../../models/conversation';

type ChatListProps = {
  onSelectConversation: (conversation: ConversationResponse) => void;
};

export const ChatList = ({ onSelectConversation }: ChatListProps) => {
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clientRaw = localStorage.getItem('client');
  const client = clientRaw ? JSON.parse(clientRaw) : null;
  const clientId = client?.id;

  const fetchConversations = async () => {
    try {
      const data = await getConversations(clientId);
      setConversations(data);
    } catch (err) {
      setError('Erro ao carregar conversas');
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateConversation = async () => {
    try {
      await createConversation(clientId);
      fetchConversations();
    } catch (err) {
      console.error('Erro ao criar nova conversa:', err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  if (loading) {
    return (
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#1e1e1e"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box height="100%" bgcolor="#1e1e1e" color="white" p={2} display="flex" flexDirection="column" overflow="hidden">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Conversas</Typography>
        <Button variant="contained" color="primary" onClick={handleCreateConversation}>
          Nova conversa
        </Button>
      </Box>

      {conversations.length === 0 ? (
        <Typography>Sem conversas disponíveis.</Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={2} overflow="auto" sx={{ pb: 1 }}>
          {conversations.map((conv) => (
            <Box
              key={conv.id}
              p={2}
              minWidth="220px"
              bgcolor="#2e2e2e"
              borderRadius="8px"
              boxShadow={1}
              flexShrink={0}
              sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#3e3e3e' } }}
              onClick={() => onSelectConversation(conv)}
            >
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {conv.recipientName ?? 'Sem nome'}
              </Typography>
              <Typography variant="body2" color="gray" noWrap>
                {conv.lastMessageContent ?? 'Sem mensagem'}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
