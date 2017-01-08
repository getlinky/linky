export const compareDateStrings = (a, b) => {
  a = Date.parse(a)
  b = Date.parse(b)
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  return 0
}
