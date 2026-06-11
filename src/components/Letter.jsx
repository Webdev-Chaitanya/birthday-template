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

export default function LetterSection({ visible }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')

  const fullText = useMemo(() => letter.join('\n\n'), [])

  useEffect(() => {
    if (!visible) return
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
  }, [visible, fullText])

  if (!visible) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="glass-card border-white/10 px-6 py-10 shadow-glow"
    >
      <div className="max-w-4xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-pink-200/80">
            A letter from the heart
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            For the one who makes every day feel brighter.
          </h2>
        </div>

        <div className="prose prose-invert max-w-none text-base leading-8 text-white/85 whitespace-pre-wrap">
          {displayed}
        </div>
      </div>
    </motion.section>
  )
}
