import type { MetadataRoute } from 'next'
import combosData from '@/data/letter-combos.json'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Static pages use a fixed date so the sitemap doesn't change every build
const staticDate = new Date('2026-04-26')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Homepage ─────────────────────────────────────────────────────────────
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // ── Main tool pages ───────────────────────────────────────────────────────
    {
      url: `${siteUrl}/descrambler`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/word-scramble`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/anagram-solver`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/wordle-solver`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/quordle-solver`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/wordfeud-helper`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/check-dictionary`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/word-checker`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/random-word-generator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/scrabble-word-finder`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/words-with-friends`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // ── Word list pages ───────────────────────────────────────────────────────
    {
      url: `${siteUrl}/two-letter-words`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/word-lists`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/word-lists/3-letter`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/word-lists/4-letter`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/word-lists/5-letter`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/word-lists/q-without-u`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/word-lists/high-value`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // ── Info pages ────────────────────────────────────────────────────────────
    {
      url: `${siteUrl}/about`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: staticDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: staticDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: staticDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // ── Hub pages ─────────────────────────────────────────────────────────────
    { url: `${siteUrl}/categories`, lastModified: staticDate, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${siteUrl}/words`, lastModified: staticDate, changeFrequency: 'monthly' as const, priority: 0.7 },

    // ── Words containing letter (a-z) ─────────────────────────────────────────
    ...'abcdefghijklmnopqrstuvwxyz'.split('').map(l => ({
      url: `${siteUrl}/words/containing/${l}`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    // ── Words starting with letter (a-z) ──────────────────────────────────────
    ...'abcdefghijklmnopqrstuvwxyz'.split('').map(l => ({
      url: `${siteUrl}/words/starting-with/${l}`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    // ── Words ending with letter (a-z) ────────────────────────────────────────
    ...'abcdefghijklmnopqrstuvwxyz'.split('').map(l => ({
      url: `${siteUrl}/words/ending-with/${l}`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    // ── Dynamic word lists for specific lengths ────────────────────────────────
    ...[2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(n => ({
      url: `${siteUrl}/word-lists/${n}`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    // ── Combo unscramble pages ────────────────────────────────────────────────
    ...combosData.combos.map(c => ({
      url: `${siteUrl}/unscramble/${c}`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
