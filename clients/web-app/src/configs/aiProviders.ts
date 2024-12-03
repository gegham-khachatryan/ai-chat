export enum AIProvider {
  openAi = 'openAi',
  gemini = 'gemini'
}

export const AIProviders = {
  [AIProvider.openAi]: { name: 'ChatGPT', id: AIProvider.openAi },
  [AIProvider.gemini]: { name: 'Gemini', id: AIProvider.gemini }
};
