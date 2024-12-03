import ChatGpt from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { IHistoryMessage, OpenAiRoleMap } from './types';

class OpenAI {
  model: ChatGpt;

  constructor(apiKey: string, organization: string) {
    this.model = new ChatGpt({ apiKey, organization });
  }

  async sendMessage(
    history: IHistoryMessage[],
    text: string,
    write: (str: string) => void,
    controller: (controller: AbortController) => void
  ) {
    let responseString = '';
    try {
      const result = await this.model.chat.completions.create({
        stream: true,
        model: 'gpt-4o-mini',
        messages: [...this.normalizeHistory(history), { content: text, role: 'user' }]
      });

      controller(result.controller);

      for await (const chunk of result) {
        const [choice] = chunk.choices;
        const { content } = choice.delta;
        if (content) {
          write(content as string);
          responseString += content;
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Error fetching OpenAI response:', error);
      }
    }
    return responseString;
  }

  async getMessageSummary(message: string) {
    const response = await this.model.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 100,
      messages: [
        {
          role: 'system',
          content: 'Use less then five words to summarize the message'
        },
        {
          role: 'user',
          content: `${message}. Summary: `
        }
      ]
    });
    const name = response.choices?.[0]?.message.content;
    return name || 'Unknown';
  }

  normalizeHistory = (history: IHistoryMessage[]): ChatCompletionMessageParam[] => {
    return history.map<ChatCompletionMessageParam>(({ role, text }) => ({
      role: OpenAiRoleMap[role],
      content: text
    }));
  };
}
export default OpenAI;
