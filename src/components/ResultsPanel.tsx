'use client'

import { formatWordCount } from '@/lib/utils'
import type { UnscrambleResult, WordResult } from '@/lib/word-engine/unscramble'
import { useState } from 'react'

interface ResultsPanelProps {
  results?: UnscrambleResult | null
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const [activeLength, setActiveLength] = useState<number | null>(null)
  const [checkedWords, setCheckedWords] = useState<Record<string, boolean | null>>({})

  if (!results) return null

  const lengths = Object.keys(results.wordsByLength)
    .map(Number)
    .sort((a, b) => b - a)

  const displayLength = activeLength ?? lengths[0] ?? null
  const displayWords: WordResult[] = displayLength ? results.wordsByLength[displayLength] ?? [] : []

  const handleWordClick = async (word: string) => {
    if (checkedWords[word] !== undefined) return
    setCheckedWords((prev) => ({ ...prev, [word]: null }))
    try {
      const res = await fetch(`/api/check-dictionary?word=${encodeURIComponent(word)}`)
      const data = await res.json()
      setCheckedWords((prev) => ({ ...prev, [word]: data.inAnyDictionary ?? false }))
    } catch {
      setCheckedWords((prev) => ({ ...prev, [word]: false }))
    }
  }

  return (
    <div className="mt-6 animate-slide-up">
      {/* Summary bar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-navy">
          {formatWordCount(results.totalCount)}
        </h2>
        <span className="text-sm text-navy/50 font-body">
          from <span className="font-semibold text-navy">{results.inputLetters}</span>
        </span>
      </div>

      {results.totalCount === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-navy/60 font-body">No words found for these letters.</p>
          <p className="text-sm text-navy/40 mt-1">Try adding a wildcard (?) or using fewer letters.</p>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          {/* Length tabs */}
          <div className="flex gap-1 p-3 bg-parchment/50 border-b border-parchment-dark overflow-x-auto">
            {lengths.map((len) => {
              const count = results.wordsByLength[len]?.length ?? 0
              return (
                <button
                  key={len}
                  onClick={() => setActiveLength(len)}
                  className={`shrink-0 flex flex-col items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                    displayLength === len
                      ? 'bg-navy text-parchment'
                      : 'bg-white text-navy/60 hover:text-navy border border-parchment-dark hover:border-gold/40'
                  }`}
                >
                  <span className="font-bold text-sm">{len}</span>
                  <span className="opacity-70">{count}</span>
                </button>
              )
            })}
          </div>

          {/* Word grid */}
          <div className="p-4 word-results-section">
            <div className="flex flex-wrap gap-2">
              {displayWords.map(({ word }) => (
                <button
                  key={word}
                  onClick={() => handleWordClick(word)}
                  title={`Click to verify "${word}" in dictionary`}
                  className={`word-card group ${
                    checkedWords[word] === true
                      ? 'border-forest bg-forest/5'
                      : checkedWords[word] === false
                      ? 'border-red-300 bg-red-50/50'
                      : ''
                  }`}
                >
                  <span className="font-display font-semibold text-navy uppercase tracking-wide text-sm">
                    {word}
                  </span>
                  {checkedWords[word] === null && (
                    <span className="text-[9px] text-navy/30 mt-0.5 animate-pulse">checking…</span>
                  )}
                  {checkedWords[word] === true && (
                    <span className="text-[9px] text-forest font-medium mt-0.5">✓ valid</span>
                  )}
                  {checkedWords[word] === false && (
                    <span className="text-[9px] text-red-500 font-medium mt-0.5">✗ not found</span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-navy/30 mt-3 font-body">Click any word to verify it in the dictionary.</p>
          </div>
        </div>
      )}
    </div>
  )
}
