import { NextResponse } from 'next/server'
import { getPopularPages } from '@/lib/page-visits'

export const dynamic = 'force-dynamic'

export async function GET() {
  const popular = getPopularPages(12)
  
  const pages = popular.map(p => ({
    href: p.path,
    label: p.path === '/' ? 'Home' : p.path.replace(/^\//, '').toUpperCase(),
    visits: p.visit_count
  }))
  
  return NextResponse.json({ pages })
}