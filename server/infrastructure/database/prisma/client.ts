import { PrismaPg } from '@prisma/adapter-pg';

import { POSTGRES_PRISMA_URL } from '@/constants/environments';
import { PrismaClient } from './generated/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
   globalForPrisma.prisma ||
   new PrismaClient({
      adapter: new PrismaPg({ connectionString: POSTGRES_PRISMA_URL }),
   });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
