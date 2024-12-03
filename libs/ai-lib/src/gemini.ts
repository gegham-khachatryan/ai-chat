import { Content, GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiRoleMap, IHistoryMessage } from './types';

class Gemini {
  model: GenerativeModel;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey as string);
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async sendMessage(
    history: IHistoryMessage[],
    text: string,
    write: (str: string) => void,
    controller: (controller: AbortController) => void
  ) {
    let responseString = '';
    try {
      const abortController = new AbortController();
      const chat = this.model.startChat({ history: this.normalizeHistory(history) });
      const result = await chat.sendMessageStream(text, { signal: abortController.signal });
      controller(abortController);
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        write(chunkText);
        responseString += chunkText;
      }
    } catch (error) {
      console.error('Error fetching Gemini response:', error);
    }
    return responseString;
  }

  async getMessageSummary(message: string) {
    const chat = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'Use less then five words to summarize the message' }]
        }
      ]
    });
    const result = await chat.sendMessage(`${message}. Summary: `);
    const response = await result.response;
    const text = response.text();
    return text || 'Unknown';
  }

  normalizeHistory = (history: IHistoryMessage[]): Content[] => {
    return history.map<Content>(({ role, text }) => ({ role: GeminiRoleMap[role], parts: [{ text }] }));
  };
}

export default Gemini;
