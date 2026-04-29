import Database from 'better-sqlite3'
import { join } from 'path'

// Use a persistent database file
const dbPath = join(process.cwd(), 'page-visits.db')

// Initialize lazily
let db: Database.Database | null = null

function getDb() {
  if (!db) {
    db = new Database(dbPath)
    // Create tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS page_visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT UNIQUE NOT NULL,
        visit_count INTEGER DEFAULT 0,
        last_visited DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS session_visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        path TEXT NOT NULL,
        visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(session_id, path)
      );
    `)
  }
  return db
}

export interface PopularPage {
  path: string
  visit_count: number
}

// Track a page visit (only once per session)
export function trackPageVisit(sessionId: string, path: string): void {
  if (!path || !sessionId) return
  
  // Normalize path
  const normalizedPath = path.replace(/\/$/, '') || '/'
  
  try {
    const database = getDb()
    
    // Insert or update page_visits
    database.prepare(`
      INSERT INTO page_visits (path, visit_count, last_visited)
      VALUES (?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(path) DO UPDATE SET
        visit_count = visit_count + 1,
        last_visited = CURRENT_TIMESTAMP
    `).run(normalizedPath)
    
    // Track session visit (only one per session per page)
    database.prepare(`
      INSERT OR IGNORE INTO session_visits (session_id, path, visited_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `).run(sessionId, normalizedPath)
  } catch (error) {
    // Silently fail - don't break the page
  }
}

// Get popular pages
export function getPopularPages(limit: number = 10): PopularPage[] {
  try {
    const database = getDb()
    const stmt = database.prepare(`
      SELECT path, visit_count
      FROM page_visits
      ORDER BY visit_count DESC
      LIMIT ?
    `)
    return stmt.all(limit) as PopularPage[]
  } catch {
    return []
  }
}

// Generate a simple session ID
export function generateSessionId(): string {
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
}