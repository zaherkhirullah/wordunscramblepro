'use client'

import { useState, useTransition, useCallback, useRef } from 'react'

export default function WordleSolverTool() {
  const [placedLetters, setPlacedLetters] = useState<string[]>(['', '', '', '', ''])
  const [validLetters, setValidLetters] = useState('')
  const [badLetters, setBadLetters] = useState('')
  const [results, setResults] = useState<string[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null, null, null, null])

  const handlePositionChange = useCallback(
    (index: number, value: string) => {
      const letter = value.replace(/[^a-zA-Z]/g, '').slice(-1).toLowerCase()
      setPlacedLetters((prev) => {
        const next = [...prev]
        next[index] = letter
        return next
      })
      // Auto-advance to next input on valid letter entry
      if (letter && index < 4) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    []
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !placedLetters[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    },
    [placedLetters]
  )

  const handleSolve = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      startTransition(async () => {
        try {
          const response = await fetch('/api/wordle-solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              validLetters: validLetters.toLowerCase(),
              placedLetters,
              badLetters: badLetters.toLowerCase(),
            }),
          })
          if (!response.ok) {
            const data = await response.json()
            setError(data.error || 'Something went wrong.')
            return
          }
          const data = await response.json()
          setResults(data.words)
        } catch {
          setError('Network error. Please try again.')
        }
      })
    },
    [validLetters, placedLetters, badLetters]
  )

  const handleReset = useCallback(() => {
    setPlacedLetters(['', '', '', '', ''])
    setValidLetters('')
    setBadLetters('')
    setResults(null)
    setError(null)
    inputRefs.current[0]?.focus()
  }, [])

  const hasInput =
    placedLetters.some(Boolean) || validLetters.trim() || badLetters.trim()

  return (
    <div className="space-y-6">
      <form onSubmit={handleSolve} className="card space-y-6">
        {/* Green tiles — placed letters */}
        <div>
          <label className="block text-sm font-semibold text-navy/70 mb-1 font-body">
            🟩 Green Letters{' '}
            <span className="font-normal text-navy/40">— correct letter, correct position</span>
          </label>
          <p className="text-xs text-navy/40 font-body mb-3">
            Enter the letter you know is in that exact position.
          </p>
          <div className="flex gap-3">
            {placedLetters.map((letter, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-xs text-navy/40 font-body font-medium">{i + 1}</span>
                <input
                  ref={(el) => { inputRefs.current[i] = el }}
                  type="text"
                  value={letter.toUpperCase()}
                  onChange={(e) => handlePositionChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  maxLength={1}
                  className="w-14 h-14 text-center border-2 rounded-xl font-display font-bold text-2xl uppercase focus:outline-none transition-all duration-150 bg-white border-parchment-dark focus:border-forest focus:bg-forest/5 text-navy placeholder-navy/20"
                  placeholder="?"
                  aria-label={`Green letter position ${i + 1}`}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Yellow and Gray */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-navy/70 mb-1 font-body">
              🟨 Yellow Letters{' '}
              <span className="font-normal text-navy/40">— in word, wrong spot</span>
            </label>
            <input
              type="text"
              value={validLetters.toUpperCase()}
              onChange={(e) =>
                setValidLetters(
                  e.target.value
                    .replace(/[^a-zA-Z]/g, '')
                    .slice(0, 10)
                )
              }
              className="w-full px-4 py-3 border-2 border-parchment-dark rounded-xl font-display font-bold text-xl uppercase tracking-widest focus:outline-none focus:border-gold bg-white transition-colors text-navy"
              placeholder="e.g. AE"
              aria-label="Yellow letters — in word but wrong position"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <p className="text-xs text-navy/40 mt-1 font-body">
              Letters shown yellow in Wordle
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy/70 mb-1 font-body">
              ⬛ Gray Letters{' '}
              <span className="font-normal text-navy/40">— not in word</span>
            </label>
            <input
              type="text"
              value={badLetters.toUpperCase()}
              onChange={(e) =>
                setBadLetters(
                  e.target.value
                    .replace(/[^a-zA-Z]/g, '')
                    .slice(0, 26)
                )
              }
              className="w-full px-4 py-3 border-2 border-parchment-dark rounded-xl font-display font-bold text-xl uppercase tracking-widest focus:outline-none focus:border-gold bg-white transition-colors text-navy"
              placeholder="e.g. STR"
              aria-label="Gray letters — not in word at all"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <p className="text-xs text-navy/40 mt-1 font-body">
              Letters that turned gray/black
            </p>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm font-body bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending || !hasInput}
            className="btn-primary flex-1 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Solving…
              </span>
            ) : (
              'Find Wordle Words'
            )}
          </button>
          {hasInput && (
            <button
              type="button"
              onClick={handleReset}
              className="btn-outline px-6 py-3.5"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {/* Results */}
      {results !== null && (
        <div className="card animate-slide-up">
          {results.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">🤔</div>
              <p className="text-navy/60 font-body font-medium">No words match your constraints.</p>
              <p className="text-sm text-navy/40 mt-1 font-body">
                Double-check your inputs or try removing some filters.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-navy text-lg">
                  {results.length.toLocaleString()} possible word
                  {results.length !== 1 ? 's' : ''}
                </h3>
                <span className="tag-gold text-xs">5-letter</span>
              </div>
              <div className="flex flex-wrap gap-2 word-results-section">
                {results.map((word) => (
                  <span
                    key={word}
                    className="word-card cursor-default"
                  >
                    <span className="font-display font-semibold text-navy uppercase tracking-wide text-sm">
                      {word}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
