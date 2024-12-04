import type { PropsWithChildren } from 'react';
import { Flex } from '@chakra-ui/react';
import { Toaster } from '@/components/ui';
import { LayoutProvider } from '@/context/Layout';

import { Header } from './components/Header';

interface LayoutProps extends PropsWithChildren {}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutProvider>
      <Flex direction='column' h='100vh' w='full' transition='0.5s ease-out'>
        <Header />
        <Flex flex='1' as='main' minH='0' direction='column' alignItems='stretch'>
          {children}
        </Flex>
        <Toaster />
      </Flex>
    </LayoutProvider>
  );
};
