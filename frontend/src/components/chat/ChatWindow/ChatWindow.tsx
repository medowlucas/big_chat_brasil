import { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useMessages } from '../../../hooks/useMessages';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

type ChatWindowProps = {
  conversation: {
    id: string;
    recipientName: string;
  } | null;
};

const ChatWindow = ({ conversation }: ChatWindowProps) => {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');

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
      priority,
    });

    setInput('');
  };

  const getCostLabel = (priority: 'normal' | 'urgent') =>
    priority === 'urgent' ? 'Enviar (R$0,50)' : 'Enviar (R$0,25)';

  if (!conversation) {
    return (
      <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CardContent>
          <Typography variant="h6" color="gray">
            Selecione uma conversa
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ borderBottom: '1px solid #444', bgcolor: '#1e1e1e' }}>
        <Typography variant="h6" color="white">
          {conversation.recipientName}
        </Typography>
      </CardContent>

      <Box flex={1} overflow="auto">
        <MessageList messages={messages} loading={loading} error={error} />
      </Box>

      <Box p={2} borderTop="1px solid #444">
        <MessageInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          getCostLabel={getCostLabel}
          priority={priority}
          setPriority={setPriority}
        />
      </Box>
    </Card>
  );
};

export default ChatWindow;
