import { Conversation, ListRequestParams, Message } from '@ai-chat/types';
import { AIProvider } from '@/configs/aiProviders';
import { apiServiceInstance } from '.';

export function createConversations(body: { aiProvider: AIProvider }): Promise<Conversation> {
  return apiServiceInstance.post('/conversations', body);
}

export function getConversations(): Promise<Conversation[]> {
  return apiServiceInstance.get('/conversations');
}

export function getConversation(conversationId: string): Promise<Conversation> {
  return apiServiceInstance.get(`/conversations/${conversationId}`);
}

export function getMessages(conversationId: string, params: ListRequestParams): Promise<Message[]> {
  return apiServiceInstance.get(`/messages/${conversationId}`, { params });
}

export function createMessage(conversationId: string, body: { text: string }): Promise<Message> {
  return apiServiceInstance.post(`/messages/${conversationId}`, body);
}

export function register(body: { username: string; password: string }) {
  return apiServiceInstance.post('/register', body);
}
