export enum MessageRole {
  user = 'user',
  assistant = 'assistant'
}

export interface IHistoryMessage {
  role: MessageRole;
  text: string;
}

export const OpenAiRoleMap: Record<MessageRole, 'user' | 'assistant'> = {
  [MessageRole.user]: 'user',
  [MessageRole.assistant]: 'assistant'
};

export const GeminiRoleMap: Record<MessageRole, 'user' | 'model'> = {
  [MessageRole.user]: 'user',
  [MessageRole.assistant]: 'model'
};
