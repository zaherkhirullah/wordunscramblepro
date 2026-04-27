import { getAllWords, type DictionaryType } from './loader'

export interface RandomWordOptions {
  count?: number
  minLength?: number
  maxLength?: number
  startsWith?: string
  endsWith?: string
  contains?: string
  dictionary?: DictionaryType
}

export interface RandomWordResult {
  word: string
  length: number
}

export function generateRandomWords(options: RandomWordOptions = {}): RandomWordResult[] {
  const {
    count = 10,
    minLength = 2,
    maxLength = 15,
    startsWith = '',
    endsWith = '',
    contains = '',
    dictionary = 'enable',
  } = options

  let pool = getAllWords(dictionary).filter((word) => {
    if (word.length < minLength || word.length > maxLength) return false
    if (startsWith && !word.startsWith(startsWith.toLowerCase())) return false
    if (endsWith && !word.endsWith(endsWith.toLowerCase())) return false
    if (contains && !word.includes(contains.toLowerCase())) return false
    return true
  })

  // Fisher-Yates shuffle for sampling
  const n = Math.min(count, pool.length)
  for (let i = pool.length - 1; i > pool.length - 1 - n; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(pool.length - n).map((word) => ({ word, length: word.length }))
}
