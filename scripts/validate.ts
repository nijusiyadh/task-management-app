import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
   POSTGRES_PRISMA_URL: z.url(),

   BETTER_AUTH_SECRET: z.string().trim(),
   BETTER_AUTH_URL: z.string().trim(),
});

(async () => {
   const environments = await import('@/constants/environments');

   const parsed = envSchema.safeParse(environments);

   if (!parsed.success) {
      console.error('env validation failed:', z.flattenError(parsed.error));
      process.exit(1);
   }
})();
