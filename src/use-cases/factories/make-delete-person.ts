import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { DeletePersonUseCase } from '../delete-person'

export function makeDeletePersonUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new DeletePersonUseCase(usersRepository)

  return useCase
}
