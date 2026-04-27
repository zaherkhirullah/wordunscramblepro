import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { WordResult } from './word-engine/unscramble'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeLetters(input: string): string {
  // Allow a-z, A-Z, ? and *. Strip everything else. Max 15 chars.
  return input
    .replace(/[^a-zA-Z?*]/g, '')
    .toUpperCase()
    .slice(0, 15)
}

export function formatWordCount(count: number): string {
  if (count === 0) return 'No words found'
  if (count === 1) return '1 word found'
  return `${count.toLocaleString()} words found`
}

export function groupWordsByLength(words: WordResult[]): Record<number, WordResult[]> {
  const grouped: Record<number, WordResult[]> = {}
  for (const word of words) {
    if (!grouped[word.length]) grouped[word.length] = []
    grouped[word.length].push(word)
  }
  return grouped
}

export function capitalizeFirst(s: string): string {
  if (!s) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
