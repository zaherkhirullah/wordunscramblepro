import { getWordsByLength, type DictionaryType } from './loader'

export interface WordleOptions {
  validLetters: string      // Letters that are in the word (yellow + green)
  placedLetters: string[]   // Exact positions known (array of 5, '' for unknown)
  badLetters: string        // Letters NOT in the word
  wordLength?: number
  dictionary?: DictionaryType
}

export function solveWordle(options: WordleOptions): string[] {
  const {
    validLetters = '',
    placedLetters = [],
    badLetters = '',
    wordLength = 5,
    dictionary = 'enable',
  } = options

  const wordSet = getWordsByLength(wordLength, dictionary)
  const validSet = new Set(validLetters.toLowerCase().split('').filter(Boolean))
  const badSet = new Set(badLetters.toLowerCase().split('').filter(Boolean))
  const placed = placedLetters.map((l) => l.toLowerCase())

  const results: string[] = []

  for (const word of Array.from(wordSet)) {
    // Must not contain any bad letters
    let skip = false
    for (const ch of Array.from(badSet)) {
      if (word.includes(ch)) { skip = true; break }
    }
    if (skip) continue

    // Must match placed letters
    let placedOk = true
    for (let i = 0; i < placed.length; i++) {
      if (placed[i] && word[i] !== placed[i]) { placedOk = false; break }
    }
    if (!placedOk) continue

    // Must contain all valid letters
    let validOk = true
    for (const ch of Array.from(validSet)) {
      if (!word.includes(ch)) { validOk = false; break }
    }
    if (!validOk) continue

    results.push(word)
  }

  return results.sort()
}
