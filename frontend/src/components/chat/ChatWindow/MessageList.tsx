import { Box, Typography } from '@mui/material';
import { MessageResponse } from '../../../models/messsage';
import FlagIcon from '@mui/icons-material/Flag';

type MessageListProps = {
  messages: MessageResponse[];
  loading: boolean;
  error: string | null;
};

const MessageList = ({ messages, loading, error }: MessageListProps) => {
  if (loading) {
    return <Typography color="gray">Carregando mensagens...</Typography>;
  }

  if (error) {
    return <Typography color="red">{error}</Typography>;
  }

  if (messages.length === 0) {
    return <Typography color="gray">Sem mensagens ainda</Typography>;
  }

  return (
    <Box flex={1} overflow="auto" p={2}>
      {messages.map((msg) => {
        const isUser = msg.sentBy.type === 'user';
        const time = new Date(msg.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <Box
            key={msg.id}
            mb={1}
            display="flex"
            flexDirection="column"
            gap={0.5}
            sx={{
              alignItems: isUser ? 'flex-end' : 'flex-start',
              marginLeft: isUser ? 'auto' : undefined,
              marginRight: isUser ? undefined : 'auto',
            }}
          >
            <Box
              bgcolor={isUser ? '#1976d2' : '#333'}
              p={1.5}
              borderRadius={2}
              color="white"
              maxWidth="70%"
              minWidth="50%"
              display="flex"
              flexDirection="column"
              gap={1}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <FlagIcon fontSize="small" color={msg.priority === 'urgent' ? 'error' : 'disabled'} />
                <Typography variant="body2">{msg.content}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" color="#333">
                  {msg.status}
                </Typography>
                <Typography variant="caption" color="#333">
                  {time}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MessageList;
