import { Endereco, Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

import { AddressesRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async findById(id: number): Promise<Endereco | null> {
    const address = await prisma.endereco.findUnique({
      where: { id },
    })

    return address
  }

  async create(data: Prisma.EnderecoUncheckedCreateInput): Promise<Endereco> {
    const address = await prisma.endereco.create({ data })

    return address
  }

  async update(
    id: number,
    {
      bairro,
      cep,
      logradouro,
      numero,
      cidade_id,
    }: Prisma.EnderecoUncheckedUpdateInput,
  ): Promise<Endereco> {
    const address = await prisma.endereco.update({
      data: { bairro, cep, logradouro, numero, cidade_id },
      where: { id },
    })

    return address
  }
}
