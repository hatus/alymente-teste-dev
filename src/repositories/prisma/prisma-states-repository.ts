import { Estado, Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

import { StatesRepository } from '../states-repository'

export class PrismaStatesRepository implements StatesRepository {
  async create(data: Prisma.EstadoCreateInput): Promise<Estado> {
    const state = await prisma.estado.create({ data })

    return state
  }

  async findById(id: number): Promise<Estado | null> {
    const state = await prisma.estado.findUnique({
      where: { id },
    })

    return state
  }

  async findByName(name: string): Promise<Estado | null> {
    const state = await prisma.estado.findFirst({
      where: { sigla: name },
    })

    return state
  }

  async update(
    id: number,
    { sigla }: Prisma.EstadoUpdateWithoutCidadesInput,
  ): Promise<Estado> {
    const state = await prisma.estado.update({
      data: { sigla },
      where: { id },
    })

    return state
  }
}
