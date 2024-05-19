import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.usuario.findUnique({
      where: { email },
    })

    return user
  }

  async findAll() {
    const users = await prisma.usuario.findMany({
      include: {
        perfil: {
          include: {
            enderecos: {
              include: {
                cidade: {
                  include: {
                    estado: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return users
  }

  async findById(id: number) {
    const user = await prisma.usuario.findUnique({
      where: { id },
    })

    return user
  }

  async create(data: Prisma.UsuarioCreateInput) {
    const user = await prisma.usuario.create({ data })

    return user
  }

  async update(
    id: number,
    { email, senha }: Prisma.UsuarioUpdateWithoutPerfilInput,
  ) {
    const user = await prisma.usuario.update({
      data: { email, senha },
      where: { id },
    })

    return user
  }

  async deleteById(id: number) {
    await prisma.usuario.delete({ where: { id } })
  }
}
