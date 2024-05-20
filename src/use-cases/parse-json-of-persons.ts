import { CreatePersonBody } from '@/http/validations/create-person-body-schema'
import { UploadedFile } from '@/types/multer-fastify'
import { parseJsonFileToRawPersons } from '@/utils/parse-json-file-raw-persons'

interface ParseJsonOfPersonsUseCaseRequest {
  file: UploadedFile
}

interface ParseJsonOfPersonsUseCaseResponse {
  rawPersons: CreatePersonBody[]
}

export class ParseJsonOfPersonsUseCase {
  async execute({
    file,
  }: ParseJsonOfPersonsUseCaseRequest): Promise<ParseJsonOfPersonsUseCaseResponse> {
    const rawPersons = await parseJsonFileToRawPersons(file)

    return { rawPersons }
  }
}
