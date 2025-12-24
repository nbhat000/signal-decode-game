# Signal Decode

A premium-feeling, mobile-first microgame prototype built with React, TypeScript, and Framer Motion. Test your memory by observing and repeating signal patterns.

## Quick Start

```bash
npm install
npm run dev
```

The app will open at `http://localhost:3000`

## Design Decisions

### Tech Stack
- **React + TypeScript + Vite**: Fast development and build times
- **Framer Motion**: Smooth, performant animations with spring physics
- **Howler.js**: Reliable cross-browser audio support
- **CSS Modules**: Custom styling without external dependencies

### Visual Design
- **Dark Theme**: High-contrast premium game aesthetic with deep blacks and vibrant accents
- **Glass Morphism**: Frosted glass panels with backdrop blur for depth
- **Animated Gradient Background**: Subtle color shifts create visual interest
- **Noise Texture**: CSS-based texture overlay adds premium feel
- **Electric Cyan/Violet Accents**: Modern, sci-fi inspired color palette

### Game Design
- **Progressive Difficulty**: Pattern length increases from 3 to 6 across 6 rounds
- **No Timing Pressure**: Only pattern order matters, not speed
- **Smart Pattern Generation**: Avoids triple repeats (AAA) for better playability
- **Immediate Feedback**: Visual and audio cues for every action

### Audio System
- **Synthetic Tones**: Programmatically generated WAV files (no external assets)
- **Unique Pad Tones**: Each of 6 pads has a distinct musical frequency
- **Sound Effects**: Click, success chime, and fail thud
- **Muted by Default**: Respects browser autoplay policies, requires user interaction

### State Management
- **Reducer Pattern**: Clean state machine with explicit phases:
  - `intro` → `ready` → `playing` → `input` → `success`/`fail` → `complete`
- **Single Source of Truth**: All game logic centralized in `useGameMachine`

### Performance
- **60fps Animations**: Transform/opacity only, avoid expensive box-shadow animations
- **Debounced Inputs**: Prevents accidental double-taps
- **Optimized Re-renders**: React.memo and useCallback where appropriate
- **Mobile-First**: Touch-friendly targets (44px minimum), safe area support

### Accessibility
- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard support (though mobile-optimized)
- **High Contrast**: WCAG AA compliant color contrasts
- **Responsive**: Works on all screen sizes, optimized for iPhone-sized devices

## File Structure

```
src/
  main.tsx              # Entry point
  App.tsx               # Root component
  styles.css            # Global styles
  components/
    Shell.tsx           # Main app shell with HUD
    StartScreen.tsx     # Initial welcome screen
    GamePanel.tsx       # Main game interface
    PadGrid.tsx         # Interactive pad grid
    Hud.tsx             # Top header with indicators
    StatusChip.tsx      # Status display component
    ToggleIcon.tsx      # Reusable toggle button
    ParticleBurst.tsx   # Success animation effect
  game/
    useGameMachine.ts   # Game state machine
    utils.ts            # Game utilities and constants
    audio.ts            # Audio manager and sound generation
```

## Features

- ✅ 6 rounds with increasing difficulty
- ✅ Visual signal visualization with animated wave
- ✅ Audio feedback for all interactions
- ✅ Particle burst on success
- ✅ Shake animation on failure
- ✅ Sound toggle with localStorage persistence
- ✅ Round progress indicators
- ✅ Help overlay
- ✅ Complete game state machine
- ✅ Mobile-optimized touch targets
- ✅ Premium glass morphism UI
- ✅ Smooth spring animations

## Browser Support

Works in all modern browsers that support:
- ES2020 JavaScript
- CSS backdrop-filter
- Web Audio API (for sound generation)

Tested on:
- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Build

```bash
npm run build
```

Outputs to `dist/` directory, ready for static hosting.

## License

MIT - Built as a vibe prototype demonstration.

