import { FastifyError, FastifyReply } from 'fastify'
import { ZodError } from 'zod'

import { env } from '@/env'

export function fastifyErrorHandler(
  error: FastifyError,
  _: any,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
}
