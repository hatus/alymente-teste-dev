import { Cidade, Prisma } from '@prisma/client'

export interface ICityNameAndStateId {
  cityName: string
  stateId: number
}

export interface CitiesRepository {
  create(data: Prisma.CidadeUncheckedCreateInput): Promise<Cidade>
  findById(id: number): Promise<Cidade | null>
  findByNameAndStateId({
    cityName,
    stateId,
  }: ICityNameAndStateId): Promise<Cidade | null>
  update(id: number, data: Prisma.CidadeUpdateInput): Promise<Cidade>
}
