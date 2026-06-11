import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const letter = [
  'Dear Tanviii,',
  'Today is all about celebrating someone truly special.',
  'I honestly don’t know when exactly it happened, but somewhere between our conversations and little moments, you became someone I genuinely look forward to hearing from.',
  'You have this beautiful way of making ordinary days feel lighter and happier.',
  'So, on your birthday, I just wanted to remind you how amazing you are.',
  'May this year bring you countless reasons to smile, endless happiness, and everything your heart wishes for.',
  'And hopefully… a few more conversations with me. 😌❤️',
  'Happy Birthday, Tanviii.',
  '— Chaitanya',
]

export default function LetterSection({ onNext, onBack }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')

  const fullText = useMemo(() => letter.join('\n\n'), [])

  useEffect(() => {
    setIndex(0)
    setDisplayed('')
    const interval = setInterval(() => {
      setIndex((current) => {
        const next = current + 1
        if (next > fullText.length) {
          clearInterval(interval)
          return current
        }
        setDisplayed(fullText.slice(0, next))
        return next
      })
    }, 28)
    return () => clearInterval(interval)
  }, [fullText])

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="glass-card border-white/10 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 shadow-glow"
    >
      <div className="max-w-xs sm:max-w-2xl lg:max-w-4xl space-y-6 sm:space-y-8">
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-pink-200/80">
            A letter from the heart
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            For the one who makes every day feel brighter.
          </h2>
        </div>

        <div className="text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-white/85 whitespace-pre-wrap font-light">
          {displayed}
        </div>
      </div>
    </motion.section>
  )
}
