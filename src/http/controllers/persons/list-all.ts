import { FastifyReply, FastifyRequest } from 'fastify'

import { makeListAllPersonsUseCase } from '@/use-cases/factories/make-list-all-persons'

export async function listAllPersonsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listAllPersonsUseCase = makeListAllPersonsUseCase()

  const { persons } = await listAllPersonsUseCase.execute()

  return reply.status(200).send({ persons })
}
