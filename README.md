# Tanviii Birthday Surprise

A personalized birthday wish website built with React, Vite, Tailwind CSS, Framer Motion, and Canvas Confetti.

## Setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Deployment

This project is ready for deployment on Vercel.

1. Push your repository to GitHub.
2. Open vercel.com and import the repository.
3. Use the default settings.
4. Deploy.

Vercel automatically detects Vite and uses the `build` command.

## Project structure

- `src/`
  - `App.jsx`
  - `main.jsx`
  - `index.css`
  - `components/`
    - `BirthdayHero.jsx`
    - `CakeSection.jsx`
    - `Countdown.jsx`
    - `DateProposal.jsx`
    - `FinalConfession.jsx`
    - `Fireworks.jsx`
    - `HiddenMessages.jsx`
    - `Letter.jsx`
    - `MusicPlayer.jsx`
    - `PhotoGallery.jsx`
    - `UnlockAnimation.jsx`

- `public/`
  - `music/background.mp3`
  - `photos/`

## Notes

- Music starts after user interaction.
- The countdown screen is the only visible view at first.
- The gallery supports mobile swipe and auto-rotation.
- Hidden messages and proposal flow appear as the experience progresses.
- The design is mobile-first with glassmorphism and subtle motion.
