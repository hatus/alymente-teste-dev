import { promises as fs } from 'fs'

import { UploadedFile } from '@/types/multer-fastify'
import { RawPerson } from '@/types/raw-person'

export async function parseJsonFileToRawPersons(
  file: UploadedFile,
): Promise<RawPerson[]> {
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
