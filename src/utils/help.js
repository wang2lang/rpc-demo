export function isUndefined(fn) {
  return typeof fn === 'undefined'
}

export function isFunction(fn) {
  return typeof fn === 'function'
}

export function isObject(obj) {
  return typeof obj === 'object'
}

export function isString(str) {
  return typeof str === 'string'
}

export function isArray(array) {
  return Object.prototype.toString.call(array) === '[object Array]'
}

export function sendStorageMessage(key, packet) {
  localStorage.setItem(key, JSON.stringify(packet))
  setTimeout(() => {
    localStorage.removeItem(key)
  }, 0)
}

export function getStorageMessage(event, key) {
  return event.key === key
    ? event.newValue
      ? JSON.parse(event.newValue)
      : null
    : null
}