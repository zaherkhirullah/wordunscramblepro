'use client'

import { useState, useCallback, useTransition, useEffect } from 'react'
import { sanitizeLetters } from '@/lib/utils'
import type { UnscrambleResult } from '@/lib/word-engine/unscramble'
import type { DictionaryType } from '@/lib/word-engine/loader'

interface FormState {
  letters: string
  dictionary: DictionaryType
  mustInclude: string
  startsWith: string
  endsWith: string
  showAdvanced: boolean
}

interface UnscrambleFormProps {
  onResults?: (results: UnscrambleResult | null) => void
  defaultLetters?: string
  autoSubmit?: boolean
  buttonLabel?: string
}

export default function UnscrambleForm({ onResults, defaultLetters = '', autoSubmit, buttonLabel }: UnscrambleFormProps) {
  const [state, setState] = useState<FormState>({
    letters: defaultLetters,
    dictionary: 'enable',
    mustInclude: '',
    startsWith: '',
    endsWith: '',
    showAdvanced: false,
  })
  const [results, setResults] = useState<UnscrambleResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleLettersChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeLetters(e.target.value)
    setState((prev) => ({ ...prev, letters: sanitized }))
  }, [])

  const performSearch = useCallback(
    async (lettersValue: string) => {
      if (!lettersValue || lettersValue.length < 2) {
        setError('Please enter at least 2 letters.')
        return
      }
      setError(null)

      startTransition(async () => {
        try {
          const response = await fetch('/api/unscramble', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              letters: lettersValue,
              dictionary: state.dictionary,
              mustInclude: state.mustInclude || undefined,
              startsWith: state.startsWith || undefined,
              endsWith: state.endsWith || undefined,
            }),
          })

          if (!response.ok) {
            const data = await response.json()
            setError(data.error || 'Something went wrong.')
            setResults(null)
            onResults?.(null)
            return
          }

          const data: UnscrambleResult = await response.json()
          setResults(data)
          onResults?.(data)
        } catch {
          setError('Network error. Please try again.')
          setResults(null)
          onResults?.(null)
        }
      })
    },
    [state, onResults]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      performSearch(state.letters)
    },
    [state.letters, performSearch]
  )

  useEffect(() => {
    if (autoSubmit && defaultLetters && defaultLetters.length >= 2) {
      performSearch(defaultLetters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClear = useCallback(() => {
    setState((prev) => ({ ...prev, letters: '', mustInclude: '', startsWith: '', endsWith: '' }))
    setResults(null)
    setError(null)
    onResults?.(null)
  }, [onResults])

  const letterCount = state.letters.replace(/[?*]/g, '').length
  const wildcardCount = state.letters.split('').filter((c) => c === '?' || c === '*').length

  return (
    <div className="bg-white rounded-2xl shadow-card border border-parchment-dark overflow-hidden">
      <form onSubmit={handleSubmit}>
        {/* Main input */}
        <div className="p-6 pb-0">
          <div className="relative flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={state.letters}
                onChange={handleLettersChange}
                placeholder="Enter letters to unscramble..."
                className="input-field pr-12 text-2xl font-display font-bold tracking-[0.25em]"
                maxLength={15}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Letters to unscramble"
              />
              {state.letters && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-parchment-dark hover:bg-gold/20 text-navy/50 hover:text-navy transition-colors"
                  aria-label="Clear input"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isPending || !state.letters || state.letters.length < 2}
              className="btn-primary px-8 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Searching...
                </span>
              ) : (
                buttonLabel ?? 'Unscramble'
              )}
            </button>
          </div>

          {/* Letter count indicators */}
          <div className="flex items-center gap-3 mt-2 px-1">
            <span className="text-xs text-navy/40 font-body">
              {letterCount} letter{letterCount !== 1 ? 's' : ''}
              {wildcardCount > 0 && `, ${wildcardCount} wildcard${wildcardCount !== 1 ? 's' : ''}`}
            </span>
            <span className="text-xs text-navy/30">
              Use ? or * as wildcards
            </span>
          </div>
        </div>

        {/* Dictionary selector */}
        <div className="px-6 py-4 flex items-center gap-4 border-b border-parchment-dark">
          <span className="text-sm font-medium text-navy/60 shrink-0">Dictionary:</span>
          <div className="flex gap-2">
            {(['enable', 'nwl', 'csw'] as DictionaryType[]).map((dict) => (
              <button
                key={dict}
                type="button"
                onClick={() => setState((prev) => ({ ...prev, dictionary: dict }))}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-150 ${
                  state.dictionary === dict
                    ? 'bg-navy text-parchment'
                    : 'bg-parchment-dark text-navy/60 hover:text-navy hover:bg-parchment'
                }`}
              >
                {dict.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setState((prev) => ({ ...prev, showAdvanced: !prev.showAdvanced }))}
            className="ml-auto text-sm text-navy/50 hover:text-gold-dark flex items-center gap-1 transition-colors"
          >
            Advanced filters
            <svg
              className={`w-4 h-4 transition-transform ${state.showAdvanced ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Advanced filters */}
        {state.showAdvanced && (
          <div className="px-6 py-4 bg-parchment/50 grid grid-cols-3 gap-4 animate-fade-in">
            {[
              { label: 'Must include', key: 'mustInclude', placeholder: 'e.g. ing' },
              { label: 'Starts with', key: 'startsWith', placeholder: 'e.g. un' },
              { label: 'Ends with', key: 'endsWith', placeholder: 'e.g. er' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-navy/60 mb-1">{label}</label>
                <input
                  type="text"
                  value={state[key as keyof typeof state] as string}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, [key]: e.target.value.toLowerCase() }))
                  }
                  placeholder={placeholder}
                  className="w-full px-3 py-2 rounded-lg border border-parchment-dark bg-white text-sm text-navy focus:outline-none focus:border-gold transition-colors"
                  maxLength={10}
                />
              </div>
            ))}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="px-6 py-3 bg-red-50 border-t border-red-100 text-sm text-red-700 animate-fade-in">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}
