import { z } from 'zod'

export const deletePersonParamsSchema = z.object({
  userId: z.coerce.number(),
})
