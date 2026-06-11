import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

const messages = [
  'Your smile is really pretty. ❤️',
  'You deserve all the happiness in the world. ✨',
  'Thank you for being you. 🌸',
  'You make conversations feel effortless. ☕',
  'I hope this birthday becomes unforgettable. 🎂',
]

export default function HiddenMessages({ onReveal, onNext, onBack }) {
  const [revealed, setRevealed] = useState([])
  const [selectedMessage, setSelectedMessage] = useState('')

  const stars = useMemo(
    () => Array.from({ length: 5 }, (_, index) => ({ id: index, message: messages[index] })),
    []
  )

  const handleClick = (id) => {
    if (!revealed.includes(id)) {
      setRevealed((current) => [...current, id])
      onReveal()
    }
    setSelectedMessage(messages[id])
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="h-full min-h-0 overflow-hidden flex flex-col justify-center glass-card border-white/10 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 shadow-glow"
    >
      <div className="h-full min-h-0 flex flex-col justify-between gap-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-pink-200/80">
              Hidden Messages
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
              A starry note from the heart.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap">
            {stars.map((star) => (
              <motion.button
                key={star.id}
                type="button"
                onClick={() => handleClick(star.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative flex h-20 sm:h-24 lg:h-28 w-full flex-col items-center justify-center rounded-xl sm:rounded-2xl lg:rounded-[28px] border border-white/10 p-3 sm:p-4 text-center transition ${
                  revealed.includes(star.id)
                    ? 'bg-[#ff6b9a]/15 text-pink-100'
                    : 'bg-white/5 text-white/80'
                }`}
              >
                <span className="text-2xl sm:text-3xl leading-none">✨</span>
                <span className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium tracking-[0.04em] leading-tight">
                  {revealed.includes(star.id) ? 'Revealed' : 'Tap'}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-8 min-h-[140px] sm:min-h-[160px] w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex items-center justify-center">
          {selectedMessage ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-base sm:text-lg leading-7 sm:leading-8 text-white/90"
            >
              {selectedMessage}
            </motion.p>
          ) : (
            <p className="text-center text-sm sm:text-base text-white/50">
              Tap a star to reveal a message ✨
            </p>
          )}
        </div>
      </div>
    </motion.section>
  )
}
