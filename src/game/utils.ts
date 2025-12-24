export type GamePhase = 
  | 'intro' 
  | 'ready' 
  | 'playing' 
  | 'input' 
  | 'success' 
  | 'fail' 
  | 'complete';

export interface Pad {
  id: string;
  label: string;
  frequency: number;
}

export const PADS: Pad[] = [
  { id: 'pad-0', label: '◉', frequency: 220 },
  { id: 'pad-1', label: '◇', frequency: 277.18 },
  { id: 'pad-2', label: '▢', frequency: 329.63 },
  { id: 'pad-3', label: '△', frequency: 392.00 },
  { id: 'pad-4', label: '○', frequency: 493.88 },
  { id: 'pad-5', label: '◆', frequency: 587.33 },
];

export function getRoundLength(round: number): number {
  if (round <= 1) return 3;
  if (round <= 2) return 3;
  if (round <= 3) return 4;
  if (round <= 4) return 4;
  if (round <= 5) return 5;
  return 6;
}

export function generatePattern(length: number, padCount: number = 6): string[] {
  const pattern: string[] = [];
  const padIds = PADS.slice(0, padCount).map(p => p.id);
  
  for (let i = 0; i < length; i++) {
    let padId: string;
    let attempts = 0;
    
    do {
      padId = padIds[Math.floor(Math.random() * padIds.length)];
      attempts++;
    } while (
      attempts < 10 && 
      i >= 2 && 
      pattern[i - 1] === padId && 
      pattern[i - 2] === padId
    );
    
    pattern.push(padId);
  }
  
  return pattern;
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

