import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useLayoutContext } from '@/context/Layout';
import { ConversationsProvider } from '@/context/Conversations';
import ConversationsList from '../conversation/ConversationsList';

export const ConversationsLayout = () => {
  const { sidebarOpened } = useLayoutContext();

  return (
    <ConversationsProvider>
      <Flex w='full' flex='1' minH='0' overflow='hidden'>
        <ConversationsList />
        <Flex
          w='full'
          flex='1'
          minH='0'
          minW='0'
          bg='bg.subtle'
          position='relative'
          transition='transform .3s'
          boxShadow={{ base: `lg`, lg: 'none' }}
          transform={
            sidebarOpened ? { base: `translateX(var(--chakra-sizes-72))`, lg: 'none' } : { base: `translateX(0)`, lg: 'none' }
          }
        >
          <Outlet />
        </Flex>
      </Flex>
    </ConversationsProvider>
  );
};
