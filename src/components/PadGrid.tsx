import { motion } from 'framer-motion';
import { PADS } from '../game/utils';
import { audioManager } from '../game/audio';

interface PadGridProps {
  pattern: string[];
  userInput: string[];
  currentSignalIndex: number;
  isPlayingSignal: boolean;
  currentlyPlayingPad: string | null;
  phase: string;
  onPadClick: (padId: string) => void;
}

export function PadGrid({
  pattern,
  userInput,
  currentSignalIndex,
  isPlayingSignal,
  currentlyPlayingPad,
  phase,
  onPadClick,
}: PadGridProps) {
  const isActive = (padId: string) => {
    if (isPlayingSignal) {
      return currentlyPlayingPad === padId;
    }
    return userInput.includes(padId) && 
           userInput.indexOf(padId) === userInput.length - 1;
  };

  const isCorrect = (padId: string, index: number) => {
    return userInput.length > index && userInput[index] === padId;
  };

  return (
    <div className="pad-grid">
      {PADS.map((pad, index) => {
        const active = isActive(pad.id);
        const correct = isCorrect(pad.id, userInput.indexOf(pad.id));
        const canInteract = phase === 'input';

        return (
          <motion.button
            key={pad.id}
            className="pad"
            onClick={() => canInteract && onPadClick(pad.id)}
            disabled={!canInteract}
            whileTap={canInteract ? { scale: 0.92 } : {}}
            animate={{
              scale: active ? 1.1 : correct ? 1.05 : 1,
              boxShadow: active
                ? '0 0 24px rgba(0, 212, 255, 0.6), inset 0 0 20px rgba(0, 212, 255, 0.2)'
                : correct
                ? '0 0 16px rgba(168, 85, 247, 0.4), inset 0 0 12px rgba(168, 85, 247, 0.1)'
                : '0 0 0px rgba(0, 0, 0, 0)',
              borderColor: active
                ? '#00d4ff'
                : correct
                ? '#a855f7'
                : 'rgba(255, 255, 255, 0.1)',
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
            aria-label={`Pad ${index + 1}`}
          >
            <span className="pad-label">{pad.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

