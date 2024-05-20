import { FastifyReply, FastifyRequest } from 'fastify'

import { updatePersonBodySchema } from '@/http/validations/update-person-body-schema'
import { updatePersonParamsSchema } from '@/http/validations/update-person-params-schema'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeUpdatePersonUseCase } from '@/use-cases/factories/make-update-person'

export async function updatePersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = updatePersonParamsSchema.parse(request.params)
  const updatePersonBody = updatePersonBodySchema.parse(request.body)

  const updatePersonUseCase = makeUpdatePersonUseCase()

  try {
    const { person } = await updatePersonUseCase.execute({
      userId,
      updatePersonBody,
    })

    return reply.status(200).send({ person })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
