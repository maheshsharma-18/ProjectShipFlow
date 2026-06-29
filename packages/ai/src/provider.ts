export interface AiProvider {
  normalizeAddress(input: {
    toAddress: any;
    fromAddress: any;
  }): Promise<{ suggestions: Array<{ toAddress: any; fromAddress: any; confidence: number }> }>;
  classifyException(input: { text: string }): Promise<{ category: string; confidence: number }>;
  draftCustomerMessage(input: { context: string }): Promise<{ message: string; confidence: number }>;
}

export class OpenAiProvider implements AiProvider {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  async normalizeAddress(input: { toAddress: any; fromAddress: any }) {
    // Placeholder deterministic stub; wire OpenAI later
    return { suggestions: [{ toAddress: input.toAddress, fromAddress: input.fromAddress, confidence: 0.6 }] };
  }
  async classifyException(input: { text: string }) {
    return { category: 'GENERAL', confidence: 0.5 };
  }
  async draftCustomerMessage(input: { context: string }) {
    return { message: `Draft: ${input.context}` , confidence: 0.5 };
  }
}
