import { motion } from 'framer-motion'

export default function UnlockAnimation() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#090d1f] bg-opacity-90 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="glass-card w-full max-w-xs sm:max-w-md lg:max-w-xl rounded-2xl sm:rounded-3xl lg:rounded-[32px] border-white/10 p-6 sm:p-8 lg:p-10 text-center shadow-glow"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-3 sm:space-y-4 lg:space-y-5"
        >
          <div className="mx-auto flex h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 items-center justify-center rounded-full bg-pink-500/15 text-2xl sm:text-3xl lg:text-4xl shadow-[0_20px_80px_rgba(255,107,154,0.18)]">
            ✨
          </div>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-pink-200/80 leading-tight">
            unlocking a beautiful surprise...
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white leading-tight">
            Happy Birthday Tanviii ❤️
          </h1>
          <p className="mx-auto max-w-xs sm:max-w-sm lg:max-w-md text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
            The moment has arrived — everything you were waiting for is now ready.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
