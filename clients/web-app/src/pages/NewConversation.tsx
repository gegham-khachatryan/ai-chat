import { useNavigate } from 'react-router-dom';
import { AIProvider } from '@/configs/aiProviders';
import { Flex } from '@chakra-ui/react';

import { Title, toaster } from '@/components/ui';

import * as ApiService from '@/api/api.service';
import MessageForm from '@/components/conversation/MessageForm';

const NewConversation = () => {
  const navigate = useNavigate();

  const onSubmit = async (text: string, aiProvider: AIProvider) => {
    try {
      const res = await ApiService.createConversations({ aiProvider });
      navigate(`/conversation/${res._id}`, { state: { text } });
    } catch (error: any) {
      toaster.create({ description: error.message, type: 'error' });
    }
  };

  return (
    <Flex w='full' flexDirection='column' gap='4' px='4' my='auto' alignItems='center'>
      <Title>What can I help with?</Title>
      <MessageForm onSubmit={onSubmit} />
    </Flex>
  );
};

export default NewConversation;
