import { Endereco, Prisma } from '@prisma/client'

export interface AddressesRepository {
  create(data: Prisma.EnderecoUncheckedCreateInput): Promise<Endereco>
  findById(id: number): Promise<Endereco | null>
  update(
    id: number,
    data: Prisma.EnderecoUpdateWithoutCidadeInput,
  ): Promise<Endereco>
}
