export function clarificationPrompt(feature: string) {
  return `You are a product analyst. Ask 5-8 focused questions to clarify this feature request so a developer can implement it. Feature: ${feature}`;
}
