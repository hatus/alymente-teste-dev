import { Prisma, Usuario } from '@prisma/client'

import { prisma } from '@/libs/prisma'
import { Pessoa } from '@/types/pessoa'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    const user = await prisma.usuario.create({ data })

    return user
  }

  async deleteById(id: number) {
    await prisma.usuario.delete({ where: { id } })
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const user = await prisma.usuario.findUnique({
      where: { email },
    })

    return user
  }

  async findAll(): Promise<Pessoa[]> {
    const persons = (await prisma.usuario.findMany({
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
    })) as Pessoa[]

    return persons
  }

  async findById(
    id: number,
    includeRelations: boolean = true,
  ): Promise<Pessoa | null> {
    const person = (await prisma.usuario.findUnique({
      where: { id },
      include: includeRelations
        ? {
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
          }
        : undefined,
    })) as Pessoa

    return person
  }

  async update(id: number, { senha }: Prisma.UsuarioUpdateInput) {
    const user = await prisma.usuario.update({
      where: { id },
      data: { senha },
    })

    return user
  }
}
