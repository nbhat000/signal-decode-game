import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PADS } from '../game/utils';

interface WaveformProps {
  isActive: boolean;
  currentlyPlayingPad: string | null;
  userInputPad?: string | null;
}

export function Waveform({ isActive, currentlyPlayingPad, userInputPad }: WaveformProps) {
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const numBars = 40;

  // Initialize waveform with flat line
  useEffect(() => {
    setWaveformData(Array(numBars).fill(0.1));
  }, []);

  // React to pad being played (pattern playback)
  useEffect(() => {
    if (currentlyPlayingPad && isActive) {
      const pad = PADS.find(p => p.id === currentlyPlayingPad);
      const frequency = pad?.frequency || 300;
      
      // Higher frequency = more oscillations, lower frequency = fewer but larger
      const frequencyRatio = (frequency - 220) / (587.33 - 220); // Normalize to 0-1
      const intensity = 0.4 + frequencyRatio * 0.6;
      const waveCount = 2 + frequencyRatio * 4; // 2-6 waves based on frequency
      
      // Create a waveform pattern based on frequency
      const newData = Array(numBars).fill(0.1).map((_, i) => {
        const position = i / numBars;
        // Create sine wave pattern
        const wave = Math.sin(position * Math.PI * 2 * waveCount) * 0.5 + 0.5;
        // Add center spike
        const center = numBars / 2;
        const distance = Math.abs(i - center);
        const maxDistance = numBars / 2;
        const spike = (1 - distance / maxDistance) * 0.5;
        return 0.1 + intensity * (wave * 0.6 + spike * 0.4);
      });
      
      setWaveformData(newData);
      
      // Return to baseline after a short delay
      const timer = setTimeout(() => {
        setWaveformData(Array(numBars).fill(0.1));
      }, 250);
      
      return () => clearTimeout(timer);
    } else if (!currentlyPlayingPad && !userInputPad) {
      // Gradually return to baseline
      setWaveformData(prev => prev.map(val => Math.max(0.1, val * 0.7)));
    }
  }, [currentlyPlayingPad, isActive, userInputPad]);

  // React to user input (button clicks)
  useEffect(() => {
    if (userInputPad && isActive) {
      const pad = PADS.find(p => p.id === userInputPad);
      const frequency = pad?.frequency || 300;
      
      // User input creates a sharper, more immediate response
      const frequencyRatio = (frequency - 220) / (587.33 - 220);
      const intensity = 0.5 + frequencyRatio * 0.5;
      const waveCount = 3 + frequencyRatio * 3; // Slightly different pattern for user input
      
      // Create a sharper waveform for user clicks
      const newData = Array(numBars).fill(0.1).map((_, i) => {
        const position = i / numBars;
        const wave = Math.sin(position * Math.PI * 2 * waveCount) * 0.4 + 0.5;
        // Sharper center spike for user input
        const center = numBars / 2;
        const distance = Math.abs(i - center);
        const maxDistance = numBars / 2;
        const spike = Math.pow(1 - distance / maxDistance, 0.5) * 0.6;
        return 0.1 + intensity * (wave * 0.5 + spike * 0.5);
      });
      
      setWaveformData(newData);
      
      // Return to baseline
      const timer = setTimeout(() => {
        setWaveformData(Array(numBars).fill(0.1));
      }, 180);
      
      return () => clearTimeout(timer);
    }
  }, [userInputPad, isActive]);

  // Continuous subtle animation when idle
  useEffect(() => {
    if (!isActive || (!currentlyPlayingPad && !userInputPad)) {
      const interval = setInterval(() => {
        setWaveformData(prev => prev.map((val, i) => {
          // Subtle wave animation
          const wave = Math.sin((i + Date.now() / 1000) * 0.5) * 0.05;
          return Math.max(0.1, Math.min(0.3, val + wave));
        }));
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isActive, currentlyPlayingPad, userInputPad]);

  return (
    <div className="waveform-container">
      <svg 
        viewBox={`0 0 ${numBars} 100`} 
        preserveAspectRatio="none" 
        style={{ width: '100%', height: '100%' }}
      >
        {waveformData.map((height, i) => {
          const barHeight = height * 80; // Scale to 80% of viewBox height
          const centerY = 50;
          const topY = centerY - barHeight / 2;
          const bottomY = centerY + barHeight / 2;
          
          return (
            <motion.line
              key={i}
              x1={i + 0.5}
              y1={topY}
              x2={i + 0.5}
              y2={bottomY}
              stroke="#00ffff"
              strokeWidth="1.5"
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: height > 0.2 ? 0.9 : 0.3,
                y1: topY,
                y2: bottomY,
              }}
              transition={{ 
                duration: 0.1,
                ease: 'easeOut'
              }}
              style={{ 
                filter: height > 0.3 ? 'drop-shadow(0 0 4px #00ffff)' : 'none'
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

