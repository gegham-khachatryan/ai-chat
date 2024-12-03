import { useForm } from 'react-hook-form';
import { LuListMinus, LuStopCircle } from 'react-icons/lu';
import { useState, KeyboardEvent } from 'react';
import { AIProvider, AIProviders } from '@/configs/aiProviders';
import { Flex, Textarea, Box, IconButton } from '@chakra-ui/react';

import AIProvidersDropdown from './AIProvidersDropdown';

interface FormValues {
  text: string;
}
interface MessageFormProps {
  isWaiting?: boolean;
  initialProvider?: AIProvider;
  onAbort?: () => void;
  onSubmit: (text: string, aiProvider: AIProvider) => void;
}

const MessageForm = ({ isWaiting, initialProvider, onSubmit, onAbort }: MessageFormProps) => {
  const { register, reset, handleSubmit } = useForm<FormValues>();
  const [aiProvider, setAiProvider] = useState(initialProvider || AIProvider.gemini);

  const onValidSubmit = handleSubmit(async (data) => {
    const text = data.text.trim();
    if (!text) return;
    onSubmit(text, aiProvider);
    reset();
  });

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onValidSubmit();
    }
  };

  return (
    <Flex position='relative' w='full' maxW='4xl' mx='auto' as='form' onSubmit={onValidSubmit}>
      <Textarea
        p='4'
        rows={3}
        resize='none'
        bg='bg.muted'
        rounded='3xl'
        paddingBottom='12'
        onKeyDown={onKeyDown}
        placeholder={`Message ${[AIProviders[aiProvider].name]}`}
        {...register('text')}
      />
      <Box position='absolute' left='3' bottom='3'>
        <AIProvidersDropdown readonly={!!initialProvider} value={aiProvider} onChange={setAiProvider} />
      </Box>
      {isWaiting ? (
        <IconButton variant='solid' rounded='full' position='absolute' right='3' bottom='3' size='sm' onClick={onAbort}>
          <LuStopCircle />
        </IconButton>
      ) : (
        <IconButton variant='solid' rounded='full' position='absolute' right='3' bottom='3' size='sm' type='submit'>
          <LuListMinus />
        </IconButton>
      )}
    </Flex>
  );
};
export default MessageForm;
