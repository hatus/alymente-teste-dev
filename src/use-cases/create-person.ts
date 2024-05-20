import { CreatePersonBody } from '@/http/validations/create-person-body-schema'
import { AddressesRepository } from '@/repositories/addresses-repository'
import { CitiesRepository } from '@/repositories/cities-repository'
import { ProfilesRepository } from '@/repositories/profiles-repository'
import { StatesRepository } from '@/repositories/states-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Pessoa } from '@/types/pessoa'
import { calculateAge } from '@/utils/calculate-age'
import { convertDateStringToDate } from '@/utils/convert-date-string-to-date'
import { convertFloatStringToFloat } from '@/utils/convert-float-string-to-float'

import { UserAlreadyExistsError } from './errors/user-already-exists'

interface CreatePersonUseCaseRequest {
  createPersonBody: CreatePersonBody
}

interface CreatePersonUseCaseResponse {
  person: Pessoa
}

export class CreatePersonUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private profilesRepository: ProfilesRepository,
    private addressesRepository: AddressesRepository,
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
  ) {}

  async execute({
    createPersonBody: {
      altura,
      bairro,
      celular,
      cep,
      cidade,
      cor,
      cpf,
      data_nasc,
      email,
      endereco,
      estado,
      mae,
      nome,
      numero,
      pai,
      peso,
      rg,
      senha,
      sexo,
      signo,
      telefone_fixo,
      tipo_sanguineo,
    },
  }: CreatePersonUseCaseRequest): Promise<CreatePersonUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({ email, senha })

    const profile = await this.profilesRepository.create({
      altura: convertFloatStringToFloat(altura),
      celular,
      cor,
      cpf,
      data_nasc: convertDateStringToDate(data_nasc),
      idade: calculateAge(convertDateStringToDate(data_nasc)),
      mae,
      nome,
      pai,
      peso,
      rg,
      sexo,
      signo,
      telefone_fixo,
      tipo_sanguineo,
      usuario_id: user.id,
    })

    let stateAlreadyExists = await this.statesRepository.findByName(estado)

    if (!stateAlreadyExists) {
      stateAlreadyExists = await this.statesRepository.create({ sigla: estado })
    }

    let cityAlreadyExists = await this.citiesRepository.findByNameAndStateId({
      cityName: cidade,
      stateId: stateAlreadyExists.id,
    })

    if (!cityAlreadyExists) {
      cityAlreadyExists = await this.citiesRepository.create({
        estado_id: stateAlreadyExists.id,
        nome: cidade,
      })
    }

    await this.addressesRepository.create({
      bairro,
      cep,
      numero,
      logradouro: endereco,
      cidade_id: cityAlreadyExists.id,
      perfil_id: profile.id,
    })

    const person = (await this.usersRepository.findById(user.id)) as Pessoa

    return {
      person,
    }
  }
}
