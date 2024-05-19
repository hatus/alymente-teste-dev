import { AddressesRepository } from '@/repositories/addresses-repository'
import { CitiesRepository } from '@/repositories/cities-repository'
import { ProfilesRepository } from '@/repositories/profiles-repository'
import { StatesRepository } from '@/repositories/states-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Pessoa } from '@/types/pessoa'
import { calculateAge } from '@/utils/calculate-age'

import { UserNotFoundError } from './errors/user-not-found'

interface UpdatePersonUseCaseRequest {
  userId: number
  data: Pessoa
}

export class UpdatePersonUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private profilesRepository: ProfilesRepository,
    private addressesRepository: AddressesRepository,
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
  ) {}

  async execute({ userId, data }: UpdatePersonUseCaseRequest) {
    const person = await this.usersRepository.findById(userId)

    if (!person) {
      throw new UserNotFoundError()
    }

    await this.usersRepository.update(person.id, {
      senha: data.senha,
    })

    await this.profilesRepository.update(person.perfil!.id, {
      altura: data.perfil?.altura,
      celular: data.perfil?.celular,
      cor: data.perfil?.cor,
      cpf: data.perfil?.cpf,
      data_nasc: data.perfil?.data_nasc,
      idade: calculateAge(new Date(data.perfil!.data_nasc)),
      mae: data.perfil?.mae,
      nome: data.perfil?.nome,
      pai: data.perfil?.pai,
      peso: data.perfil?.peso,
      rg: data.perfil?.rg,
      sexo: data.perfil?.sexo,
      signo: data.perfil?.signo,
      telefone_fixo: data.perfil?.telefone_fixo,
      tipo_sanguineo: data.perfil?.tipo_sanguineo,
    })

    // verifica se estado passado já existe
    let stateAlreadyExists = await this.statesRepository.findByName(
      data.perfil!.enderecos![0].cidade!.estado!.sigla,
    )

    // se não existir, cria o estado
    if (!stateAlreadyExists) {
      stateAlreadyExists = await this.statesRepository.create({
        sigla: data.perfil!.enderecos![0].cidade!.estado!.sigla,
      })
    }

    // verifica se cidade passada já existe para o estado passado
    let cityAlreadyExists = await this.citiesRepository.findByNameAndStateId({
      cityName: data.perfil!.enderecos![0].cidade!.nome,
      stateId: stateAlreadyExists.id,
    })

    // se a cidade não existir, cria ela já atualizando o estado
    if (!cityAlreadyExists) {
      cityAlreadyExists = await this.citiesRepository.create({
        estado_id: stateAlreadyExists.id,
        nome: data.perfil!.enderecos![0].cidade!.nome,
      })
    }

    // atualiza endereco com a cidade
    await this.addressesRepository.update(person.perfil!.enderecos![0].id, {
      bairro: data.perfil?.enderecos![0].bairro,
      cep: data.perfil?.enderecos![0].cep,
      logradouro: data.perfil?.enderecos![0].logradouro,
      numero: data.perfil?.enderecos![0].numero,
      cidade_id: cityAlreadyExists.id,
    })

    const updatedPerson = await this.usersRepository.findById(person.id)

    return { person: updatedPerson }
  }
}
