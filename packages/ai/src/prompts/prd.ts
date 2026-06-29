export function prdPrompt(feature: string, clarified: string) {
  return `Write a concise PRD with Goals, Non-Goals, Acceptance Criteria, Risks for: ${feature}. Consider clarifications: ${clarified}`;
}
