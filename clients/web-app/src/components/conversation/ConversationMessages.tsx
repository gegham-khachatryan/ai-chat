import { useCallback, useEffect, useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import AnswerMessage from './AnswerMessage';
import MessageItem from './MessageItem';
import useConversationContext from '@/context/Conversation/useConversationContext';

const ConversationMessages = () => {
  const { messages } = useConversationContext();
  const scrollAnchor = useRef<HTMLDivElement>();

  const handleScroll = useCallback(() => {
    if (scrollAnchor.current) {
      scrollAnchor.current?.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    handleScroll();
  }, [messages, handleScroll]);

  return (
    <Flex
      px='4'
      py='20'
      gap='10'
      flex='1'
      minH='0'
      overflow='auto'
      flexDirection='column'
      css={{
        '&::-webkit-scrollbar': { w: '2' },
        '&::-webkit-scrollbar-track': { w: '6' },
        '&::-webkit-scrollbar-thumb': { borderRadius: '10', bg: `bg.emphasized` }
      }}
    >
      {messages.map((message) => (
        <MessageItem key={message._id} text={message.text} role={message.role} />
      ))}
      <AnswerMessage onUpdate={handleScroll} />
      <Box ref={scrollAnchor} />
    </Flex>
  );
};

export default ConversationMessages;
