import { UsersRepository } from '@/repositories/users-repository'

export class ListAllPersonsUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const persons = await this.usersRepository.findAll()

    return { persons }
  }
}
