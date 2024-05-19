import fastify from 'fastify'

import { personsRoutes } from './http/controllers/persons/routes'
import { fastifyErrorHandler } from './libs/fastify-error-handler'

const app = fastify()

app.register(personsRoutes, { prefix: 'persons' })

app.setErrorHandler(fastifyErrorHandler)

export { app }
