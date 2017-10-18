
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