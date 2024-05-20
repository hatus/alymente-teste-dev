import { promises as fs } from 'fs'

import { CreatePersonBody } from '@/http/validations/create-person-body-schema'
import { UploadedFile } from '@/types/multer-fastify'

export async function parseJsonFileToRawPersons(
  file: UploadedFile,
): Promise<CreatePersonBody[]> {
  try {
    const data = await fs.readFile(file.path, 'utf8')

    const jsonObject = JSON.parse(data)

    // apaga json após carregá-lo
    await fs.unlink(file.path)

    return jsonObject
  } catch (err) {
    console.error('Erro ao processar o arquivo:', err)
    throw err
  }
}
