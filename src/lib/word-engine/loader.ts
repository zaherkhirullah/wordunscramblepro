import { LRUCache } from 'lru-cache'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export type DictionaryType = 'nwl' | 'csw' | 'enable'

// LRU cache for parsed word maps, keyed by dictionary type
const wordListCache = new LRUCache<DictionaryType, Map<number, Set<string>>>({
  max: 3,
  ttl: Number(process.env.WORD_LIST_CACHE_TTL_MS) || 86400000,
})

// Raw word arrays cache
const rawWordsCache = new LRUCache<DictionaryType, string[]>({
  max: 3,
  ttl: Number(process.env.WORD_LIST_CACHE_TTL_MS) || 86400000,
})

const MAX_LENGTH = Number(process.env.WORD_LIST_MAX_LENGTH) || 15

function getWordlistPath(dictionary: DictionaryType): string {
  const base = join(process.cwd(), 'src', 'data', 'wordlists')
  const fullPath = join(base, `${dictionary}.txt`)
  if (existsSync(fullPath)) return fullPath
  // Fallback to sample
  return join(base, 'enable_sample.txt')
}

function parseWordList(dictionary: DictionaryType): { byLength: Map<number, Set<string>>; raw: string[] } {
  const filePath = getWordlistPath(dictionary)
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split(/\r?\n/).map((l) => l.trim().toLowerCase()).filter(Boolean)

  const byLength = new Map<number, Set<string>>()
  const raw: string[] = []

  for (const word of lines) {
    if (word.length < 2 || word.length > MAX_LENGTH) continue
    if (!/^[a-z]+$/.test(word)) continue
    raw.push(word)
    if (!byLength.has(word.length)) {
      byLength.set(word.length, new Set())
    }
    byLength.get(word.length)!.add(word)
  }

  return { byLength, raw }
}

export function loadWordList(dictionary: DictionaryType = 'enable'): Map<number, Set<string>> {
  if (wordListCache.has(dictionary)) {
    return wordListCache.get(dictionary)!
  }
  const { byLength, raw } = parseWordList(dictionary)
  wordListCache.set(dictionary, byLength)
  rawWordsCache.set(dictionary, raw)
  return byLength
}

export function getAllWords(dictionary: DictionaryType = 'enable'): string[] {
  if (rawWordsCache.has(dictionary)) {
    return rawWordsCache.get(dictionary)!
  }
  const { byLength, raw } = parseWordList(dictionary)
  wordListCache.set(dictionary, byLength)
  rawWordsCache.set(dictionary, raw)
  return raw
}

export function getWordsByLength(length: number, dictionary: DictionaryType = 'enable'): Set<string> {
  const map = loadWordList(dictionary)
  return map.get(length) ?? new Set()
}
