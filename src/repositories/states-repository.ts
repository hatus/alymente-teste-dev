import { Prisma, Usuario } from '@prisma/client'

export interface StatesRepository {
  create(data: Prisma.EstadoCreateInput): Promise<Usuario>
}
