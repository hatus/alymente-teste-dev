import { z } from 'zod'

export const getPersonParamsSchema = z.object({
  userId: z.coerce.number(),
})
