import { Conversation, Message } from '@ai-chat/types';
import { createContext } from 'react';

interface IConversationContext {
  conversation: Conversation | undefined;
  messages: Message[];
  respondMessage: Message | null;
  onAbort: () => void;
  onAnsweringDone: (msg: string) => void;
  onMessageCreate: (msg: Message, isFirstMessage: boolean) => void;
  abortControllerRef: React.MutableRefObject<AbortController | undefined>;
}

const ConversationContext = createContext<IConversationContext | null>(null);

export default ConversationContext;
