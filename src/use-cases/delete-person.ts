import { UsersRepository } from '@/repositories/users-repository'

import { UserNotFoundError } from './errors/user-not-found'

interface DeletePersonUseCaseRequest {
  userId: number
}

export class DeletePersonUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeletePersonUseCaseRequest) {
    const person = await this.usersRepository.findById(userId)

    if (!person) {
      throw new UserNotFoundError()
    }

    await this.usersRepository.deleteById(userId)

    return { person }
  }
}
