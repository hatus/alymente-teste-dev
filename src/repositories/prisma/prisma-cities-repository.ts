import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

import { CitiesRepository, ICityNameAndStateId } from '../cities-repository'

export class PrismaCitiesRepository implements CitiesRepository {
  async create(data: Prisma.CidadeUncheckedCreateInput) {
    const city = await prisma.cidade.create({ data })

    return city
  }

  async findById(id: number) {
    const city = await prisma.cidade.findUnique({
      where: { id },
    })

    return city
  }

  async findByNameAndStateId({ cityName, stateId }: ICityNameAndStateId) {
    const city = await prisma.cidade.findFirst({
      include: { estado: true },
      where: { estado_id: stateId, nome: cityName },
    })

    return city
  }

  async update(id: number, data: Prisma.CidadeUpdateWithoutEstadoInput) {
    const city = await prisma.cidade.update({
      data,
      where: { id },
    })

    return city
  }
}
