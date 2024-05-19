import { AppError } from '@/errors/app-error'

export class UserNotFoundError extends AppError {
  constructor() {
    super('Usuário não encontrado.', 404)
  }
}
