import { motion } from 'framer-motion'

export default function BirthdayHero({ onNext, onBack, hasOpened }) {
  return (
    <section className="flex h-full flex-col items-center justify-center w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,107,154,0.16),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(159,122,234,0.14),transparent_20%)]" />
      <div className="relative mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="glass-card border-white/10 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 shadow-glow"
        >
          <div className="space-y-4 sm:space-y-6 text-center">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-pink-200/80">
              A quiet celebration for a bright soul
            </p>
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-white">
                Happy Birthday Tanviii ❤️
              </h1>
              {/* <p className="mx-auto max-w-xs sm:max-w-md lg:max-w-2xl text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
                The universe became prettier on this day because you were born ✨
              </p> */}
            </div>
            <button
              type="button"
              onClick={onNext}
              className="glow-button mx-auto block rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-white shadow-[0_20px_80px_rgba(255,107,154,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_25px_110px_rgba(159,122,234,0.22)] disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
              disabled={hasOpened}
            >
              {hasOpened ? 'Surprise opened' : 'Open Your Surprise'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
