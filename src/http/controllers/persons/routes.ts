import { FastifyInstance } from 'fastify'

import { createPersonController } from './create-person'
import { deletePersonController } from './delete-person'
import { getPersonController } from './get-person'
import { listAllPersonsController } from './list-all'
import { updatePersonController } from './update-person'

export async function personsRoutes(app: FastifyInstance) {
  app.post('/', createPersonController)
  app.get('/:userId', getPersonController)
  app.delete('/:userId', deletePersonController)
  app.get('/', listAllPersonsController)
  app.put('/:userId', updatePersonController)
}
