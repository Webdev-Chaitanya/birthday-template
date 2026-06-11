import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const photoUrls = [
  '/photos/WhatsApp Image 2026-05-24 at 11.41.40 PM (1).jpeg',
  '/photos/WhatsApp Image 2026-05-24 at 11.41.40 PM.jpeg',
  '/photos/WhatsApp Image 2026-05-24 at 11.42.30 PM.jpeg',
]

export default function PhotoGallery({ onNext, onBack }) {
  const [active, setActive] = useState(0)
  const [touchStart, setTouchStart] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % photoUrls.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const prev = () => setActive((current) => (current - 1 + photoUrls.length) % photoUrls.length)
  const next = () => setActive((current) => (current + 1) % photoUrls.length)

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    if (touchStart === null) return
    const delta = event.changedTouches[0].clientX - touchStart
    if (delta > 40) prev()
    if (delta < -40) next()
    setTouchStart(null)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="glass-card border-white/10 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 shadow-glow"
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-pink-200/80">
            Our Beautiful Memories ✨
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            A softly glowing collection of moments.
          </h2>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-white/10 bg-[#091026]/80 p-2 sm:p-3 lg:p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.img
            key={photoUrls[active]}
            src={photoUrls[active]}
            alt={`Memory ${active + 1}`}
            className="h-[240px] sm:h-[320px] lg:h-[400px] w-full rounded-xl sm:rounded-2xl lg:rounded-[28px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          />

          <button
            type="button"
            onClick={prev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 sm:p-3 text-white/80 hover:text-white text-xs sm:text-sm shadow-lg transition"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 sm:p-3 text-white/80 hover:text-white text-xs sm:text-sm shadow-lg transition"
          >
            <FaChevronRight />
          </button>

          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2">
            {photoUrls.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                className={`h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full transition ${
                  index === active ? 'bg-pink-300 scale-125' : 'bg-white/20'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
