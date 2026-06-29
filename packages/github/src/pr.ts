import type { Octokit } from '@octokit/rest';

export async function listChangedFiles(octokit: Octokit, owner: string, repo: string, pull_number: number) {
  const files = await octokit.pulls.listFiles({ owner, repo, pull_number, per_page: 100 });
  return files.data.map(f => ({ filename: f.filename, patch: f.patch }));
}

export async function postReviewComment(octokit: Octokit, owner: string, repo: string, pull_number: number, body: string, path?: string, position?: number) {
  await octokit.pulls.createReview({ owner, repo, pull_number, event: 'COMMENT', body });
}
