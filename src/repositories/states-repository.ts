import { Estado, Prisma } from '@prisma/client'

export interface StatesRepository {
  create(data: Prisma.EstadoUncheckedCreateInput): Promise<Estado>
  findById(id: number): Promise<Estado | null>
  update(
    id: number,
    data: Prisma.EstadoUpdateWithoutCidadesInput,
  ): Promise<Estado>
  findByName(name: string): Promise<Estado | null>
}
