const steps = [
  {
    step: '01',
    title: 'Enter Your Letters',
    description:
      'Type the letters you want to unscramble. Use ? for blank tiles. Up to 15 letters supported.',
  },
  {
    step: '02',
    title: 'Choose Your Game',
    description:
      'Select ENABLE, NWL (Scrabble NA) or CSW (Collins/International) dictionary for accurate results.',
  },
  {
    step: '03',
    title: 'Get All Valid Words',
    description:
      'Instantly see every word grouped by length, with Scrabble point values. Click any word to verify.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-navy py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="font-display font-bold text-parchment text-center mb-2">How It Works</h2>
        <p className="text-parchment/50 text-center mb-12 font-body">
          Three simple steps to find every possible word.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/20 text-gold font-display font-bold text-xl mb-4">
                {s.step}
              </div>
              <h3 className="font-display font-semibold text-parchment text-lg mb-2">{s.title}</h3>
              <p className="text-parchment/50 text-sm font-body leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
