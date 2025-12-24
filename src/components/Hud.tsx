import { ToggleIcon } from './ToggleIcon';
import { audioManager } from '../game/audio';
import { useState, useEffect } from 'react';

interface HudProps {
  round: number;
  onHelpClick: () => void;
}

export function Hud({ round, onHelpClick }: HudProps) {
  const [soundEnabled, setSoundEnabled] = useState(audioManager.isEnabled());

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    audioManager.setEnabled(newValue);
  };

  return (
    <div className="hud">
      <div className="hud-left">
        <h1 className="hud-title">Signal Decode</h1>
      </div>
      <div className="hud-center">
        <div className="round-indicators">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`round-dot ${i < round ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="hud-right">
        <ToggleIcon
          enabled={soundEnabled}
          onClick={toggleSound}
          icon={soundEnabled ? '🔊' : '🔇'}
          label="Toggle sound"
        />
        <ToggleIcon
          enabled={true}
          onClick={onHelpClick}
          icon="?"
          label="Help"
        />
      </div>
    </div>
  );
}

