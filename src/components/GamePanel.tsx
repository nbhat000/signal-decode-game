import { motion, AnimatePresence } from 'framer-motion';
import { PadGrid } from './PadGrid';
import { StatusChip } from './StatusChip';
import { ParticleBurst } from './ParticleBurst';
import { GameState } from '../game/useGameMachine';
import { audioManager } from '../game/audio';
import { useEffect, useState } from 'react';

interface GamePanelProps {
  state: GameState;
  onPadClick: (padId: string) => void;
  onPlaySignal: () => void;
  onTryAgain: () => void;
}

export function GamePanel({
  state,
  onPadClick,
  onPlaySignal,
  onTryAgain,
}: GamePanelProps) {
  const [showParticles, setShowParticles] = useState(false);
  const [showFail, setShowFail] = useState(false);

  useEffect(() => {
    if (state.phase === 'success') {
      audioManager.play('success');
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 600);
    }
  }, [state.phase]);

  useEffect(() => {
    if (state.phase === 'fail') {
      audioManager.play('fail');
      setShowFail(true);
      setTimeout(() => setShowFail(false), 300);
    }
  }, [state.phase]);

  const getStatus = (): 'PLAYING' | 'YOUR TURN' | 'SUCCESS' | 'FAIL' | 'READY' => {
    if (state.phase === 'playing') return 'PLAYING';
    if (state.phase === 'input') return 'YOUR TURN';
    if (state.phase === 'success') return 'SUCCESS';
    if (state.phase === 'fail') return 'FAIL';
    return 'READY';
  };

  const getSubtitle = () => {
    if (state.phase === 'playing') return 'Observe the signal';
    if (state.phase === 'input') return 'Repeat the signal';
    if (state.phase === 'ready') return 'Ready to play';
    return '';
  };

  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        x: showFail ? [0, -10, 10, -10, 10, 0] : 0,
      }}
      transition={{
        x: { duration: 0.3 },
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <ParticleBurst trigger={showParticles} />
      
      <div className="panel-header">
        <h2 className="panel-title">Round {state.round}</h2>
        <p className="panel-subtitle">{getSubtitle()}</p>
      </div>

      <div className="signal-visualization">
        <StatusChip status={getStatus()} />
        <div className="wave-container">
          <svg className="wave" viewBox="0 0 200 40" preserveAspectRatio="none">
            <motion.path
              d="M 0,20 Q 50,10 100,20 T 200,20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{
                pathLength: state.phase === 'playing' ? [0, 1, 0] : 0.3,
                opacity: state.phase === 'playing' ? [0.3, 0.9, 0.3] : 0.3,
              }}
              transition={{
                pathLength: { 
                  duration: state.pattern.length * 0.6, 
                  repeat: state.phase === 'playing' ? Infinity : 0, 
                  ease: 'linear' 
                },
                opacity: {
                  duration: state.pattern.length * 0.6,
                  repeat: state.phase === 'playing' ? Infinity : 0,
                  ease: 'linear',
                },
              }}
            />
          </svg>
        </div>
      </div>

      <PadGrid
        pattern={state.pattern}
        userInput={state.userInput}
        currentSignalIndex={state.currentSignalIndex}
        isPlayingSignal={state.isPlayingSignal}
        currentlyPlayingPad={state.currentlyPlayingPad}
        phase={state.phase}
        onPadClick={onPadClick}
      />

      <div className="panel-actions">
        <AnimatePresence mode="wait">
          {state.phase === 'ready' && (
            <motion.button
              key="play"
              className="action-button"
              onClick={onPlaySignal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              Play Signal
            </motion.button>
          )}
          {state.phase === 'fail' && (
            <motion.button
              key="try-again"
              className="action-button"
              onClick={onTryAgain}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              Try Again
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {state.phase === 'complete' && (
          <motion.div
            className="complete-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="complete-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2>Complete!</h2>
              <p>You've decoded all signals</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

