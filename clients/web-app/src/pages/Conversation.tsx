import { Flex } from '@chakra-ui/react';
import ConversationMessages from '@/components/conversation/ConversationMessages';
import { ConversationProvider } from '@/context/Conversation';
import ConversationForm from '@/components/conversation/ConversationForm';

const Conversation = () => {
  return (
    <ConversationProvider>
      <Flex flex='1' flexDirection='column' pb='4' mx='auto'>
        <ConversationMessages />
        <ConversationForm />
      </Flex>
    </ConversationProvider>
  );
};

export default Conversation;
