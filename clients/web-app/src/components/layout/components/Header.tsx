import { Link } from 'react-router-dom';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { LuFileEdit, LuLogOut, LuPanelLeft } from 'react-icons/lu';
import { useAuthContext } from '@/context/Auth';
import { ColorModeButton } from '@/components/ui';
import { useLayoutContext } from '@/context/Layout';

export const Header = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const { toggleSidebar, closeSidebar } = useLayoutContext();

  return (
    <Flex
      px='4'
      top='0'
      w='full'
      right='0'
      gap='2'
      minH='14'
      as='header'
      bgGradient='to-b'
      alignItems='center'
      gradientFrom='bg.subtle'
      gradientTo='transparent'
      position='absolute'
      zIndex='docked'
      bgSize='100% 160%'
    >
      {isAuthenticated ? (
        <>
          <IconButton variant='ghost' hideFrom='lg' onClick={toggleSidebar}>
            <LuPanelLeft />
          </IconButton>
          <IconButton asChild variant='ghost' mr='auto' onClick={closeSidebar}>
            <Link to='/new'>
              <LuFileEdit />
            </Link>
          </IconButton>
          <IconButton variant='ghost' onClick={logout}>
            <LuLogOut />
          </IconButton>
        </>
      ) : (
        <Box mr='auto' />
      )}
      <ColorModeButton />
    </Flex>
  );
};
