import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

import { StatesRepository } from '../states-repository'

export class PrismaStatesRepository implements StatesRepository {
  async create(data: Prisma.EstadoCreateInput) {
    const state = await prisma.estado.create({ data })

    return state
  }

  async findById(id: number) {
    const state = await prisma.estado.findUnique({
      where: { id },
    })

    return state
  }

  async findByName(name: string) {
    const state = await prisma.estado.findFirst({
      where: { sigla: name },
    })

    return state
  }

  async update(id: number, data: Prisma.EstadoUpdateWithoutCidadesInput) {
    const state = await prisma.estado.update({
      data,
      where: { id },
    })

    return state
  }
}
