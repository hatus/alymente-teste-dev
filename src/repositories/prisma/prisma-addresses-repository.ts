import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

import { AddressesRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async findById(id: number) {
    const address = await prisma.endereco.findUnique({
      where: { id },
    })

    return address
  }

  async create(data: Prisma.EnderecoUncheckedCreateInput) {
    const address = await prisma.endereco.create({ data })

    return address
  }

  async update(id: number, data: Prisma.EnderecoUpdateWithoutCidadeInput) {
    const address = await prisma.endereco.update({
      data,
      where: { id },
    })

    return address
  }
}
