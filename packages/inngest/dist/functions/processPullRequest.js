import { inngest } from '../client';
import { events } from '../events';
export const processPullRequest = inngest.createFunction({ id: 'process-pr' }, { event: events.github.pull_request }, async ({ event }) => {
    // enqueue review
    return { ok: true };
});
