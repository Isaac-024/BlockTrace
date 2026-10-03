import { useState, useEffect, useCallback, useRef } from 'react';
import { loadGameState, saveGameState, resetGameState } from '../utils/storage';
import { sound } from '../utils/soundSynthesizer';
import { CASE_METADATA } from '../data/caseData';

export function useGameState() {
  const [state, setState] = useState(() => {
    const loaded = loadGameState();
    // Initialize sound engine mute state
    sound.setMuted(loaded.soundMuted ?? false);
    return loaded;
  });

  const timerRef = useRef(null);

  // Sync state to localStorage on changes
  useEffect(() => {
    saveGameState(state);
  }, [state]);

  // Sync sound engine whenever muted setting changes
  useEffect(() => {
    sound.setMuted(state.soundMuted);
  }, [state.soundMuted]);

  // Investigation Timer tick
  useEffect(() => {
    if (state.timerRunning && state.currentScreen !== 'home' && state.currentScreen !== 'victory') {
      timerRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timerSeconds: prev.timerSeconds + 1
        }));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.timerRunning, state.currentScreen]);

  // Action: Start or Resume Game
  const startInvestigation = useCallback(() => {
    sound.playClick();
    setState((prev) => {
      const nextScreen = prev.currentScreen === 'home' 
        ? `level-${prev.unlockedLevel}` 
        : prev.currentScreen;
      return {
        ...prev,
        currentScreen: nextScreen,
        timerRunning: true
      };
    });
  }, []);

  // Action: Navigate to specific screen (safeguarding locked levels)
  const navigateTo = useCallback((screen) => {
    sound.playClick();
    if (screen.startsWith('level-')) {
      const lvl = parseInt(screen.replace('level-', ''), 10);
      if (lvl > state.unlockedLevel) {
        sound.playIncorrect();
        return; // Prevent skipping ahead to locked levels
      }
    }
    setState((prev) => ({
      ...prev,
      currentScreen: screen,
      timerRunning: screen !== 'home' && screen !== 'victory'
    }));
  }, [state.unlockedLevel]);

  // Action: Record successful level completion
  const recordLevelSuccess = useCallback((levelNum, earnedScore, earnedXp, clueData, attempts = 1) => {
    setState((prev) => {
      const alreadyCompleted = prev.levelResults[levelNum]?.completed;
      
      // Calculate next unlocked level (up to 5, then victory)
      const nextUnlocked = Math.max(prev.unlockedLevel, Math.min(5, levelNum + 1));

      // Append clue if not already in notebook
      let updatedClues = [...prev.clues];
      if (clueData && !updatedClues.some((c) => c.id === clueData.id)) {
        updatedClues.push(clueData);
      }

      return {
        ...prev,
        score: prev.score + (alreadyCompleted ? Math.round(earnedScore * 0.25) : earnedScore),
        xp: prev.xp + (alreadyCompleted ? 0 : earnedXp),
        unlockedLevel: nextUnlocked,
        clues: updatedClues,
        levelResults: {
          ...prev.levelResults,
          [levelNum]: {
            completed: true,
            score: alreadyCompleted ? prev.levelResults[levelNum].score : earnedScore,
            attempts
          }
        }
      };
    });
  }, []);

  // Action: Toggle Sound
  const toggleSound = useCallback(() => {
    setState((prev) => {
      const nextMuted = !prev.soundMuted;
      sound.setMuted(nextMuted);
      if (!nextMuted) sound.playClick();
      return {
        ...prev,
        soundMuted: nextMuted
      };
    });
  }, []);

  // Action: Toggle CRT Scanlines
  const toggleScanlines = useCallback(() => {
    sound.playClick();
    setState((prev) => ({
      ...prev,
      scanlinesEnabled: !prev.scanlinesEnabled
    }));
  }, []);

  // Action: Reset Game to beginning
  const resetGame = useCallback(() => {
    sound.playBlockPlace();
    const freshState = resetGameState();
    setState(freshState);
  }, []);

  return {
    state,
    startInvestigation,
    navigateTo,
    recordLevelSuccess,
    toggleSound,
    toggleScanlines,
    resetGame
  };
}
