import 'fastify'

export interface UploadedFile {
  path: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    file: UploadedFile
  }
}
