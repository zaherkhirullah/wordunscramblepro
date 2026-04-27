/** @type {import('next').NextConfig} */

// Content-Security-Policy
// NOTE: 'unsafe-inline' for scripts is required by Google AdSense. Without it
// AdSense injected scripts will be blocked. This is a known trade-off when
// running ad-funded sites — the CSP still blocks third-party script origins
// that are not explicitly listed here, which provides meaningful protection.
const cspDirectives = [
  "default-src 'self'",

  // Scripts: self + AdSense/Analytics/GTM (all require unsafe-inline)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagmanager.com https://www.google-analytics.com https://partner.googleadservices.com https://adservice.google.com https://tpc.googlesyndication.com",

  // Styles: self + Google Fonts + unsafe-inline (required by Tailwind CSS)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

  // Fonts
  "font-src 'self' https://fonts.gstatic.com",

  // Images: self + data URIs + AdSense tracking pixels
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com",

  // Frames: AdSense iframes
  "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com",

  // No framing of this site by external origins
  "frame-ancestors 'none'",

  // XHR/fetch: self + Analytics beacon endpoints
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",

  // Block all plugins (Flash etc.)
  "object-src 'none'",

  // Restrict <base> tag to prevent base-tag injection
  "base-uri 'self'",

  // Prevent form submissions to external origins
  "form-action 'self'",
].join('; ')

// CORS: restrict API routes to same origin by default.
// In production set NEXT_PUBLIC_SITE_URL to the canonical origin so that
// cross-origin requests from your own domain are still allowed while
// third-party callers are rejected.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '*'

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      // Security headers applied to every response
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspDirectives },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // HSTS: tell browsers to always use HTTPS for 1 year (enable once TLS
          // is confirmed — remove the Strict-Transport-Security line if still
          // testing over plain HTTP locally).
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      // CORS headers restricted to API routes only
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: siteUrl,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ]
  },
}
export default nextConfig
