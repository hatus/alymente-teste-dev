import { Perfil, Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

import { ProfilesRepository } from '../profiles-repository'

export class PrismaProfilesRepository implements ProfilesRepository {
  async findById(id: number): Promise<Perfil | null> {
    const profile = await prisma.perfil.findUnique({
      where: { id },
    })

    return profile
  }

  async create(data: Prisma.PerfilUncheckedCreateInput): Promise<Perfil> {
    const profile = await prisma.perfil.create({ data })

    return profile
  }

  async update(
    id: number,
    {
      altura,
      celular,
      cor,
      cpf,
      data_nasc,
      idade,
      mae,
      nome,
      pai,
      peso,
      rg,
      sexo,
      signo,
      telefone_fixo,
      tipo_sanguineo,
    }: Prisma.PerfilUpdateWithoutEnderecosInput,
  ): Promise<Perfil> {
    const profile = await prisma.perfil.update({
      data: {
        altura,
        celular,
        cor,
        cpf,
        data_nasc,
        idade,
        mae,
        nome,
        pai,
        peso,
        rg,
        sexo,
        signo,
        telefone_fixo,
        tipo_sanguineo,
      },
      where: { id },
    })

    return profile
  }
}
