import { Endereco, Prisma } from '@prisma/client'

export interface AddressesRepository {
  create(data: Prisma.EnderecoCreateInput): Promise<Endereco>
}
