import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaCitiesRepository } from '@/repositories/prisma/prisma-cities-repository'
import { PrismaProfilesRepository } from '@/repositories/prisma/prisma-profiles-repository'
import { PrismaStatesRepository } from '@/repositories/prisma/prisma-states-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { CreatePersonUseCase } from '../create-person'

export function makeCreatePersonUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const profilesRepository = new PrismaProfilesRepository()
  const addressesRepository = new PrismaAddressesRepository()
  const citiesRepository = new PrismaCitiesRepository()
  const statesRepository = new PrismaStatesRepository()

  const useCase = new CreatePersonUseCase(
    usersRepository,
    profilesRepository,
    addressesRepository,
    citiesRepository,
    statesRepository,
  )

  return useCase
}
