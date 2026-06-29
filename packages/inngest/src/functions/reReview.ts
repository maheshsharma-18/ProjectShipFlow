import { inngest } from '../client';

export const reReview = inngest.createFunction({ id: 'rereview' }, { event: 'shipflow/pr.rereview' }, async () => {
  return { ok: true };
});
