import { FastifyReply, FastifyRequest } from 'fastify'

import { getPersonParamsSchema } from '@/http/validations/get-person-params-schema'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { makeGetPersonUseCase } from '@/use-cases/factories/make-get-person'

export async function getPersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = getPersonParamsSchema.parse(request.params)

  const getPersonUseCase = makeGetPersonUseCase()

  try {
    const { person } = await getPersonUseCase.execute({ userId })

    return reply.status(200).send({ person })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
