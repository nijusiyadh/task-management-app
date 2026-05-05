import z from 'zod';

const envSchema = z.object({
   NODE_ENV: z.enum(['development', 'production', 'test']),
});

(async () => {
   const environments = await import('@/constants/environments');

   const parsed = envSchema.safeParse(environments);

   if (!parsed.success) {
      console.error('env validation failed:', z.flattenError(parsed.error));
      process.exit(1);
   }
})();
