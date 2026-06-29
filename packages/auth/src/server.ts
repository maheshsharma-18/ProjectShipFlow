import { authConfig } from './config';

export async function getServerSession() {
  // Placeholder for BetterAuth integration; return a minimal dev session.
  return { userId: process.env.DEV_USER_ID ?? null } as { userId: string | null };
}

export { authConfig };
