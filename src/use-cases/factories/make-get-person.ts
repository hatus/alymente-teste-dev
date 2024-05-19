import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { GetPersonUseCase } from '../get-person'

export function makeGetPersonUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new GetPersonUseCase(usersRepository)

  return useCase
}
