import { z } from 'zod'

export const createPersonBodySchema = z.object({
  nome: z.string(),
  idade: z.coerce.number(),
  cpf: z.string(),
  rg: z.string(),
  data_nasc: z.string(),
  sexo: z.string(),
  signo: z.string(),
  mae: z.string(),
  pai: z.string(),
  email: z.string().email(),
  senha: z.string(),
  cep: z.string(),
  endereco: z.string(),
  numero: z.coerce.number(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  telefone_fixo: z.string(),
  celular: z.string(),
  altura: z.string(),
  peso: z.coerce.number(),
  tipo_sanguineo: z.string(),
  cor: z.string(),
})

export type CreatePersonBody = z.infer<typeof createPersonBodySchema>
