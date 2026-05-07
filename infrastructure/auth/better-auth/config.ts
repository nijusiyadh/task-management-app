import { admin } from 'better-auth/plugins';
import { betterAuth } from 'better-auth';
import { createAccessControl } from 'better-auth/plugins/access';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { prisma } from '@/infrastructure/database/prisma/client';

export const ac = createAccessControl({
   task: ['create', 'read', 'update', 'delete', 'assign'],
} as const);

const ownerRole = ac.newRole({
   task: ['create', 'read', 'update', 'delete', 'assign'],
});

const adminRole = ac.newRole({
   task: ['create', 'read', 'update', 'delete', 'assign'],
});

const memberRole = ac.newRole({
   task: ['create', 'read', 'update'],
});

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
      provider: 'postgresql',
   }),

   emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      autoSignIn: true,
      requireEmailVerification: false, // set true when email sending is configured
   },

   plugins: [
      admin({
         ac,
         defaultRole: 'member',
         adminRoles: ['admin', 'owner'],
         roles: { owner: ownerRole, admin: adminRole, member: memberRole },
      }),
   ],

   session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // refresh cookie if older than 1 day
      freshAge: 60 * 60 * 24, // "fresh" threshold for sensitive operations
   },
});

export type Auth = typeof auth;
