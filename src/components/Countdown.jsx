import { motion } from 'framer-motion'

export default function Countdown({ time }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-[#090d1f] text-white w-full relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,107,154,0.12),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(159,122,234,0.14),transparent_20%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px);background-size:20px_20px]" />
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            className="absolute block rounded-full bg-white/40 blur-sm"
            style={{
              width: `${8 + index * 4}px`,
              height: `${8 + index * 4}px`,
              top: `${(index * 9) % 90}%`,
              left: `${(index * 13) % 90}%`,
              animation: `floaty 12s ease-in-out ${index * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full items-center justify-center text-center">
        <div className="w-full max-w-4xl border border-red-500">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="glass-card w-full border-white/10 px-4 sm:px-6 py-8 sm:py-12 shadow-glow mx-auto"
          >
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-pink-200/70 leading-relaxed">
            Something magical is waiting for you ❤️
          </p>
          <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-white">
            Countdown to the moment
          </h1>
          <p className="mx-auto mt-3 sm:mt-4 max-w-xs sm:max-w-md lg:max-w-xl text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
            The night is soft, the stars are near, and the surprise is almost here.
          </p>

          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {['days', 'hours', 'minutes', 'seconds'].map((label) => (
              <motion.div
                key={label}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 px-3 sm:px-5 py-4 sm:py-6"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">{time[label]}</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/60">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </section>
  )
}
