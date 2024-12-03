import { AIProvider, AIProviders } from '@/configs/aiProviders';
import { useConversationsContext } from '@/context/Conversations';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ConversationsList = () => {
  const { conversations } = useConversationsContext();
  return (
    <Box borderRight='solid 1px' borderColor='border' bg='bg.muted' py='6' pt='14' overflow='auto' w='60' minH='0'>
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
