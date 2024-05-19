/**
 * Convert float string to number.
 * @param floatString "1,99"
 * @returns 1.99
 */
export function convertFloatStringToFloat(floatString: string) {
  const floatStringUSFormat = floatString.replace(',', '.')
  const float = parseFloat(floatStringUSFormat)

  return float
}
