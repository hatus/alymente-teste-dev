import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

import { ProfilesRepository } from '../profiles-repository'

export class PrismaProfilesRepository implements ProfilesRepository {
  async findById(id: number) {
    const profile = await prisma.perfil.findUnique({
      where: { id },
    })

    return profile
  }

  async create(data: Prisma.PerfilCreateInput) {
    const profile = await prisma.perfil.create({ data })

    return profile
  }

  async update(id: number, data: Prisma.PerfilUpdateWithoutEnderecosInput) {
    const profile = await prisma.perfil.update({
      data,
      where: { id },
    })

    return profile
  }
}
