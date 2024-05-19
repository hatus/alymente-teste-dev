interface Estado {
  id: number
  sigla: string
  criado_em: Date
  atualizado_em: Date
}

interface Cidade {
  id: number
  nome: string
  estado_id: number
  criado_em: Date
  atualizado_em: Date
  estado?: Estado
}

interface Endereco {
  id: number
  logradouro: string
  numero: number
  cep: string
  bairro: string
  cidade_id: number
  perfil_id: number
  criado_em: Date
  atualizado_em: Date
  cidade?: Cidade
}

interface Perfil {
  id: number
  nome: string
  idade: number
  cpf: string
  rg: string
  data_nasc: Date
  sexo: string
  signo: string
  mae: string
  pai: string
  telefone_fixo: string
  celular: string
  cor: string
  tipo_sanguineo: string
  peso: number
  altura: number
  usuario_id: number
  criado_em: Date
  atualizado_em: Date
  enderecos?: Endereco[]
}

export interface Pessoa {
  id: number
  email: string
  senha: string
  criado_em: Date
  atualizado_em: Date
  perfil?: Perfil
}
