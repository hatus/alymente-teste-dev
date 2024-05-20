import { z } from 'zod'

const estadoSchema = z.object({
  id: z.number().optional(),
  sigla: z.string(),
  criado_em: z.string().transform((value) => new Date(value)),
  atualizado_em: z.string().transform((value) => new Date(value)),
})

const cidadeSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  estado_id: z.number(),
  estado: estadoSchema,
  criado_em: z.string().transform((value) => new Date(value)),
  atualizado_em: z.string().transform((value) => new Date(value)),
})

const enderecoSchema = z.object({
  id: z.number().optional(),
  logradouro: z.string(),
  numero: z.number(),
  cep: z.string(),
  bairro: z.string(),
  cidade_id: z.number(),
  perfil_id: z.number(),
  cidade: cidadeSchema,
  criado_em: z.string().transform((value) => new Date(value)),
  atualizado_em: z.string().transform((value) => new Date(value)),
})

const perfilSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  idade: z.number(),
  cpf: z.string(),
  rg: z.string(),
  data_nasc: z.string(),
  sexo: z.string(),
  signo: z.string(),
  mae: z.string(),
  pai: z.string(),
  telefone_fixo: z.string(),
  celular: z.string(),
  cor: z.string(),
  tipo_sanguineo: z.string(),
  peso: z.number(),
  altura: z.number(),
  usuario_id: z.number(),
  enderecos: z.array(enderecoSchema),
  criado_em: z.string().transform((value) => new Date(value)),
  atualizado_em: z.string().transform((value) => new Date(value)),
})

export const updatePersonBodySchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  senha: z.string(),
  perfil: perfilSchema,
  criado_em: z.string().transform((value) => new Date(value)),
  atualizado_em: z.string().transform((value) => new Date(value)),
})

export type UpdatePersonBody = z.infer<typeof updatePersonBodySchema>
