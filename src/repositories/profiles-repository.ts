import { Perfil, Prisma } from '@prisma/client'

export interface ProfilesRepository {
  create(data: Prisma.PerfilCreateInput): Promise<Perfil>
}
