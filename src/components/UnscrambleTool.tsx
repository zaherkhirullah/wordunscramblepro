'use client'

import { useState } from 'react'
import UnscrambleForm from './UnscrambleForm'
import ResultsPanel from './ResultsPanel'
import type { UnscrambleResult } from '@/lib/word-engine/unscramble'

interface UnscrambleToolProps {
  defaultLetters?: string
  buttonLabel?: string
}

export default function UnscrambleTool({ defaultLetters, buttonLabel }: UnscrambleToolProps) {
  const [results, setResults] = useState<UnscrambleResult | null>(null)
  return (
    <>
      <UnscrambleForm
        onResults={setResults}
        defaultLetters={defaultLetters}
        autoSubmit={!!defaultLetters && defaultLetters.length >= 2}
        buttonLabel={buttonLabel}
      />
      <ResultsPanel results={results} />
    </>
  )
}
