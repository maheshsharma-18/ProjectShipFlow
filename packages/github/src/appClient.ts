import { App } from '@octokit/app';
import { Octokit } from '@octokit/rest';

export function getApp() {
  const app = new App({
    appId: process.env.GITHUB_APP_ID as string,
    privateKey: (process.env.GITHUB_APP_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  });
  return app;
}

export async function getInstallationOctokit(installationId: number) {
  const app = getApp();
  const octokit = await app.getInstallationOctokit(installationId);
  return octokit as unknown as Octokit; // compatible subset used
}
