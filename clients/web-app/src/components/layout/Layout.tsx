import type { PropsWithChildren } from 'react';
import { Flex } from '@chakra-ui/react';
import { Toaster } from '@/components/ui';

import { Header } from './components/Header';

interface LayoutProps extends PropsWithChildren {}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex direction='column' h='100vh' wrap='wrap' transition='0.5s ease-out'>
      <Header />
      <Flex flex='1' as='main' minH='0' direction='column' alignItems='stretch'>
        {children}
      </Flex>
      <Toaster />
    </Flex>
  );
};
