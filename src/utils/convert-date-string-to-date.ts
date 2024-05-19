/**
 * Convert date string to Date format.
 * @param dateString date in brazilian string format. Ex: "18/05/2024"
 * @returns date in Date format
 */
export function convertDateStringToDate(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number)
  const date = new Date(year, month - 1, day)

  return date
}
