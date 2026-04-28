import { getAllWords, getWordsByLength } from './word-engine/loader'
import type { DictionaryType } from './word-engine/loader'
import combosData from '../data/letter-combos.json'
import byLengthSEO from '../data/category-seo/by-length.json'
import containsSEO from '../data/category-seo/contains.json'
import startsWithSEO from '../data/category-seo/starts-with.json'
import endsWithSEO from '../data/category-seo/ends-with.json'
import comboTemplates from '../data/category-seo/combo-templates.json'

export interface CategorySEO {
  title: string
  description: string
  h1: string
  intro: string
  about: string
  tips: string[]
  keywords: string[]
}

export interface ComboWord {
  word: string
  length: number
  points: number
}

// ── Scrabble points ───────────────────────────────────────────────────────────

export function scrabblePoints(word: string): number {
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

// ── Word filter functions ─────────────────────────────────────────────────────

export function getWordsContaining(letter: string, dict: DictionaryType = 'enable'): string[] {
  const lc = letter.toLowerCase()
  return getAllWords(dict).filter(w => w.includes(lc))
}

export function getWordsStartingWith(prefix: string, dict: DictionaryType = 'enable'): string[] {
  const lc = prefix.toLowerCase()
  return getAllWords(dict).filter(w => w.startsWith(lc))
}

export function getWordsEndingWith(suffix: string, dict: DictionaryType = 'enable'): string[] {
  const lc = suffix.toLowerCase()
  return getAllWords(dict).filter(w => w.endsWith(lc))
}

export function getWordsByLengthSorted(length: number, dict: DictionaryType = 'enable'): string[] {
  return Array.from(getWordsByLength(length, dict)).sort()
}

function buildFreqMap(letters: string): Map<string, number> {
  const freq = new Map<string, number>()
  for (const ch of letters) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1)
  }
  return freq
}

function canFormWordFromLetters(word: string, letterFreq: Map<string, number>): boolean {
  const needed = buildFreqMap(word)
  for (const [ch, count] of needed) {
    if ((letterFreq.get(ch) ?? 0) < count) return false
  }
  return true
}

export function getComboWords(letters: string, dict: DictionaryType = 'enable'): ComboWord[] {
  const lc = letters.toLowerCase()
  const freq = buildFreqMap(lc)
  const allWords = getAllWords(dict)
  const results: ComboWord[] = []

  for (const word of allWords) {
    if (word.length < 2 || word.length > lc.length) continue
    if (canFormWordFromLetters(word, freq)) {
      results.push({ word, length: word.length, points: scrabblePoints(word) })
    }
  }

  results.sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length
    return a.word.localeCompare(b.word)
  })

  return results
}

export function getAllLetterCombos(): string[] {
  return combosData.combos
}

// ── Grouping helpers ──────────────────────────────────────────────────────────

export function groupWordsByFirstLetter(words: string[]): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  for (const word of words) {
    const key = word[0]
    if (!key) continue
    if (!result[key]) result[key] = []
    result[key].push(word)
  }
  return result
}

export function groupWordsByLength(words: string[]): Record<number, string[]> {
  const result: Record<number, string[]> = {}
  for (const word of words) {
    const len = word.length
    if (!result[len]) result[len] = []
    result[len].push(word)
  }
  return result
}

// ── SEO getters ───────────────────────────────────────────────────────────────

export function getLengthCategorySEO(length: number): CategorySEO {
  const data = (byLengthSEO as Record<string, CategorySEO>)[String(length)]
  if (!data) {
    return {
      title: `${length}-Letter Words`,
      description: `Browse all valid ${length}-letter words for Scrabble, Words With Friends and other word games.`,
      h1: `${length}-Letter Words`,
      intro: `Explore all valid ${length}-letter words in the ENABLE dictionary.`,
      about: `${length}-letter words offer a great balance of scoring potential and playability.`,
      tips: [`Look for common prefixes and suffixes to find ${length}-letter words quickly.`],
      keywords: [`${length} letter words`, `${length}-letter scrabble words`],
    }
  }
  return data
}

