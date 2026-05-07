import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
   plugins: [adminClient()],
   sessionOptions: {
      refetchInterval: 300, // re-fetch session every 5 minutes
      refetchOnWindowFocus: true,
   },
});

export const { useSession, signIn, signUp, signOut } = authClient;
