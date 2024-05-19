export function convertDateStringToDate(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number)
  const date = new Date(year, month - 1, day)

  return date
}
