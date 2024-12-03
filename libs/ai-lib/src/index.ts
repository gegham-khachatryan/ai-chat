import { AIProvider } from '@ai-chat/consts';
import { IHistoryMessage } from './types';
import OpenAI from './openai';
import Gemini from './gemini';

export class AiAssist {
  gemini: Gemini;
  openai: OpenAI;

  constructor(apiKeys: { GEMINI_API_KEY: string; OPENAI_API_KEY: string; OPENAI_ORG_ID: string }) {
    this.gemini = new Gemini(apiKeys.GEMINI_API_KEY);
    this.openai = new OpenAI(apiKeys.OPENAI_API_KEY, apiKeys.OPENAI_ORG_ID);
  }

  getAIResponse = (
    aiProvider: string,
    message: string,
    history: IHistoryMessage[],
    write: (str: string) => void,
    setController: (controller: AbortController) => void
  ) => {
    switch (aiProvider) {
      case AIProvider.openAi:
        return this.openai.sendMessage(history, message, write, setController);
      case AIProvider.gemini:
        return this.gemini.sendMessage(history, message, write, setController);
      default:
        throw new Error('Invalid AI provider');
    }
  };

  getMessageSummary = (aiProvider: string, message: string) => {
    switch (aiProvider) {
      case AIProvider.openAi:
        return this.openai.getMessageSummary(message);
      case AIProvider.gemini:
        return this.gemini.getMessageSummary(message);
      default:
        throw new Error('Invalid AI provider');
    }
  };
}

export * from './types';
