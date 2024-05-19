import { UsersRepository } from '@/repositories/users-repository'

import { UserNotFoundError } from './errors/user-not-found'

interface GetPersonUseCaseRequest {
  userId: number
}

export class GetPersonUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetPersonUseCaseRequest) {
    const person = await this.usersRepository.findById(userId)

    if (!person) {
      throw new UserNotFoundError()
    }

    return { person }
  }
}
