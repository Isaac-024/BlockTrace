import { INITIAL_GAME_STATE } from '../data/caseData.js';

const STORAGE_KEY = 'blocktrace_case_01_save';

export function loadGameState() {
  if (typeof window === 'undefined') return INITIAL_GAME_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_GAME_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_GAME_STATE,
      ...parsed,
      // Ensure nested objects merge properly
      levelResults: {
        ...INITIAL_GAME_STATE.levelResults,
        ...(parsed.levelResults || {})
      }
    };
  } catch (err) {
    console.error('Failed to load save state:', err);
    return INITIAL_GAME_STATE;
  }
}

export function saveGameState(state) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state:', err);
  }
}

export function resetGameState() {
  if (typeof window === 'undefined') return INITIAL_GAME_STATE;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear save state:', err);
  }
  return INITIAL_GAME_STATE;
}
