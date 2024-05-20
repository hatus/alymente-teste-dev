import { UpdatePersonBody } from '@/http/validations/update-person-body-schema'
import { AddressesRepository } from '@/repositories/addresses-repository'
import { CitiesRepository } from '@/repositories/cities-repository'
import { ProfilesRepository } from '@/repositories/profiles-repository'
import { StatesRepository } from '@/repositories/states-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { calculateAge } from '@/utils/calculate-age'

import { UserNotFoundError } from './errors/user-not-found'

interface UpdatePersonUseCaseRequest {
  userId: number
  updatePersonBody: UpdatePersonBody
}

export class UpdatePersonUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private profilesRepository: ProfilesRepository,
    private addressesRepository: AddressesRepository,
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
  ) {}

  async execute({ userId, updatePersonBody }: UpdatePersonUseCaseRequest) {
    const person = await this.usersRepository.findById(userId)

    if (!person) {
      throw new UserNotFoundError()
    }

    await this.usersRepository.update(person.id, {
      senha: updatePersonBody.senha,
    })

    await this.profilesRepository.update(person.perfil!.id, {
      altura: updatePersonBody.perfil?.altura,
      celular: updatePersonBody.perfil?.celular,
      cor: updatePersonBody.perfil?.cor,
      cpf: updatePersonBody.perfil?.cpf,
      data_nasc: new Date(updatePersonBody.perfil!.data_nasc),
      idade: calculateAge(new Date(updatePersonBody.perfil!.data_nasc)),
      mae: updatePersonBody.perfil?.mae,
      nome: updatePersonBody.perfil?.nome,
      pai: updatePersonBody.perfil?.pai,
      peso: updatePersonBody.perfil?.peso,
      rg: updatePersonBody.perfil?.rg,
      sexo: updatePersonBody.perfil?.sexo,
      signo: updatePersonBody.perfil?.signo,
      telefone_fixo: updatePersonBody.perfil?.telefone_fixo,
      tipo_sanguineo: updatePersonBody.perfil?.tipo_sanguineo,
    })

    // verifica se estado passado já existe
    let stateAlreadyExists = await this.statesRepository.findByName(
      updatePersonBody.perfil!.enderecos![0].cidade!.estado!.sigla,
    )

    // se não existir, cria o estado
    if (!stateAlreadyExists) {
      stateAlreadyExists = await this.statesRepository.create({
        sigla: updatePersonBody.perfil!.enderecos![0].cidade!.estado!.sigla,
      })
    }

    // verifica se cidade passada já existe para o estado passado
    let cityAlreadyExists = await this.citiesRepository.findByNameAndStateId({
      cityName: updatePersonBody.perfil!.enderecos![0].cidade!.nome,
      stateId: stateAlreadyExists.id,
    })

    // se a cidade não existir, cria ela já atualizando o estado
    if (!cityAlreadyExists) {
      cityAlreadyExists = await this.citiesRepository.create({
        estado_id: stateAlreadyExists.id,
        nome: updatePersonBody.perfil!.enderecos![0].cidade!.nome,
      })
    }

    // atualiza endereco com a cidade
    await this.addressesRepository.update(person.perfil!.enderecos![0].id, {
      bairro: updatePersonBody.perfil?.enderecos![0].bairro,
      cep: updatePersonBody.perfil?.enderecos![0].cep,
      logradouro: updatePersonBody.perfil?.enderecos![0].logradouro,
      numero: updatePersonBody.perfil?.enderecos![0].numero,
      cidade_id: cityAlreadyExists.id,
    })

    const updatedPerson = await this.usersRepository.findById(person.id)

    return { person: updatedPerson }
  }
}
