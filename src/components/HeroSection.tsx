export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy pt-20 pb-32">
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-5 bg-noise pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Letter tiles decoration */}
      <div className="absolute top-8 left-8 opacity-10 hidden lg:flex gap-2" aria-hidden="true">
        {['W', 'O', 'R', 'D'].map((l, i) => (
          <div
            key={l}
            className="letter-tile text-parchment bg-parchment/10 border border-parchment/20"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {l}
          </div>
        ))}
      </div>
      <div className="absolute top-8 right-8 opacity-10 hidden lg:flex gap-2" aria-hidden="true">
        {['G', 'A', 'M', 'E'].map((l, i) => (
          <div
            key={l}
            className="letter-tile text-parchment bg-parchment/10 border border-parchment/20"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {l}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Free · Instant · 173,000+ words
        </div>

        <h1 className="font-display font-bold text-parchment mb-4">
          <span className="block">Unscramble Any Word</span>
          <span className="block text-gradient bg-gradient-to-r from-gold to-gold-light bg-clip-text">
            Win Every Game
          </span>
        </h1>

        <p className="text-parchment/60 text-lg max-w-2xl mx-auto font-body leading-relaxed">
          The fastest Word Unscramble Pro for Scrabble, Words With Friends, Wordle and more.
          Find all valid words from your letters in milliseconds.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm text-parchment/40 font-body">
          {['Scrabble', 'Words With Friends', 'Wordle', 'Quordle', 'Wordfeud'].map((game) => (
            <span key={game} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gold/40" />
              {game}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
