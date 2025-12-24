import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <motion.div
        className="start-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="start-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            className="start-title"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            SIGNAL DECODE
          </motion.h1>
          <motion.p
            className="start-subtitle"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Observe. Remember. Repeat.
          </motion.p>
          <motion.button
            className="start-button"
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Start
          </motion.button>
          <motion.button
            className="how-to-play-button"
            onClick={() => setShowInstructions(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98, y: 2 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            How to Play
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="instructions-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInstructions(false)}
          >
            <motion.div
              className="instructions-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="instructions-title">MISSION BRIEFING</h3>
              
              <div className="instructions-narrative">
                <p className="narrative-text">
                  You're a <strong>cyberpunk signal decoder</strong> operating in the neon-drenched underbelly of Neo-Tokyo 2087.
                </p>
                <p className="narrative-text">
                  A rogue AI has encrypted critical data streams across the city's neural network. You have <strong>6 rounds</strong> to decode the signal patterns before the system overloads and the city goes dark.
                </p>
                <p className="narrative-text">
                  Each signal sequence is your key to unlocking the next layer. Fail, and the encryption resets. Succeed, and you move closer to saving the city.
                </p>
              </div>

              <div className="instructions-steps">
                <h4>QUICK INSTRUCTIONS:</h4>
                <ol>
                  <li>Watch the signal pattern play on the pads</li>
                  <li>Memorize the sequence</li>
                  <li>Repeat the pattern by tapping pads in the same order</li>
                  <li>Complete all 6 rounds to decrypt the system</li>
                </ol>
              </div>

              <button 
                className="instructions-close-button"
                onClick={() => setShowInstructions(false)}
              >
                BEGIN MISSION
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

