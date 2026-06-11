import { useEffect } from 'react'

export default function Fireworks() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.style.position = 'fixed'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '40'
    document.body.appendChild(canvas)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = []
    const colors = ['#FF6B9A', '#9F7AEA', '#FFD166', '#FFFFFF']

    const random = (min, max) => Math.random() * (max - min) + min

    const create = () => {
      const x = random(canvas.width * 0.2, canvas.width * 0.8)
      const y = random(canvas.height * 0.15, canvas.height * 0.45)
      const hue = colors[Math.floor(random(0, colors.length))]
      for (let i = 0; i < 25; i += 1) {
        particles.push({
          x,
          y,
          vx: random(-3.5, 3.5),
          vy: random(-4.5, -1.5),
          alpha: 1,
          size: random(2, 5),
          color: hue,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const particle of particles) {
        ctx.save()
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const update = () => {
      if (particles.length < 120 && Math.random() < 0.08) {
        create()
      }
      for (const particle of particles) {
        particle.vy += 0.08
        particle.x += particle.vx
        particle.y += particle.vy
        particle.alpha -= 0.02
      }
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        if (particles[i].alpha <= 0) particles.splice(i, 1)
      }
      draw()
    }

    const frame = () => {
      update()
      requestAnimationFrame(frame)
    }
    frame()

    return () => {
      window.removeEventListener('resize', resize)
      document.body.removeChild(canvas)
    }
  }, [])

  return null
}
