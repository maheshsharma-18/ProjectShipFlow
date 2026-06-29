import { inngest } from '../client';

export const releaseCheck = inngest.createFunction({ id: 'release-check' }, { event: 'shipflow/release.check' }, async () => {
  return { ok: true };
});
