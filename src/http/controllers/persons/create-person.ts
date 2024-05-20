import { FastifyReply, FastifyRequest } from 'fastify'

import { createPersonBodySchema } from '@/http/validations/create-person-body-schema'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeCreatePersonUseCase } from '@/use-cases/factories/make-create-person'

export async function createPersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const createPersonBody = createPersonBodySchema.parse(request.body)
    const createPersonUseCase = makeCreatePersonUseCase()

    const { person } = await createPersonUseCase.execute({
      createPersonBody,
    })

    return reply.status(201).send({ person })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
