import { unscrambleLetters, type UnscrambleOptions, type UnscrambleResult } from './unscramble'

export function scrambleWord(word: string): string {
  const arr = word.split('')
  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  // Ensure scrambled version differs from original (re-scramble if same)
  const scrambled = arr.join('')
  if (scrambled === word && word.length > 1) return scrambleWord(word)
  return scrambled
}

export function scrambleAndSolve(
  word: string,
  options: UnscrambleOptions = {}
): { scrambled: string; result: UnscrambleResult } {
  const scrambled = scrambleWord(word)
  const result = unscrambleLetters(scrambled, options)
  return { scrambled, result }
}

export { unscrambleLetters }
