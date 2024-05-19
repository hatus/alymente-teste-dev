import { Perfil, Prisma } from '@prisma/client'

export interface ProfilesRepository {
  create(data: Prisma.PerfilUncheckedCreateInput): Promise<Perfil>
  findById(id: number): Promise<Perfil | null>
  update(
    id: number,
    data: Prisma.PerfilUpdateWithoutEnderecosInput,
  ): Promise<Perfil>
}
