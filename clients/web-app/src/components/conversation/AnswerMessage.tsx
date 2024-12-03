import { useEffect, useLayoutEffect, useState } from 'react';
import { useAuthContext } from '@/context/Auth';
import MessageItem from './MessageItem';
import { API_BASE_URL, getStreamHeaders } from '@/api';
import { toaster } from '../ui';
import { useConversationContext } from '@/context/Conversation';

interface AnswerMessageProps {
  onUpdate: () => void;
}

const AnswerMessage = ({ onUpdate }: AnswerMessageProps) => {
  const { respondMessage, abortControllerRef, onAnsweringDone } = useConversationContext();
  const [answer, setAnswer] = useState('');

  const { token } = useAuthContext();

  useEffect(() => {
    const fetchStreamData = async () => {
      if (!respondMessage) return;
      setAnswer('');
      let answer = '';
      try {
        const headers = getStreamHeaders();
        if (!headers) {
          throw new Error('Authorization failed');
        }
        abortControllerRef.current = new AbortController();
        const body = JSON.stringify({ text: respondMessage.text, conversationId: respondMessage.conversationId });
        const response = await fetch(`${API_BASE_URL}/ai/respond`, {
          body,
          headers,
          method: 'POST',
          signal: abortControllerRef.current.signal
        });

        if (!response.ok || !response.body) {
          throw new Error(response.statusText);
        }

        const decoder = new TextDecoder();
        const reader = response.body.getReader();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const decodedTxt = decoder.decode(value, { stream: true });
          answer += decodedTxt;
          setAnswer(answer);
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          answer = '';
          console.log('Message aborted');
        } else {
          toaster.create({ description: error.message, type: 'error' });
        }
      } finally {
        setAnswer('');
        onAnsweringDone(answer);
      }
    };

    fetchStreamData();
  }, [respondMessage, token, onUpdate, onAnsweringDone, abortControllerRef]);

  useLayoutEffect(() => {
    onUpdate();
  }, [answer, onUpdate]);

  return respondMessage ? <MessageItem text={answer} /> : null;
};

export default AnswerMessage;
