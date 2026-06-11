import fs from 'fs'
import lamejs from 'lamejs'

const sampleRate = 44100
const durationSeconds = 8
const numSamples = sampleRate * durationSeconds
const maxSample = 32767
const samples = new Int16Array(numSamples)

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate
  const tone1 = Math.sin(2 * Math.PI * 220 * t) * 0.22
  const tone2 = Math.sin(2 * Math.PI * 330 * t) * 0.16
  const tone3 = Math.sin(2 * Math.PI * 550 * t) * 0.1
  const value = tone1 + tone2 + tone3
  samples[i] = Math.max(-1, Math.min(1, value)) * maxSample
}

const mp3encoder = new lamejs.Mp3Encoder(1, sampleRate, 128)
const chunkSize = 1152
const mp3Data = []

for (let i = 0; i < samples.length; i += chunkSize) {
  const chunk = samples.subarray(i, i + chunkSize)
  const mp3buf = mp3encoder.encodeBuffer(chunk)
  if (mp3buf.length > 0) mp3Data.push(Buffer.from(mp3buf))
}

const endBuf = mp3encoder.flush()
if (endBuf.length > 0) mp3Data.push(Buffer.from(endBuf))

const outBuffer = Buffer.concat(mp3Data)
fs.mkdirSync('public/music', { recursive: true })
fs.writeFileSync('public/music/background.mp3', outBuffer)
console.log('created public/music/background.mp3, size', outBuffer.length)
