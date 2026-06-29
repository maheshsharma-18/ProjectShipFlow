import { createNodeMiddleware, Webhooks } from '@octokit/webhooks';

export const webhooks = new Webhooks({ secret: process.env.GITHUB_WEBHOOK_SECRET || 'dev' });

export const githubWebhookMiddleware = createNodeMiddleware(webhooks);
