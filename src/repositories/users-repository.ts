import { Prisma, Usuario } from '@prisma/client'

export interface UsersRepository {
  findAll(): Promise<Usuario[]>
  findById(id: number): Promise<Usuario | null>
  findByEmail(email: string): Promise<Usuario | null>
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>
  update(
    id: number,
    data: Prisma.UsuarioUpdateWithoutPerfilInput,
  ): Promise<Usuario>
  deleteById(id: number): Promise<void>
}
