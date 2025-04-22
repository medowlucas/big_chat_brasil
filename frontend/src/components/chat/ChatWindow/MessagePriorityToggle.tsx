import { ToggleButton, ToggleButtonGroup } from '@mui/material';

type MessagePriorityToggleProps = {
  priority: 'normal' | 'urgent';
  setPriority: (priority: 'normal' | 'urgent') => void;
};

const MessagePriorityToggle = ({ priority, setPriority }: MessagePriorityToggleProps) => {
  return (
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
};

export default MessagePriorityToggle;
