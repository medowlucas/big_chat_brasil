import { Box } from '@mui/material';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { HamburgerMenu } from '../components/HamburgerMenu';

export const ChatPage = () => {
  return (
    <Box display="flex" height="100vh">
      <HamburgerMenu />
      <Box display="flex" flexDirection="column" flex={1} bgcolor="#121212">
        <ChatList />
        <ChatWindow />
      </Box>
    </Box>
  );
};
