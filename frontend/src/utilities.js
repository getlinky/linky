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

// https://vuejs.org/v2/guide/syntax.html#Filters
export const normalize = value => {
  if (!value) return ''
  value = value.toString().replace(/_/g, ' ')
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const search = (obj, query) =>
  [obj.description, obj.title, obj.url]
    .join(' ')
    .toUpperCase()
    .includes(query.toUpperCase())

export const maxLength = (value, length) => {
  if ((value.length + 3) >= length) {
    return value.slice(0, length) + '...'
  }
  return value
}

export const normalizeUrl = value => value.replace(/^(http?:\/\/)|(https?:\/\/)/g, '')
