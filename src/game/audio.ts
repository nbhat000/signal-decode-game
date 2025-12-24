import { Howl } from 'howler';
import { PADS } from './utils';

const SOUND_BASE_URL = 'data:audio/wav;base64,';

// Generate simple sine wave tone as base64 WAV
function generateTone(frequency: number, duration: number = 0.15): string {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);
  
  // Generate sine wave
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.sin(2 * Math.PI * frequency * t);
    const amplitude = 0.3 * (1 - (i / numSamples)); // Fade out
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * amplitude * 32767)));
    view.setInt16(44 + i * 2, intSample, true);
  }
  
  const bytes = Array.from(new Uint8Array(buffer));
  return btoa(String.fromCharCode(...bytes));
}

// Generate click sound
function generateClick(): string {
  const sampleRate = 44100;
  const duration = 0.05;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);
  
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);
  
  for (let i = 0; i < numSamples; i++) {
    const sample = Math.random() * 0.3 * (1 - (i / numSamples));
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
    view.setInt16(44 + i * 2, intSample, true);
  }
  
  const bytes = Array.from(new Uint8Array(buffer));
  return btoa(String.fromCharCode(...bytes));
}

// Generate success chime
function generateSuccess(): string {
  const sampleRate = 44100;
  const duration = 0.4;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);
  
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);
  
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const f1 = 523.25; // C5
    const f2 = 659.25; // E5
    const sample = (Math.sin(2 * Math.PI * f1 * t) + Math.sin(2 * Math.PI * f2 * t)) / 2;
    const amplitude = 0.3 * (1 - (i / numSamples));
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * amplitude * 32767)));
    view.setInt16(44 + i * 2, intSample, true);
  }
  
  const bytes = Array.from(new Uint8Array(buffer));
  return btoa(String.fromCharCode(...bytes));
}

// Generate fail thud
function generateFail(): string {
  const sampleRate = 44100;
  const duration = 0.2;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);
  
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);
  
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const frequency = 100 * (1 - (i / numSamples));
    const sample = Math.sin(2 * Math.PI * frequency * t) * 0.4;
    const amplitude = (1 - (i / numSamples));
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * amplitude * 32767)));
    view.setInt16(44 + i * 2, intSample, true);
  }
  
  const bytes = Array.from(new Uint8Array(buffer));
  return btoa(String.fromCharCode(...bytes));
}

class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled: boolean = false;
  private initialized: boolean = false;
  private backgroundMusic: Howl | null = null;

  constructor() {
    const saved = localStorage.getItem('signal-decode-sound');
    this.enabled = saved !== 'false';
  }

  init() {
    if (this.initialized) return;
    
    // Generate pad tones
    PADS.forEach((pad) => {
      const tone = generateTone(pad.frequency);
      this.sounds.set(pad.id, new Howl({
        src: [SOUND_BASE_URL + tone],
        volume: 0.6,
      }));
    });

    // Generate other sounds
    this.sounds.set('click', new Howl({
      src: [SOUND_BASE_URL + generateClick()],
      volume: 0.4,
    }));

    this.sounds.set('success', new Howl({
      src: [SOUND_BASE_URL + generateSuccess()],
      volume: 0.7,
    }));

    this.sounds.set('fail', new Howl({
      src: [SOUND_BASE_URL + generateFail()],
      volume: 0.6,
    }));

    // Initialize background music
    this.backgroundMusic = new Howl({
      src: ['/retro-arcade-game-music-408074.mp3'],
      loop: true,
      volume: 0.4, // Normal volume for home page
      autoplay: false,
    });

    this.initialized = true;
  }

  play(id: string) {
    if (!this.enabled || !this.initialized) return;
    const sound = this.sounds.get(id);
    if (sound) {
      sound.play();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    localStorage.setItem('signal-decode-sound', String(enabled));
    // Also control background music
    if (this.backgroundMusic) {
      if (enabled) {
        if (!this.backgroundMusic.playing()) {
          this.backgroundMusic.play();
        }
      } else {
        this.backgroundMusic.pause();
      }
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  playBackgroundMusic() {
    if (this.backgroundMusic && this.enabled && !this.backgroundMusic.playing()) {
      this.backgroundMusic.play();
    }
  }

  setGamePlaying(isPlaying: boolean) {
    if (this.backgroundMusic) {
      // Lower volume when game is playing so game sounds aren't drowned out
      this.backgroundMusic.volume(isPlaying ? 0.15 : 0.4);
    }
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
    }
  }
}

export const audioManager = new AudioManager();

