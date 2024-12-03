import { Conversation } from '@ai-chat/types';
import * as ApiService from '@/api/api.service';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import ConversationsContext from './ConversationsContext';

const ConversationsProvider = ({ children }: PropsWithChildren) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const fetchConversations = useCallback(async () => {
    try {
      const res = await ApiService.getConversations();
      setConversations(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateConversation = useCallback(async (conversationId: string) => {
    if (!conversationId) return;
    try {
      const res = await ApiService.getConversation(conversationId);
      setConversations((prev) => [res, ...prev.filter((c) => c._id !== res._id)]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return <ConversationsContext.Provider value={{ conversations, updateConversation }}>{children}</ConversationsContext.Provider>;
};

export default ConversationsProvider;
