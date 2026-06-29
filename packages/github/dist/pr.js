export async function listChangedFiles(octokit, owner, repo, pull_number) {
    const files = await octokit.pulls.listFiles({ owner, repo, pull_number, per_page: 100 });
    return files.data.map(f => ({ filename: f.filename, patch: f.patch }));
}
export async function postReviewComment(octokit, owner, repo, pull_number, body, path, position) {
    await octokit.pulls.createReview({ owner, repo, pull_number, event: 'COMMENT', body });
}
