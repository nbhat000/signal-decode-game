import { Hud } from './Hud';
import { StartScreen } from './StartScreen';
import { GamePanel } from './GamePanel';
import { useGameMachine } from '../game/useGameMachine';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { audioManager } from '../game/audio';

export function Shell() {
  const { state, startGame, playSignal, handleUserInput, tryAgain, reset } = useGameMachine();
  const [showHelp, setShowHelp] = useState(false);

  // Initialize audio and start background music
  useEffect(() => {
    audioManager.init();
    audioManager.playBackgroundMusic();
  }, []);

  // Adjust background music volume based on game state
  useEffect(() => {
    const isGameActive = state.phase !== 'intro';
    audioManager.setGamePlaying(isGameActive);
  }, [state.phase]);

  // Auto-play signal when entering ready phase
  useEffect(() => {
    if (state.phase === 'ready') {
      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        playSignal();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.phase, playSignal]);

  return (
    <div className="shell">
      <Hud 
        round={state.round} 
        onHelpClick={() => setShowHelp(!showHelp)}
        onLogoClick={reset}
      />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          {state.phase === 'intro' ? (
            <StartScreen key="start" onStart={startGame} />
          ) : (
            <GamePanel
              key="game"
              state={state}
              onPadClick={handleUserInput}
              onPlaySignal={playSignal}
              onTryAgain={tryAgain}
            />
          )}
        </AnimatePresence>
      </main>

      {showHelp && (
        <div className="help-overlay" onClick={() => setShowHelp(false)}>
          <motion.div
            className="help-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>How to Play</h3>
            <p>Watch the signal pattern play on the pads.</p>
            <p>Then repeat the pattern by tapping the pads in the same order.</p>
            <p>Complete 6 rounds to win!</p>
            <button onClick={() => setShowHelp(false)}>Got it</button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

