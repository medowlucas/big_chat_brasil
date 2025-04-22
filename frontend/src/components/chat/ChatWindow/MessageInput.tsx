import { TextField, Button, Stack, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';

type MessageInputProps = {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  getCostLabel: (priority: 'normal' | 'urgent') => string;
  priority: 'normal' | 'urgent';
  setPriority: (priority: 'normal' | 'urgent') => void;
};

const MessageInput = ({
  input,
  setInput,
  handleSend,
  getCostLabel,
  priority,
  setPriority,
}: MessageInputProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const MessagePriorityToggle = () => (
    <ToggleButtonGroup
      value={priority}
      exclusive
      onChange={(_, val) => val && setPriority(val)}
      size="small"
      color="primary"
    >
      <ToggleButton value="normal">Normal</ToggleButton>
      <ToggleButton
        value="urgent"
        sx={{
          '&.Mui-selected': {
            backgroundColor: '#d32f2f',
            color: 'white',
            borderColor: '#d32f2f',
          },
          '&:hover': {
            backgroundColor: '#b71c1c',
            color: 'white',
            borderColor: '#d32f2f',
          },
        }}
      >
        Urgente
      </ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={isMobile ? 2 : 1}
      alignItems={isMobile ? 'center' : 'center'}
      width="100%"
    >
      <MessagePriorityToggle />

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

      <Button
        variant="contained"
        onClick={handleSend}
        fullWidth={isMobile}
        sx={{ whiteSpace: 'nowrap' }}
      >
        {getCostLabel(priority)}
      </Button>
    </Stack>
  );
};

export default MessageInput;
