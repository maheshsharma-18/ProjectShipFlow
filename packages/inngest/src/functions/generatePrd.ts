import { inngest } from '../client';
import { events } from '../events';
import { llmPrompt } from '@shipflow/ai';

export const generatePrd = inngest.createFunction({ id: 'generate-prd' }, { event: events.feature.prd }, async ({ event, step }) => {
  // placeholder: write PRD text somewhere via DB
  const feature = (event.data as any).feature as string;
  const clarified = (event.data as any).clarified as string;
  const prd = await step.run('llm-prd', () => llmPrompt({ prompt: `PRD for: ${feature}. Clarifications: ${clarified}` }));
  return { prd };
});
