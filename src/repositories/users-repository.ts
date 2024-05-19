import { Prisma, Usuario } from '@prisma/client'

import { Pessoa } from '@/types/pessoa'

export interface UsersRepository {
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>
  deleteById(id: number): Promise<void>
  findAll(): Promise<Pessoa[]>
  findById(id: number, includeRelations?: boolean): Promise<Pessoa | null>
  findByEmail(email: string): Promise<Usuario | null>
  update(id: number, data: Prisma.UsuarioUpdateInput): Promise<Usuario>
}
