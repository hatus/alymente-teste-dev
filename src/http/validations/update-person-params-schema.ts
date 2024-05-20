import { z } from 'zod'

export const updatePersonParamsSchema = z.object({
  userId: z.coerce.number(),
})
