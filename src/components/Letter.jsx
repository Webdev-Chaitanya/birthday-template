import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const letter = [
  'Dear Tanviii,',
  'Today is all about celebrating your special day.',
  'Honestly i dont know how u r going to react, but its been more than month we meet on JS. Aple small talks & one meet tell me so much about u. Beetweeen those days i get to know that u r very mature, smart, honest, genuine, understanding, little angry but beautiful women.',
  'I love the way u focused in ur work, aswell tu tuji life enjoy he krtes that makes u differant from others. I really admire that quality in u.',
  'So, on your birthday, I just wanted to remind you how amazing personality u have.❤️',
  'May this year bring you countless reasons to smile, endless happiness, and everything u wat to achieve.',
  'And hopefully… Thode ajun conversations & connect with me to feel u spacial. 😌❤️',
  'Happiest Birthday to youuu, Tanviii.',
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
