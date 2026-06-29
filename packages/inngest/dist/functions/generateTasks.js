import { inngest } from '../client';
import { events } from '../events';
import { llmPrompt } from '@shipflow/ai';
export const generateTasks = inngest.createFunction({ id: 'generate-tasks' }, { event: events.feature.tasks }, async ({ event, step }) => {
    const prd = event.data.prd;
    const tasks = await step.run('llm-tasks', () => llmPrompt({ prompt: `Tasks for PRD: ${prd}` }));
    return { tasks };
});
