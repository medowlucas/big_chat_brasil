import { Box } from '@mui/material';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { useState } from 'react';

export const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  return (
    <Box display="flex" height="100vh" overflow="hidden">
      <HamburgerMenu />
      <Box display="flex" flexDirection="column" flex={1} bgcolor="#121212">
        <Box sx={{ height: '270px', flexShrink: 0, overflow: 'hidden' }}>
          <ChatList onSelectConversation={setSelectedConversation} />
        </Box>
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <ChatWindow conversation={selectedConversation} />
        </Box>
      </Box>
    </Box>
  );
};
