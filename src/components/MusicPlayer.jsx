import { useEffect, useMemo, useState } from 'react'
import { FaMusic, FaPause, FaPlay } from 'react-icons/fa'

export default function MusicPlayer({ isReady, onInteract }) {
  const [playing, setPlaying] = useState(false)

  const audio = useMemo(() => {
    const track = new Audio('/music/background.mp3')
    track.loop = true
    track.volume = 0.7
    return track
  }, [])

  useEffect(() => {
    if (!isReady) return
    const playAudio = async () => {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
    playAudio()
  }, [isReady, audio])

  useEffect(() => {
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [audio])

  const toggle = async () => {
    onInteract()
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  return (
    <div className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 lg:right-8 z-30 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#101527]/95 p-3 sm:p-4 shadow-glow backdrop-blur-xl">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-white text-sm sm:text-base">
          <FaMusic />
        </div>
        <div className="hidden sm:block min-w-[9rem]">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60 leading-tight">
            music
          </p>
          <p className="text-xs sm:text-sm font-medium text-white/90 leading-tight">
            {playing ? 'Playing' : 'Tap to start'}
          </p>
        </div>
        <button
          type="button"
          onClick={toggle}
          className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#ff6b9a] to-[#9f7aea] text-white text-xs sm:text-sm shadow-[0_15px_40px_rgba(255,107,154,0.15)] hover:shadow-[0_20px_50px_rgba(255,107,154,0.2)] transition"
        >
          {playing ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  )
}
