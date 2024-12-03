import { AIProvider } from '@ai-chat/consts';
import { IHistoryMessage } from './types';
import OpenAI from './openai';
import Gemini from './gemini';

const gemini = new Gemini();
const openai = new OpenAI();

export const getAIResponse = (
  aiProvider: string,
  message: string,
  history: IHistoryMessage[],
  write: (str: string) => void,
  setController: (controller: AbortController) => void
) => {
  switch (aiProvider) {
    case AIProvider.openAi:
      return openai.sendMessage(history, message, write, setController);
    case AIProvider.gemini:
      return gemini.sendMessage(history, message, write, setController);
    default:
      throw new Error('Invalid AI provider');
  }
};

export const getMessageSummary = (aiProvider: string, message: string) => {
  switch (aiProvider) {
    case AIProvider.openAi:
      return openai.getMessageSummary(message);
    case AIProvider.gemini:
      return gemini.getMessageSummary(message);
    default:
      throw new Error('Invalid AI provider');
  }
};

export * from './types';
