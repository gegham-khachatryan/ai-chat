import { Link } from 'react-router-dom';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { useAuthContext } from '@/context/Auth';
import { ColorModeButton } from '@/components/ui';
import { LuFileEdit, LuLogOut } from 'react-icons/lu';

export const Header = () => {
  const { isAuthenticated, logout } = useAuthContext();
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
    >
      {isAuthenticated ? (
        <>
          <IconButton asChild variant='ghost' mr='auto'>
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
