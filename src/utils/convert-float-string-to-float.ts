export function convertFloatStringToFloat(floatString: string) {
  const floatStringUSFormat = floatString.replace(',', '.')
  const float = parseFloat(floatStringUSFormat)

  return float
}
