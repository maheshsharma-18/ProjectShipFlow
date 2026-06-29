export function releasePrompt(prd: string, tasks: string, reviews: string) {
  return `Assess release readiness. Summarize risks and blockers. PRD: ${prd} Tasks: ${tasks} Reviews: ${reviews}`;
}
