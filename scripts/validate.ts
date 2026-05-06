import z from 'zod';

const envSchema = z.object({
   POSTGRES_PRISMA_URL: z.url(),
});

(async () => {
   const environments = await import('@/constants/environments');

   const parsed = envSchema.safeParse(environments);

   if (!parsed.success) {
      console.error('env validation failed:', z.flattenError(parsed.error));
      process.exit(1);
   }
})();
