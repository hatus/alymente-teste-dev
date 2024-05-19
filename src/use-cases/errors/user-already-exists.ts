import { AppError } from '@/errors/app-error'

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super('Usuário já existe.', 409)
  }
}
