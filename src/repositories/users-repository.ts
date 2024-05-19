import { Prisma, Usuario } from '@prisma/client'

export interface UsersRepository {
  findAll(): Promise<Usuario[]>
  findById(id: number): Promise<Usuario | null>
  create(data: Prisma.UsuarioCreateManyInput): Promise<Usuario>
  update(data: Prisma.UsuarioUpdateInput): Promise<Usuario>
  deleteById(id: number): Promise<void>
}
