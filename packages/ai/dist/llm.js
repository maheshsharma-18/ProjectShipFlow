import { generateText } from 'ai';
export async function llmPrompt({ system, prompt, maxTokens = 800, temperature = 0.2 }) {
    // Assume OPENAI compatible provider via env var OPENAI_API_KEY
    const res = await generateText({
        model: 'openai:gpt-4o-mini',
        system,
        prompt,
        maxTokens,
        temperature,
    });
    return res.text;
}