export function getLetterCategorySEO(letter: string, type: 'contains' | 'starts' | 'ends'): CategorySEO {
  const lc = letter.toLowerCase()
  let section: Record<string, CategorySEO>
  if (type === 'contains') {
    section = containsSEO as Record<string, CategorySEO>
  } else if (type === 'starts') {
    section = startsWithSEO as Record<string, CategorySEO>
  } else {
    section = endsWithSEO as Record<string, CategorySEO>
  }
  const data = section[lc]
  if (!data) {
    const typeLabel = type === 'contains' ? 'Containing' : type === 'starts' ? 'Starting With' : 'Ending With'
    return {
      title: `Words ${typeLabel} ${letter.toUpperCase()}`,
      description: `Browse all English words ${typeLabel.toLowerCase()} the letter ${letter.toUpperCase()}.`,
      h1: `Words ${typeLabel} ${letter.toUpperCase()}`,
      intro: `Find all words ${typeLabel.toLowerCase()} the letter ${letter.toUpperCase()}.`,
      about: `Words ${typeLabel.toLowerCase()} ${letter.toUpperCase()} span every length and difficulty level.`,
      tips: [`Use filters to narrow down words by length.`],
      keywords: [`words ${typeLabel.toLowerCase()} ${letter}`, `${letter} words`],
    }
  }
  return data
}

export function getComboCategorySEO(letters: string): CategorySEO {
  const upper = letters.toUpperCase()
  const count = letters.length

  // Get actual combo words for dynamic filling
  const words = getComboWords(letters)
  const wordCount = words.length
  const lengths = words.map(w => w.length)
  const minLen = lengths.length > 0 ? Math.min(...lengths) : 2
  const maxLen = lengths.length > 0 ? Math.max(...lengths) : count
  const shortWords = words.filter(w => w.length <= 3).slice(0, 2).map(w => w.word)
  const longWords = words.filter(w => w.length >= 5).slice(0, 1).map(w => w.word)
  const topByPoints = [...words].sort((a, b) => b.points - a.points)
  const topWord = topByPoints[0]?.word ?? ''
  const topPoints = topByPoints[0]?.points ?? 0
  const sampleShort = shortWords.join(', ') || 'short plays'
  const sampleLong = longWords[0] ?? 'longer plays'

  const templates = comboTemplates

  function fill(template: string): string {
    return template
      .replace(/{LETTERS}/g, upper)
      .replace(/{COUNT}/g, String(count))
      .replace(/{WORD_COUNT}/g, String(wordCount))
      .replace(/{MIN_LEN}/g, String(minLen))
      .replace(/{MAX_LEN}/g, String(maxLen))
      .replace(/{SAMPLE_SHORT}/g, sampleShort)
      .replace(/{SAMPLE_LONG}/g, sampleLong)
      .replace(/{TOP_WORD}/g, topWord.toUpperCase())
      .replace(/{TOP_POINTS}/g, String(topPoints))
  }

  const introIdx = count % templates.introTemplates.length
  const aboutIdx = count % templates.aboutTemplates.length
  const tip1Idx = 0
  const tip2Idx = 1 % templates.tipsTemplates.length
  const tip3Idx = 2 % templates.tipsTemplates.length

  const intro = fill(templates.introTemplates[introIdx])
  const about = fill(templates.aboutTemplates[aboutIdx])
  const tips = [
    fill(templates.tipsTemplates[tip1Idx]),
    fill(templates.tipsTemplates[tip2Idx]),
    fill(templates.tipsTemplates[tip3Idx]),
  ]

  const descBase = `Unscramble ${upper} to find ${wordCount} valid words for Scrabble and Words With Friends.`
  const description = descBase.length > 160 ? descBase.slice(0, 157) + '...' : descBase

  return {
    title: `Unscramble ${upper} – All Words From ${upper}`,
    description,
    h1: `Words Made From ${upper}`,
    intro,
    about,
    tips,
    keywords: [
      `unscramble ${letters}`,
      `words from ${letters}`,
      `${letters} anagram`,
      `${upper} word finder`,
      `scrabble words ${letters}`,
    ],
  }
}
