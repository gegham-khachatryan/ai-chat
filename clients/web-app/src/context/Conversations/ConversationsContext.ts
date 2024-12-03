import { Conversation } from '@ai-chat/types';
import { createContext } from 'react';

interface IConversationsContext {
  conversations: Conversation[];
  updateConversation: (id: string) => void;
}

const ConversationsContext = createContext<IConversationsContext | null>(null);

export default ConversationsContext;
