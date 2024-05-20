import { CreatePersonBody } from '@/http/validations/create-person-body-schema'
import { UsersRepository } from '@/repositories/users-repository'

import { CreatePersonUseCase } from './create-person'

interface ImportPersonsUseCaseRequest {
  rawPersons: CreatePersonBody[]
}

export class ImportPersonsUseCase {
  constructor(
    private createPersonUseCase: CreatePersonUseCase,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ rawPersons }: ImportPersonsUseCaseRequest) {
    let qtyPersonsAdded = 0

    for (const rawPerson of rawPersons) {
      const userAlreadyExists = await this.usersRepository.findByEmail(
        rawPerson.email,
      )

      if (!userAlreadyExists) {
        await this.createPersonUseCase.execute({ createPersonBody: rawPerson })
        qtyPersonsAdded++
      }
    }

    return { qtyPersonsAdded }
  }
}
