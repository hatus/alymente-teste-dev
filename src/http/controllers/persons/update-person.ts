import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeUpdatePersonUseCase } from '@/use-cases/factories/make-update-person'

export async function updatePersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updatePersonParamsSchema = z.object({
    userId: z.coerce.number(),
  })

  const { userId } = updatePersonParamsSchema.parse(request.params)

  const updatePersonUseCase = makeUpdatePersonUseCase()

  try {
    const { person } = await updatePersonUseCase.execute({
      userId,
      data: request.body,
    })

    return reply.status(200).send({ person })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
