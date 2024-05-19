import { differenceInYears } from 'date-fns'

/**
 * Calculate person age from date of birth
 * @param birthDate person's date of birth
 * @returns age in years
 */
export function calculateAge(birthDate: Date) {
  const today = new Date()
  const age = differenceInYears(today, birthDate)

  return age
}
