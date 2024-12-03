import { useParams } from 'react-router-dom';
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import * as ApiService from '@/api/api.service';
import { Message } from '@ai-chat/types';

import { useConversationsContext } from '../Conversations';
import ConversationContext from './ConversationContext';

const ConversationProvider = ({ children }: PropsWithChildren) => {
  const updateNeeded = useRef('');
  const { conversationId } = useParams();
  const abortControllerRef = useRef<AbortController>();
  const { conversations, updateConversation } = useConversationsContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [respondMessage, setRespondMessage] = useState<Message | null>(null);
  const [params] = useState({ page: 0, limit: 20 });

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;
    try {
      const res = await ApiService.getMessages(conversationId, params);
      setMessages((prev) => (!params.page ? res.reverse() : [...prev, ...res]));
    } catch (error) {
      console.log(error);
    }
  }, [conversationId, params]);

  const fetchLastMessage = useCallback(async () => {
    if (!conversationId) return;
    const [lastMessage] = await ApiService.getMessages(conversationId, { page: 0, limit: 1 });

    setMessages((prev) => [...prev.filter((m) => m._id !== lastMessage._id), lastMessage]);
  }, [conversationId]);

  const onAnsweringDone = useCallback(
    async (msg: string) => {
      if (msg) {
        await fetchLastMessage();
        updateConversation(updateNeeded.current);
      }
      setRespondMessage(null);
    },
    [fetchLastMessage, updateConversation]
  );

  const onMessageCreate = useCallback((msg: Message, isFirst: boolean) => {
    setMessages((prev) => [...prev, msg]);
    updateNeeded.current = isFirst ? msg.conversationId : '';
    setRespondMessage(msg);
  }, []);

  const onAbort = useCallback(() => {
    abortControllerRef.current?.abort();
    setRespondMessage(null);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const conversation = useMemo(() => {
    return conversations.find((c) => c._id === conversationId);
  }, [conversations, conversationId]);

  return (
    <ConversationContext.Provider
      value={{ conversation, messages, respondMessage, abortControllerRef, onAnsweringDone, onAbort, onMessageCreate }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
