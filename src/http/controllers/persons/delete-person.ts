import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeDeletePersonUseCase } from '@/use-cases/factories/make-delete-person'

export async function deletePersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deletePersonParamsSchema = z.object({
    userId: z.coerce.number(),
  })

  const { userId } = deletePersonParamsSchema.parse(request.params)

  const deletePersonUseCase = makeDeletePersonUseCase()

  try {
    const { person } = await deletePersonUseCase.execute({ userId })

    return reply.status(200).send({ person })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
