import { z } from 'zod';

export const ParamsWithId = z.object({
  id: z.string().uuid(),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
