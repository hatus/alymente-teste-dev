import { FastifyInstance } from 'fastify'

import { createPersonController } from './create-person'

export async function personsRoutes(app: FastifyInstance) {
  app.post('/', createPersonController)
}
