import { FastifyReply, FastifyRequest } from 'fastify'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeImportPersonsUseCase } from '@/use-cases/factories/make-import-persons'
import { makeParseJsonOfPersonsUseCase } from '@/use-cases/factories/make-parse-json-of-persons'

export async function importPersonsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const parseJsonOfPersonsUseCase = makeParseJsonOfPersonsUseCase()
    const importPersonUseCase = makeImportPersonsUseCase()

    const { rawPersons } = await parseJsonOfPersonsUseCase.execute({
      file: request.file,
    })

    const { qtyPersonsAdded } = await importPersonUseCase.execute({
      rawPersons,
    })

    return reply
      .status(201)
      .send({ message: `${qtyPersonsAdded} pessoa(s) adicionada(s).` })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
