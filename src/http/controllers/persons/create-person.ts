import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeCreatePersonUseCase } from '@/use-cases/factories/make-create-person'

export async function createPersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPersonBodySchema = z.object({
    nome: z.string(),
    idade: z.number(),
    cpf: z.string(),
    rg: z.string(),
    data_nasc: z.string(),
    sexo: z.string(),
    signo: z.string(),
    mae: z.string(),
    pai: z.string(),
    email: z.string().email(),
    senha: z.string(),
    cep: z.string(),
    endereco: z.string(),
    numero: z.number(),
    bairro: z.string(),
    cidade: z.string(),
    estado: z.string(),
    telefone_fixo: z.string(),
    celular: z.string(),
    altura: z.string(),
    peso: z.number(),
    tipo_sanguineo: z.string(),
    cor: z.string(),
  })

  try {
    const createPersonBody = createPersonBodySchema.parse(request.body)
    const createPersonUseCase = makeCreatePersonUseCase()

    const { person } = await createPersonUseCase.execute(createPersonBody)

    return reply.status(201).send({ person })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
