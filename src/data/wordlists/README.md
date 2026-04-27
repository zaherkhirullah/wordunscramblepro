# Word Lists

This directory contains the word lists used by the Word Unscrambler engine.

## Included Files

- `enable_sample.txt` — A built-in sample word list with ~3700+ words. Used as fallback when full dictionaries are not available.

## Setting Up Full Dictionaries

Run the setup script to download the full ENABLE (Enhanced North American Benchmark Lexicon) word list (~173,000 words):

```bash
npm run setup:wordlist
```

This will create:
- `enable.txt` — Full ENABLE dictionary
- `nwl.txt` — NWL (North American Scrabble Players Association Word List) — copy of enable
- `csw.txt` — Collins Scrabble Words — copy of enable

## Dictionaries

| Code | Name | Description |
|------|------|-------------|
| `enable` | ENABLE | Enhanced North American Benchmark Lexicon (~173k words) |
| `nwl` | NWL | North American Scrabble (TWL) word list |
| `csw` | CSW | Collins Scrabble Words (international) |

## Notes

- All dictionaries are stored as plain text files, one word per line, lowercase.
- The full word lists are not included in the repository. Run `npm run setup:wordlist` to download them.
- The sample wordlist (`enable_sample.txt`) is included and used as automatic fallback.
