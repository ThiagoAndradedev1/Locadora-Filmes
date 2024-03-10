const getAll = <T>(key: string): T | null => {
  const value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(value) as T
  }
  return null
}

const set = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

const exists = (key: string): boolean => {
  return localStorage.getItem(key) !== null
}

const getById = <T>(key: string, id: string): T => {
  const value = localStorage.getItem(key)
  if (value) {
    const result = JSON.parse(value) as { id: string }[]
    const item = result.find((item) => item.id === id)
    return item as T
  }
  return {} as T
}

export { getAll, getById, set, exists }
