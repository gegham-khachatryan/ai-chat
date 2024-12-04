import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as ApiService from '@/api/api.service';
import MessageForm from './MessageForm';
import { toaster } from '../ui';
import { useConversationContext } from '@/context/Conversation';
import { useCallback, useEffect } from 'react';
import { AIProvider } from '@/configs/aiProviders';
import { Box } from '@chakra-ui/react';

const ConversationForm = () => {
  const { conversationId } = useParams();
  const { state } = useLocation();
  const { conversation, respondMessage, onAbort, onMessageCreate } = useConversationContext();
  const navigate = useNavigate();

  const createMessage = useCallback(
    async (text: string, provider?: AIProvider) => {
      if (!conversationId) {
        throw new Error('Conversation id is required');
      }
      try {
        const res = await ApiService.createMessage(conversationId, { text });
        const isFirstMessage = !provider;
        onMessageCreate(res, isFirstMessage);
      } catch (error: any) {
        toaster.create({ description: error.message, type: 'error' });
      }
    },
    [conversationId, onMessageCreate]
  );

  useEffect(() => {
    if (state?.text) {
      createMessage(state.text);
      navigate('', { state: null, replace: true });
    }
  }, [state, createMessage, navigate]);

  return (
    <Box px='4'>
      <MessageForm
        key={conversation?._id}
        isWaiting={!!respondMessage}
        initialProvider={conversation?.aiProvider}
        onAbort={onAbort}
        onSubmit={createMessage}
      />
    </Box>
  );
};

export default ConversationForm;
