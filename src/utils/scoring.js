import { CASE_METADATA } from '../data/caseData.js';

export function formatTime(seconds = 0) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function calculateRank(score = 0) {
  for (const rank of CASE_METADATA.ranks) {
    if (score >= rank.minScore) {
      return rank;
    }
  }
  return CASE_METADATA.ranks[CASE_METADATA.ranks.length - 1];
}

export function calculateLevelScore(baseScore, attempts = 1, hintsUsed = 0) {
  // First attempt earns 100%, second earns 80%, 3+ earns 60%
  let penaltyMultiplier = 1.0;
  if (attempts === 2) penaltyMultiplier = 0.8;
  if (attempts >= 3) penaltyMultiplier = 0.65;

  const hintPenalty = hintsUsed * 25;
  const finalScore = Math.max(50, Math.round(baseScore * penaltyMultiplier) - hintPenalty);
  return finalScore;
}
