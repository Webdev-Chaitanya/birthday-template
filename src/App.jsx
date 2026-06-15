
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Countdown from './components/Countdown'
import UnlockAnimation from './components/UnlockAnimation'
import BirthdayHero from './components/BirthdayHero'
import LetterSection from './components/LetterSection'
import PhotoGallery from './components/PhotoGallery'
import CakeSection from './components/CakeSection'
import HiddenMessages from './components/HiddenMessages'
import DateProposal from './components/DateProposal'
import FinalConfession from './components/FinalConfession'
import Fireworks from './components/Fireworks'

const TARGET_DATE = new Date('2026-06-16T00:00:00')

function getTimeLeft(target) {
  const now = new Date()
  const diff = Math.max(target - now, 0)
  const seconds = Math.floor(diff / 1000)
  return {
    total: diff,
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  }
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function ScreenControls({ onBack, onNext, nextDisabled = false, nextLabel = 'Continue →' }) {
  return (
    <div className="mt-8 flex w-full items-center justify-between gap-4">
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        ← Previous
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
          nextDisabled
            ? 'cursor-not-allowed bg-white/10 text-white/50'
            : 'bg-gradient-to-r from-[#ff6b9a] to-[#9f7aea] text-white shadow-[0_20px_70px_rgba(255,107,154,0.2)] hover:-translate-y-0.5 hover:shadow-[0_25px_110px_rgba(159,122,234,0.22)]'
        }`}
      >
        {nextLabel}
      </button>
    </div>
  )
}

function ScreenPanel({ children, controls }) {
  return (
    <div className="w-full max-w-4xl h-full max-h-screen flex flex-col gap-6 overflow-hidden screen-scroll">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="w-full min-h-full flex items-center justify-center">{children}</div>
      </div>
      <div className="flex-shrink-0">{controls}</div>
    </div>
  )
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('countdown')
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(TARGET_DATE))
  const [cakeCut, setCakeCut] = useState(false)
  const [revealedCount, setRevealedCount] = useState(0)
  const [proposalAnswer, setProposalAnswer] = useState(null)
  const [musicStarted, setMusicStarted] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchStartY, setTouchStartY] = useState(null)

  useEffect(() => {
    if (currentScreen !== 'countdown') return
    const interval = setInterval(() => {
      const next = getTimeLeft(TARGET_DATE)
      setTimeLeft(next)
      if (next.total <= 0) {
        clearInterval(interval)
        setCurrentScreen('unlock')
        window.setTimeout(() => setCurrentScreen('hero'), 3400)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [currentScreen])

  const formattedTime = useMemo(
    () => ({
      days: pad(timeLeft.days),
      hours: pad(timeLeft.hours),
      minutes: pad(timeLeft.minutes),
      seconds: pad(timeLeft.seconds),
    }),
    [timeLeft]
  )

  const handleHeroNext = () => {
    setMusicStarted(true)
    setCurrentScreen('letter')
  }

  const handleLetterNext = () => setCurrentScreen('gallery')
  const handleGalleryNext = () => setCurrentScreen('cake')
  const handleCakeCut = () => setCakeCut(true)
  const handleCakeNext = () => setCurrentScreen('hidden')
  const handleHiddenReveal = () => setRevealedCount((current) => Math.min(current + 1, 5))
  const handleHiddenNext = () => setCurrentScreen('proposal')
  const handleProposalAnswer = (answer) => setProposalAnswer(answer)
  const handleProposalNext = () => {
    if (proposalAnswer) {
      setCurrentScreen('confession')
    }
  }
  const handleConfessionNext = () => setCurrentScreen('ending')
  const handleEndingReplay = () => {
    setProposalAnswer(null)
    setCakeCut(false)
    setRevealedCount(0)
    setMusicStarted(false)
    setCurrentScreen('hero')
  }

  const canNavigateNext = () => {
    if (currentScreen === 'countdown' || currentScreen === 'unlock' || currentScreen === 'ending') return false
    if (currentScreen === 'cake' && !cakeCut) return false
    if (currentScreen === 'hidden' && revealedCount < 3) return false
    if (currentScreen === 'proposal' && !proposalAnswer) return false
    return true
  }

  const canNavigateBack = () => currentScreen !== 'countdown' && currentScreen !== 'unlock'

  const navigateNext = () => {
    if (!canNavigateNext()) return
    switch (currentScreen) {
      case 'hero':
        handleHeroNext()
        break
      case 'letter':
        handleLetterNext()
        break
      case 'gallery':
        handleGalleryNext()
        break
      case 'cake':
        handleCakeNext()
        break
      case 'hidden':
        handleHiddenNext()
        break
      case 'proposal':
        handleProposalNext()
        break
      case 'confession':
        handleConfessionNext()
        break
      default:
        break
    }
  }

  const navigateBack = () => {
    if (!canNavigateBack()) return
    handleBack()
  }

  const isInteractiveTarget = (target) =>
    Boolean(target.closest('button, a, input, textarea, select, label, [role="button"]'))

  const handleRootClick = (event) => {
    if (isInteractiveTarget(event.target)) return
    const width = window.innerWidth
    if (event.clientX > width * 0.6) {
      navigateNext()
    } else if (event.clientX < width * 0.4) {
      navigateBack()
    }
  }

  const handleTouchStart = (event) => {
    const touch = event.touches?.[0]
    if (!touch) return
    setTouchStartX(touch.clientX)
    setTouchStartY(touch.clientY)
  }

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches?.[0]
    if (!touch || touchStartX === null || touchStartY === null) return
    const deltaX = touch.clientX - touchStartX
    const deltaY = touch.clientY - touchStartY
    setTouchStartX(null)
    setTouchStartY(null)

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return
    if (deltaX > 0) {
      navigateBack()
    } else {
      navigateNext()
    }
  }

  const handleBack = () => {
    switch (currentScreen) {
      case 'hero':
        setCurrentScreen('countdown')
        break
      case 'letter':
        setCurrentScreen('hero')
        break
      case 'gallery':
        setCurrentScreen('letter')
        break
      case 'cake':
        setCurrentScreen('gallery')
        break
      case 'hidden':
        setCurrentScreen('cake')
        break
      case 'proposal':
        setCurrentScreen('hidden')
        break
      case 'confession':
        setCurrentScreen('proposal')
        break
      case 'ending':
        setCurrentScreen('confession')
        break
      default:
        break
    }
  }

  return (
    <div
      className="h-screen w-full overflow-hidden bg-[#0B1020] flex items-center justify-center px-4 text-white relative"
      onClick={handleRootClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      <AnimatePresence mode="wait">
        {currentScreen === 'countdown' && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <Countdown time={formattedTime} />
          </motion.div>
        )}

        {currentScreen === 'unlock' && (
          <motion.div
            key="unlock"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <UnlockAnimation />
          </motion.div>
        )}

        {currentScreen === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <ScreenPanel controls={<ScreenControls onBack={handleBack} onNext={handleHeroNext} />}>
              <BirthdayHero onNext={handleHeroNext} onBack={handleBack} hasOpened={false} />
            </ScreenPanel>
          </motion.div>
        )}

        {currentScreen === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <ScreenPanel controls={<ScreenControls onBack={handleBack} onNext={handleLetterNext} />}>
              <LetterSection onNext={handleLetterNext} onBack={handleBack} />
            </ScreenPanel>
          </motion.div>
        )}

        {currentScreen === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <ScreenPanel controls={<ScreenControls onBack={handleBack} onNext={handleGalleryNext} />}>
              <PhotoGallery onNext={handleGalleryNext} onBack={handleBack} />
            </ScreenPanel>
          </motion.div>
        )}

        {currentScreen === 'cake' && (
          <motion.div
            key="cake"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <ScreenPanel controls={<ScreenControls onBack={handleBack} onNext={handleCakeNext} nextDisabled={!cakeCut} />}>
              <CakeSection onCut={handleCakeCut} cut={cakeCut} onNext={handleCakeNext} onBack={handleBack} />
            </ScreenPanel>
          </motion.div>
        )}

        {currentScreen === 'hidden' && (
          <motion.div
            key="hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <ScreenPanel controls={<ScreenControls onBack={handleBack} onNext={handleHiddenNext} nextDisabled={revealedCount < 3} />}>
              <HiddenMessages onReveal={handleHiddenReveal} onNext={handleHiddenNext} onBack={handleBack} />
            </ScreenPanel>
          </motion.div>
        )}

        {currentScreen === 'proposal' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <ScreenPanel
              controls={
                <ScreenControls
                  onBack={handleBack}
                  onNext={handleProposalNext}
                  nextDisabled={!proposalAnswer}
                />
              }
            >
              <DateProposal
                onAnswer={handleProposalAnswer}
                onNext={handleProposalNext}
                onBack={handleBack}
                answer={proposalAnswer}
              />
            </ScreenPanel>
          </motion.div>
        )}

        {currentScreen === 'confession' && (
          <motion.div
            key="confession"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <ScreenPanel
              controls={
                <ScreenControls
                  onBack={handleBack}
                  onNext={handleConfessionNext}
                  nextLabel="Celebrate ✨"
                />
              }
            >
              <FinalConfession
                answer={proposalAnswer}
                onNext={handleConfessionNext}
                onBack={handleBack}
              />
            </ScreenPanel>
          </motion.div>
        )}

        {currentScreen === 'ending' && (
          <motion.div
            key="ending"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center w-full"
          >
            <ScreenPanel
              controls={
                <ScreenControls
                  onBack={handleBack}
                  onNext={handleEndingReplay}
                  nextLabel="Replay"
                />
              }
            >
              <div className="glass-card border-white/10 px-6 py-12 shadow-glow">
                <p className="text-xs uppercase tracking-[0.35em] text-pink-200/80">
                  Happy Birthday Tanviii ❤️
                </p>
                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
                  May your day glow with love, laughter, and magic.
                </h1>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                  This moment is just for you — a short celebration with warm wishes..
                </p>
              </div>
            </ScreenPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {currentScreen === 'ending' && <Fireworks />}
    </div>
  )
}
