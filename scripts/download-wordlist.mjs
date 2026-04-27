#!/usr/bin/env node
import { createWriteStream, mkdirSync } from 'fs'
import { get } from 'https'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { copyFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WORDLIST_URL = 'https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt'
const OUTPUT_DIR = join(__dirname, '../src/data/wordlists')

mkdirSync(OUTPUT_DIR, { recursive: true })

const enablePath = join(OUTPUT_DIR, 'enable.txt')
const nwlPath = join(OUTPUT_DIR, 'nwl.txt')
const cswPath = join(OUTPUT_DIR, 'csw.txt')

console.log('Downloading ENABLE wordlist from:', WORDLIST_URL)

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(destPath)
    get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close()
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject)
        return
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: HTTP ${response.statusCode}`))
        return
      }
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      file.close()
      reject(err)
    })
  })
}

try {
  await downloadFile(WORDLIST_URL, enablePath)
  console.log('Downloaded enable.txt successfully')

  copyFileSync(enablePath, nwlPath)
  console.log('Created nwl.txt (copy of enable)')

  copyFileSync(enablePath, cswPath)
  console.log('Created csw.txt (copy of enable)')

  console.log('\nWordlists created:')
  console.log('  src/data/wordlists/enable.txt')
  console.log('  src/data/wordlists/nwl.txt')
  console.log('  src/data/wordlists/csw.txt')
  console.log('\nDone! Run the app with: npm run dev')
} catch (err) {
  console.error('Error downloading wordlist:', err.message)
  console.log('Using built-in sample wordlist (enable_sample.txt) as fallback.')
  process.exit(1)
}
