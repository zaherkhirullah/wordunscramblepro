import { loadWordList, type DictionaryType } from './loader'
import type { UnscrambleOptions, UnscrambleResult, WordResult } from './unscramble'

function buildFreqMap(letters: string): Map<string, number> {
  const freq = new Map<string, number>()
  for (const ch of letters) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1)
  }
  return freq
}

function mapsEqual(a: Map<string, number>, b: Map<string, number>): boolean {
  if (a.size !== b.size) return false
  for (const [k, v] of Array.from(a)) {
    if (b.get(k) !== v) return false
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

export function findAnagrams(
  letters: string,
  options: UnscrambleOptions = {}
): UnscrambleResult {
  const { dictionary = 'enable' } = options
  const normalized = letters.toLowerCase().replace(/[^a-z]/g, '')
  const targetFreq = buildFreqMap(normalized)
  const wordMap = loadWordList(dictionary)

  const exactMatches: WordResult[] = []
  const partialByLength: Record<number, WordResult[]> = {}
  let totalCount = 0

  for (const [length, wordSet] of Array.from(wordMap)) {
    if (length > normalized.length) continue

    for (const word of Array.from(wordSet)) {
      const wordFreq = buildFreqMap(word)
      // Check partial: all letters of word exist in target
      let isPartial = true
      for (const [ch, count] of Array.from(wordFreq)) {
        if ((targetFreq.get(ch) ?? 0) < count) {
          isPartial = false
          break
        }
      }
      if (!isPartial) continue

      const result: WordResult = { word, length, points: scrabblePoints(word) }

      if (length === normalized.length && mapsEqual(wordFreq, targetFreq)) {
        exactMatches.push(result)
      } else if (length < normalized.length) {
        if (!partialByLength[length]) partialByLength[length] = []
        partialByLength[length].push(result)
        totalCount++
      }
    }
  }

  exactMatches.sort((a, b) => a.word.localeCompare(b.word))
  const wordsByLength: Record<number, WordResult[]> = {}

  if (exactMatches.length > 0) {
    wordsByLength[normalized.length] = exactMatches
    totalCount += exactMatches.length
  }

  for (const [len, words] of Object.entries(partialByLength)) {
    wordsByLength[Number(len)] = words.sort((a, b) => a.word.localeCompare(b.word))
  }

  return {
    wordsByLength,
    totalCount,
    inputLetters: letters.toUpperCase(),
    usedWildcards: false,
  }
}
