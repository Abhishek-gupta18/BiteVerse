function decode(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function encode(value) {
  return encodeURIComponent(value)
}

export function parse(cookieHeader = '') {
  const result = {}

  if (!cookieHeader) {
    return result
  }

  const pairs = cookieHeader.split(';')

  for (const pair of pairs) {
    const separatorIndex = pair.indexOf('=')
    if (separatorIndex < 0) {
      continue
    }

    const key = pair.slice(0, separatorIndex).trim()
    const value = pair.slice(separatorIndex + 1).trim()

    if (key) {
      result[key] = decode(value)
    }
  }

  return result
}

export function serialize(name, value, options = {}) {
  let cookieString = `${name}=${encode(String(value))}`

  if (options.maxAge != null) {
    const maxAge = Number(options.maxAge)
    if (Number.isFinite(maxAge)) {
      cookieString += `; Max-Age=${Math.floor(maxAge)}`
    }
  }

  if (options.domain) {
    cookieString += `; Domain=${options.domain}`
  }

  if (options.path) {
    cookieString += `; Path=${options.path}`
  }

  if (options.expires instanceof Date) {
    cookieString += `; Expires=${options.expires.toUTCString()}`
  }

  if (options.httpOnly) {
    cookieString += '; HttpOnly'
  }

  if (options.secure) {
    cookieString += '; Secure'
  }

  if (options.sameSite) {
    const sameSite = String(options.sameSite).toLowerCase()
    if (sameSite === 'lax' || sameSite === 'strict' || sameSite === 'none') {
      cookieString += `; SameSite=${sameSite.charAt(0).toUpperCase()}${sameSite.slice(1)}`
    }
  }

  return cookieString
}

export default { parse, serialize }