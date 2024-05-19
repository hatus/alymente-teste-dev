import { Cidade, Prisma } from '@prisma/client'

export interface CitiesRepository {
  create(data: Prisma.CidadeCreateInput): Promise<Cidade>
}
