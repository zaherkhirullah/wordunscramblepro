'use client'

import { useState, useTransition, useCallback, useEffect } from 'react'
import type { DictionaryCheckResult } from '@/lib/word-engine/dictionary'

interface DictionaryCheckerToolProps {
  initialWord?: string
}

export default function DictionaryCheckerTool({ initialWord }: DictionaryCheckerToolProps) {
  const [word, setWord] = useState(initialWord ?? '')
  const [result, setResult] = useState<DictionaryCheckResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const performCheck = useCallback(async (wordToCheck: string) => {
    const trimmed = wordToCheck.trim()
    if (!trimmed || trimmed.length < 2) {
      setError('Please enter at least 2 letters.')
      return
    }
    if (!/^[a-zA-Z]+$/.test(trimmed)) {
      setError('Only letters a–z are allowed.')
      return
    }
    setError(null)
    setResult(null)

    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/check-dictionary?word=${encodeURIComponent(trimmed.toLowerCase())}`
        )
        if (!res.ok) {
          const data = await res.json()
          setError(data.error || 'Something went wrong.')
          return
        }
        const data: DictionaryCheckResult = await res.json()
        setResult(data)
      } catch {
        setError('Network error. Please try again.')
      }
    })
  }, [])

  const handleCheck = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = word.trim()
      if (!trimmed || trimmed.length < 2) {
        setError('Please enter at least 2 letters.')
        return
      }
      if (!/^[a-zA-Z]+$/.test(trimmed)) {
        setError('Only letters a–z are allowed.')
        return
      }
      performCheck(trimmed)
    },
    [word, performCheck]
  )

  useEffect(() => {
    if (initialWord?.trim()) {
      setWord(initialWord)
      performCheck(initialWord.trim())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClear = useCallback(() => {
    setWord('')
    setResult(null)
    setError(null)
  }, [])

  return (
    <div className="space-y-6">
      <form onSubmit={handleCheck} className="card">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={word.toUpperCase()}
              onChange={(e) =>
                setWord(e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 15))
              }
              placeholder="Enter a word to check…"
              className="w-full px-4 py-3.5 border-2 border-parchment-dark rounded-xl font-display font-bold text-2xl uppercase tracking-[0.15em] text-navy focus:outline-none focus:border-gold bg-white transition-colors placeholder-navy/20"
              maxLength={15}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Word to check in dictionary"
            />
            {word && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-parchment-dark hover:bg-gold/20 text-navy/50 hover:text-navy transition-colors"
                aria-label="Clear"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending || word.trim().length < 2}
            className="btn-primary px-8 py-3.5 text-base shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Checking…' : 'Check Word'}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-red-600 text-sm font-body bg-red-50 border border-red-100 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}
      </form>

      {result && (
        <div className="card animate-slide-up space-y-5">
          {/* Overall verdict */}
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-display font-bold shrink-0 ${
                result.inAnyDictionary
                  ? 'bg-forest/10 text-forest border-2 border-forest/20'
                  : 'bg-red-50 text-red-500 border-2 border-red-200'
              }`}
            >
              {result.inAnyDictionary ? '✓' : '✗'}
            </div>
            <div>
              <p className="font-display font-bold text-navy text-xl uppercase tracking-wide">
                {result.word}
              </p>
              <p
                className={`font-body text-sm font-medium ${
                  result.inAnyDictionary ? 'text-forest' : 'text-red-500'
                }`}
              >
                {result.inAnyDictionary
                  ? 'Valid word — found in at least one dictionary'
                  : 'Not found in any dictionary'}
              </p>
            </div>
          </div>

          {/* Per-dictionary breakdown */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'NWL', subtitle: 'Scrabble NA', valid: result.inNWL },
              { label: 'CSW', subtitle: 'Collins Intl', valid: result.inCSW },
              { label: 'ENABLE', subtitle: 'Standard', valid: result.inENABLE },
            ].map(({ label, subtitle, valid }) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-colors ${
                  valid
                    ? 'bg-forest/5 border-forest/25 text-forest'
                    : 'bg-parchment-dark/40 border-parchment-dark text-navy/40'
                }`}
              >
                <span
                  className={`text-xl font-bold ${valid ? 'text-forest' : 'text-navy/30'}`}
                >
                  {valid ? '✓' : '✗'}
                </span>
                <span className="font-display font-bold text-sm">{label}</span>
                <span className="text-[11px] font-body opacity-70">{subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
