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
    <Flex flex='1' flexDirection='column' alignItems='stretch' gap='10' overflow='auto' py='20' minH='0'>
      {messages.map((message) => (
        <MessageItem key={message._id} text={message.text} role={message.role} />
      ))}
      <AnswerMessage onUpdate={handleScroll} />
      <Box ref={scrollAnchor} />
    </Flex>
  );
};

export default ConversationMessages;
