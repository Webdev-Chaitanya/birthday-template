import { motion } from 'framer-motion'

export default function DateProposal({ onAnswer, onNext, onBack, answer }) {
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
            One last thing...
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white leading-tight">
            If this website made you smile even a little, would you like to go for coffee with me tomorrow? ☕❤️
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => onAnswer('yes')}
            className="rounded-full bg-gradient-to-r from-[#ff6b9a] to-[#9f7aea] px-5 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white shadow-[0_20px_70px_rgba(255,107,154,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_25px_110px_rgba(159,122,234,0.22)] whitespace-nowrap"
          >
            YES ❤️
          </button>
          <button
            type="button"
            onClick={() => onAnswer('time')}
            className="rounded-full border border-white/15 bg-white/5 px-5 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10 whitespace-nowrap"
          >
            I Need Time 😌
          </button>
        </div>
      </div>
    </motion.section>
  )
}
