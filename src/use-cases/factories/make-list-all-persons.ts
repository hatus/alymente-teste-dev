import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { ListAllPersonsUseCase } from '../list-all-persons'

export function makeListAllPersonsUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new ListAllPersonsUseCase(usersRepository)

  return useCase
}
