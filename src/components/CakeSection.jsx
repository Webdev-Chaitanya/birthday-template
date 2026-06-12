import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function CakeSection({ onCut, cut, onNext, onBack }) {
  const handleClick = () => {
    if (!cut) {
      confetti({
        particleCount: 90,
        startVelocity: 30,
        spread: 110,
        origin: { y: 0.45 },
        colors: ['#FF6B9A', '#9F7AEA', '#FFD166', '#FFFFFF'],
      })
      onCut()
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="glass-card border-white/10 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 shadow-glow"
    >
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-pink-200/80">
            Make a wish 🎂
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            Tap the cake to cut it.
          </h2>
          <p className="max-w-xs sm:max-w-xl text-sm sm:text-base text-white/80 leading-relaxed">
            Wishing you many many happy returns of the day.. have a year ahead filled with love, laughter, and all the things that make you happiest.
          </p>
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 text-white/80">
            {cut ? (
              <p className="font-medium text-sm sm:text-base text-pink-100">
                May all your wishes come true ❤️
              </p>
            ) : (
              <p className="font-medium text-sm sm:text-base text-white/80">
                Tap the cake and let the celebration begin.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center pt-4 sm:pt-0">
          <motion.button
            type="button"
            onClick={handleClick}
            whileTap={{ scale: 0.96 }}
            className="relative flex h-40 sm:h-48 lg:h-56 w-40 sm:w-48 lg:w-56 items-center justify-center rounded-3xl sm:rounded-[40px] border border-white/10 bg-[#120b22] p-4 sm:p-5 shadow-[0_30px_80px_rgba(159,122,234,0.2)]"
          >
            <div className="absolute inset-x-8 sm:inset-x-12 top-8 sm:top-10 h-4 sm:h-5 rounded-full bg-pink-400/20" />
            <div className="space-y-2 rounded-2xl sm:rounded-3xl bg-[#160d2d] px-5 sm:px-6 py-6 sm:py-8 text-center text-white shadow-[0_15px_60px_rgba(0,0,0,0.2)]">
              <span className="text-4xl sm:text-5xl block">🎂</span>
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/60">
                {cut ? 'Cut' : 'Cut Cake'}
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}
