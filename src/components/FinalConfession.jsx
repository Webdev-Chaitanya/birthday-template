import { motion } from 'framer-motion'

export default function FinalConfession({ answer, onNext, onBack }) {
  const message =
    answer === 'yes'
      ? 'Yay! Looking forward to it ☕✨'
      : 'Fair enough... but the invitation stays open ☕✨'

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="glass-card border-white/10 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 shadow-glow"
    >
      <div className="space-y-6 sm:space-y-8">
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-pink-200/80">
            Final Confession
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight">
            Maybe this website started as a birthday surprise.
          </h2>
        </div>

        <div className="rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-white/10 bg-[#0f1222]/80 p-5 sm:p-6 lg:p-8 text-sm sm:text-base text-white/90 space-y-3 sm:space-y-4 leading-7 sm:leading-8">
          <p>
            But while making it, I realized it was also my way of telling you that you've become someone genuinely important to me.
          </p>
          <p>
            No pressure. No expectations. Just honesty.
          </p>
          <p>
            And regardless of your answer... I'm really grateful that our paths crossed.
          </p>
          <p className="text-lg sm:text-xl font-semibold text-pink-100 pt-2 sm:pt-4">Happy Birthday, Tanviii ❤️</p>
          <p className="text-xs sm:text-sm text-white/70">— Chaitanya</p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#120b2d]/80 p-4 sm:p-5 lg:p-6 text-center">
          <p className="text-sm sm:text-base font-medium text-white leading-relaxed">{message}</p>
        </div>
      </div>
    </motion.section>
  )
}
