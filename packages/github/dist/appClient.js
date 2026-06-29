import { App } from '@octokit/app';
export function getApp() {
    const app = new App({
        appId: process.env.GITHUB_APP_ID,
        privateKey: (process.env.GITHUB_APP_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    });
    return app;
}
export async function getInstallationOctokit(installationId) {
    const app = getApp();
    const octokit = await app.getInstallationOctokit(installationId);
    return octokit; // compatible subset used
}
