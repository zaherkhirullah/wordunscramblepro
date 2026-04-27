'use client'

import { useState, useTransition, useCallback } from 'react'
import type { RandomWordResult } from '@/lib/word-engine/random'

export default function RandomWordTool() {
  const [count, setCount] = useState(20)
  const [minLength, setMinLength] = useState(4)
  const [maxLength, setMaxLength] = useState(8)
  const [startsWith, setStartsWith] = useState('')
  const [endsWith, setEndsWith] = useState('')
  const [words, setWords] = useState<RandomWordResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleGenerate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      const params = new URLSearchParams({
        count: String(count),
        minLength: String(minLength),
        maxLength: String(maxLength),
      })
      if (startsWith.trim()) params.set('startsWith', startsWith.trim().toLowerCase())
      if (endsWith.trim()) params.set('endsWith', endsWith.trim().toLowerCase())

      startTransition(async () => {
        try {
          const res = await fetch(`/api/random-words?${params.toString()}`)
          if (!res.ok) {
            const data = await res.json()
            setError(data.error || 'Something went wrong.')
            return
          }
          const data: { words: RandomWordResult[] } = await res.json()
          setWords(data.words)
        } catch {
          setError('Network error. Please try again.')
        }
      })
    },
    [count, minLength, maxLength, startsWith, endsWith]
  )

  return (
    <div className="space-y-6">
      <form onSubmit={handleGenerate} className="card space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Count */}
          <div>
            <label className="block text-sm font-medium text-navy/60 mb-1.5 font-body">
              Number of words
            </label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-parchment-dark rounded-lg text-navy font-body bg-white focus:outline-none focus:border-gold transition-colors"
            >
              {[5, 10, 15, 20, 25, 30, 50, 75, 100].map((n) => (
                <option key={n} value={n}>
                  {n} words
                </option>
              ))}
            </select>
          </div>

          {/* Min length */}
          <div>
            <label className="block text-sm font-medium text-navy/60 mb-1.5 font-body">
              Min letter length
            </label>
            <select
              value={minLength}
              onChange={(e) => setMinLength(Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-parchment-dark rounded-lg text-navy font-body bg-white focus:outline-none focus:border-gold transition-colors"
            >
              {Array.from({ length: 14 }, (_, i) => i + 2).map((n) => (
                <option key={n} value={n}>
                  {n} letters
                </option>
              ))}
            </select>
          </div>

          {/* Max length */}
          <div>
            <label className="block text-sm font-medium text-navy/60 mb-1.5 font-body">
              Max letter length
            </label>
            <select
              value={maxLength}
              onChange={(e) => setMaxLength(Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-parchment-dark rounded-lg text-navy font-body bg-white focus:outline-none focus:border-gold transition-colors"
            >
              {Array.from({ length: 14 }, (_, i) => i + 2).map((n) => (
                <option key={n} value={n}>
                  {n} letters
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy/60 mb-1.5 font-body">
              Starts with (optional)
            </label>
            <input
              type="text"
              value={startsWith}
              onChange={(e) =>
                setStartsWith(e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 5))
              }
              placeholder="e.g. un"
              className="w-full px-3 py-2.5 border border-parchment-dark rounded-lg text-navy font-body focus:outline-none focus:border-gold transition-colors bg-white"
              maxLength={5}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy/60 mb-1.5 font-body">
              Ends with (optional)
            </label>
            <input
              type="text"
              value={endsWith}
              onChange={(e) =>
                setEndsWith(e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 5))
              }
              placeholder="e.g. ing"
              className="w-full px-3 py-2.5 border border-parchment-dark rounded-lg text-navy font-body focus:outline-none focus:border-gold transition-colors bg-white"
              maxLength={5}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm font-body bg-red-50 border border-red-100 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
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
              Generating…
            </span>
          ) : (
            'Generate Random Words'
          )}
        </button>
      </form>

      {words !== null && (
        <div className="card animate-slide-up">
          {words.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-navy/60 font-body">
                No words found matching those criteria.
              </p>
              <p className="text-sm text-navy/40 mt-1 font-body">
                Try widening the length range or removing filters.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-navy">
                  {words.length} random word{words.length !== 1 ? 's' : ''}
                </h3>
                <button
                  type="button"
                  onClick={() => setWords(null)}
                  className="text-xs text-navy/40 hover:text-navy/70 transition-colors font-body"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2 word-results-section">
                {words.map(({ word, length }) => (
                  <a
                    key={word}
                    href={`/check-dictionary?word=${encodeURIComponent(word)}`}
                    className="word-card"
                    title={`Check "${word}" in dictionary`}
                  >
                    <span className="font-display font-semibold text-navy uppercase tracking-wide text-sm">
                      {word}
                    </span>
                    <span className="text-[10px] text-navy/40 font-body">{length}L</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
