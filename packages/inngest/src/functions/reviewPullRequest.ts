import { inngest } from '../client';
import { events } from '../events';
import { llmPrompt } from '@shipflow/ai';

export const reviewPullRequest = inngest.createFunction({ id: 'review-pr' }, { event: events.github.pr_review }, async ({ event, step }) => {
  const diff = (event.data as any).diff as string;
  const prd = (event.data as any).prd as string;
  const tasks = (event.data as any).tasks as string;
  const review = await step.run('llm-review', () => llmPrompt({ prompt: `Review Diff: ${diff} vs PRD: ${prd} and Tasks: ${tasks}` }));
  return { review };
});
