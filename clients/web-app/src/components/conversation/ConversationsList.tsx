import { AIProvider, AIProviders } from '@/configs/aiProviders';
import { useConversationsContext } from '@/context/Conversations';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ConversationsList = () => {
  const { conversations } = useConversationsContext();
  return (
    <Box
      py='6'
      pt='14'
      w='72'
      minH='0'
      top='0'
      bottom='0'
      bg='bg.muted'
      overflow='auto'
      borderRight='solid 1px'
      borderColor='border'
      css={{
        '&::-webkit-scrollbar': { w: '2' },
        '&::-webkit-scrollbar-track': { w: '6' },
        '&::-webkit-scrollbar-thumb': { borderRadius: '10', bg: `bg.emphasized` }
      }}
    >
      {conversations.map((c) => (
        <Flex asChild flexDirection='column' px='4' py='2' mb='2' key={c._id}>
          <Link to={`/conversation/${c._id}`}>
            <Text>{c.title}</Text>
            <Text color='GrayText'>{AIProviders[c.aiProvider as AIProvider].name}</Text>
          </Link>
        </Flex>
      ))}
    </Box>
  );
};

export default ConversationsList;
