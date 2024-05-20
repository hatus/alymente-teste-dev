import fastify from 'fastify'

import { personsRoutes } from './http/controllers/persons/routes'
import { fastifyErrorHandler } from './libs/fastify-error-handler'
import { multer } from './libs/upload'

const app = fastify()

app.register(multer.contentParser)
app.register(personsRoutes, { prefix: 'persons' })

app.setErrorHandler(fastifyErrorHandler)

export { app }
