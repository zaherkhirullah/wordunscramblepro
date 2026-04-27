import { loadWordList, type DictionaryType } from './loader'

export interface DictionaryCheckResult {
  word: string
  inNWL: boolean
  inCSW: boolean
  inENABLE: boolean
  inAnyDictionary: boolean
}

export async function checkWordInDictionary(word: string): Promise<DictionaryCheckResult> {
  const normalized = word.toLowerCase().trim()

  const [nwlMap, cswMap, enableMap] = await Promise.all([
    Promise.resolve(loadWordList('nwl')),
    Promise.resolve(loadWordList('csw')),
    Promise.resolve(loadWordList('enable')),
  ])

  const checkMap = (map: Map<number, Set<string>>, w: string): boolean => {
    const set = map.get(w.length)
    return set ? set.has(w) : false
  }

  const inNWL = checkMap(nwlMap, normalized)
  const inCSW = checkMap(cswMap, normalized)
  const inENABLE = checkMap(enableMap, normalized)

  return {
    word: normalized,
    inNWL,
    inCSW,
    inENABLE,
    inAnyDictionary: inNWL || inCSW || inENABLE,
  }
}
