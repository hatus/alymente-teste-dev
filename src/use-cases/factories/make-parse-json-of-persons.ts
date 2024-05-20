import { ParseJsonOfPersonsUseCase } from '../parse-json-of-persons'

export function makeParseJsonOfPersonsUseCase() {
  const useCase = new ParseJsonOfPersonsUseCase()

  return useCase
}
