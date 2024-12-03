import { ConversationsProvider } from '@/context/Conversations';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import ConversationsList from '../conversation/ConversationsList';

export const ConversationsLayout = () => {
  return (
    <ConversationsProvider>
      <Flex w='full' flex='1' minH='0'>
        <ConversationsList />
        <Flex w='full' flex='1' minH='0'>
          <Outlet />
        </Flex>
      </Flex>
    </ConversationsProvider>
  );
};
