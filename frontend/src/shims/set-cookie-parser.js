function splitCookiesString(headerValue = '') {
  if (!headerValue) {
    return []
  }

  const cookies = []
  let start = 0
  let inQuotes = false

  for (let index = 0; index < headerValue.length; index += 1) {
    const character = headerValue[index]

    if (character === '"') {
      inQuotes = !inQuotes
    }

    if (!inQuotes && character === ',') {
      const possibleSeparator = headerValue.slice(index + 1, index + 3)
      if (possibleSeparator !== '20' && headerValue.slice(index + 1).trim()) {
        cookies.push(headerValue.slice(start, index).trim())
        start = index + 1
      }
    }
  }

  cookies.push(headerValue.slice(start).trim())

  return cookies.filter(Boolean)
}

export { splitCookiesString }

export default { splitCookiesString }