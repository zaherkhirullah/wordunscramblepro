import { loadWordList, getAllWords, type DictionaryType } from './loader'

export interface WordResult {
  word: string
  length: number
  points?: number
}

export interface UnscrambleOptions {
  dictionary?: DictionaryType
  mustInclude?: string
  startsWith?: string
  endsWith?: string
  minLength?: number
  maxLength?: number
}

export interface UnscrambleResult {
  wordsByLength: Record<number, WordResult[]>
  totalCount: number
  inputLetters: string
  usedWildcards: boolean
}

function buildFreqMap(letters: string): Map<string, number> {
  const freq = new Map<string, number>()
  for (const ch of letters) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1)
  }
  return freq
}

function canFormWord(
  word: string,
  letterFreq: Map<string, number>,
  wildcardCount: number
): boolean {
  const needed = buildFreqMap(word)
  let wildcardsUsed = 0
  for (const [ch, count] of Array.from(needed)) {
    const available = letterFreq.get(ch) ?? 0
    if (available < count) {
      wildcardsUsed += count - available
      if (wildcardsUsed > wildcardCount) return false
    }
  }
  return true
}

function scrabblePoints(word: string): number {
  const values: Record<string, number> = {
    a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, r: 1, s: 1, t: 1,
    d: 2, g: 2,
    b: 3, c: 3, m: 3, p: 3,
    f: 4, h: 4, v: 4, w: 4, y: 4,
    k: 5,
    j: 8, x: 8,
    q: 10, z: 10,
  }
  return word.split('').reduce((sum, ch) => sum + (values[ch] ?? 0), 0)
}

export function unscrambleLetters(
  letters: string,
  options: UnscrambleOptions = {}
): UnscrambleResult {
  const {
    dictionary = 'enable',
    mustInclude = '',
    startsWith = '',
    endsWith = '',
    minLength = 2,
    maxLength = letters.replace(/[?*]/g, '').length + letters.split('').filter((c) => c === '?' || c === '*').length,
  } = options

  const normalized = letters.toLowerCase()
  const wildcardCount = normalized.split('').filter((c) => c === '?' || c === '*').length
  const regularLetters = normalized.replace(/[?*]/g, '')
  const letterFreq = buildFreqMap(regularLetters)

  const mustIncludeLower = mustInclude.toLowerCase()
  const startsWithLower = startsWith.toLowerCase()
  const endsWithLower = endsWith.toLowerCase()

  const wordMap = loadWordList(dictionary)
  const wordsByLength: Record<number, WordResult[]> = {}
  let totalCount = 0

  for (const [length, wordSet] of Array.from(wordMap)) {
    if (length < minLength || length > maxLength) continue
    if (length > regularLetters.length + wildcardCount) continue

    const results: WordResult[] = []
    for (const word of wordSet) {
      if (startsWithLower && !word.startsWith(startsWithLower)) continue
      if (endsWithLower && !word.endsWith(endsWithLower)) continue
      if (mustIncludeLower && !word.includes(mustIncludeLower)) continue
      if (!canFormWord(word, letterFreq, wildcardCount)) continue
      results.push({ word, length, points: scrabblePoints(word) })
    }

    if (results.length > 0) {
      results.sort((a, b) => a.word.localeCompare(b.word))
      wordsByLength[length] = results
      totalCount += results.length
    }
  }

  return {
    wordsByLength,
    totalCount,
    inputLetters: letters.toUpperCase(),
    usedWildcards: wildcardCount > 0,
  }
}
