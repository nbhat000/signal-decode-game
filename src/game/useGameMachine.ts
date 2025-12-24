import { useReducer, useEffect, useCallback } from 'react';
import { GamePhase, generatePattern, getRoundLength, PADS } from './utils';
import { audioManager } from './audio';

export interface GameState {
  phase: GamePhase;
  round: number;
  pattern: string[];
  userInput: string[];
  currentSignalIndex: number;
  isPlayingSignal: boolean;
  currentlyPlayingPad: string | null;
}

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'PLAY_SIGNAL' }
  | { type: 'SIGNAL_STEP'; padId: string }
  | { type: 'CLEAR_PLAYING_PAD' }
  | { type: 'SIGNAL_COMPLETE' }
  | { type: 'USER_INPUT'; padId: string }
  | { type: 'CHECK_INPUT' }
  | { type: 'SUCCESS' }
  | { type: 'FAIL' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' }
  | { type: 'TRY_AGAIN' };

const initialState: GameState = {
  phase: 'intro',
  round: 0,
  pattern: [],
  userInput: [],
  currentSignalIndex: 0,
  isPlayingSignal: false,
  currentlyPlayingPad: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      const firstRound = 1;
      const firstPattern = generatePattern(getRoundLength(firstRound));
      return {
        ...initialState,
        phase: 'ready',
        round: firstRound,
        pattern: firstPattern,
      };

    case 'PLAY_SIGNAL':
      return {
        ...state,
        phase: 'playing',
        currentSignalIndex: 0,
        isPlayingSignal: true,
        userInput: [],
        currentlyPlayingPad: null,
      };

    case 'SIGNAL_STEP':
      return {
        ...state,
        currentSignalIndex: state.currentSignalIndex + 1,
        currentlyPlayingPad: action.padId,
      };

    case 'CLEAR_PLAYING_PAD':
      return {
        ...state,
        currentlyPlayingPad: null,
      };

    case 'SIGNAL_COMPLETE':
      return {
        ...state,
        phase: 'input',
        isPlayingSignal: false,
        currentSignalIndex: 0,
        userInput: [],
        currentlyPlayingPad: null,
      };

    case 'USER_INPUT':
      const newInput = [...state.userInput, action.padId];
      const inputIndex = newInput.length - 1;
      const expectedPad = state.pattern[inputIndex];
      const actualPad = action.padId;
      
      // Check if input matches
      if (expectedPad !== actualPad) {
        return { ...state, phase: 'fail', userInput: newInput };
      }
      
      // Check if pattern is complete
      if (newInput.length === state.pattern.length) {
        return { ...state, phase: 'success', userInput: newInput };
      }
      
      return {
        ...state,
        userInput: newInput,
      };

    case 'CHECK_INPUT':
      // This case is no longer needed, but kept for compatibility
      return state;

    case 'SUCCESS':
      if (state.round >= 6) {
        return { ...state, phase: 'complete' };
      }
      return state;

    case 'NEXT_ROUND':
      const nextRound = state.round + 1;
      const nextPattern = generatePattern(getRoundLength(nextRound));
      return {
        ...state,
        phase: 'ready',
        round: nextRound,
        pattern: nextPattern,
        userInput: [],
        currentSignalIndex: 0,
        isPlayingSignal: false,
        currentlyPlayingPad: null,
      };

    case 'FAIL':
      return { ...state, phase: 'fail' };

    case 'TRY_AGAIN':
      return {
        ...state,
        phase: 'ready',
        userInput: [],
        currentSignalIndex: 0,
        isPlayingSignal: false,
        currentlyPlayingPad: null,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function useGameMachine() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize audio on first interaction
  useEffect(() => {
    audioManager.init();
  }, []);

  // Handle signal playback
  useEffect(() => {
    if (state.phase !== 'playing' || !state.isPlayingSignal) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= state.pattern.length) {
        dispatch({ type: 'SIGNAL_COMPLETE' });
        return;
      }

      const padId = state.pattern[currentIndex];
      audioManager.play(padId);
      dispatch({ type: 'SIGNAL_STEP', padId });

      currentIndex++;
      // Clear the currently playing pad after the highlight duration
      setTimeout(() => {
        dispatch({ type: 'CLEAR_PLAYING_PAD' });
      }, 450);
      timeoutId = setTimeout(playNext, 600); // 450ms + 150ms gap
    };

    playNext();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [state.phase, state.isPlayingSignal, state.pattern]);

  // Auto-advance on success
  useEffect(() => {
    if (state.phase === 'success') {
      const timeoutId = setTimeout(() => {
        if (state.round >= 6) {
          dispatch({ type: 'SUCCESS' });
        } else {
          dispatch({ type: 'NEXT_ROUND' });
        }
      }, 900);

      return () => clearTimeout(timeoutId);
    }
  }, [state.phase, state.round]);

  const handleUserInput = useCallback((padId: string) => {
    if (state.phase !== 'input') return;

    audioManager.play('click');
    dispatch({ type: 'USER_INPUT', padId });
  }, [state.phase]);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const playSignal = useCallback(() => {
    dispatch({ type: 'PLAY_SIGNAL' });
  }, []);

  const tryAgain = useCallback(() => {
    dispatch({ type: 'TRY_AGAIN' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    startGame,
    playSignal,
    handleUserInput,
    tryAgain,
    reset,
  };
}

