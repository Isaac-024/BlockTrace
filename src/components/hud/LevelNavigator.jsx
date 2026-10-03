import React from 'react';
import { CASE_METADATA } from '../../data/caseData';
import { Check, Lock, Play } from 'lucide-react';
import { sound } from '../../utils/soundSynthesizer';

export function LevelNavigator({ currentScreen, unlockedLevel, levelResults, onSelectLevel }) {
  const currentLevelNum = currentScreen.startsWith('level-')
    ? parseInt(currentScreen.replace('level-', ''), 10)
    : null;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {CASE_METADATA.levels.map((lvl) => {
        const isCurrent = currentLevelNum === lvl.id;
        const isCompleted = levelResults[lvl.id]?.completed;
        const isUnlocked = lvl.id <= unlockedLevel;
        const isLocked = !isUnlocked;

        let statusClass = "bg-cyber-950 border-slate-700 text-slate-500 opacity-60";
        if (isCurrent) {
          statusClass = "bg-cyan-950 border-cyber-cyan text-cyber-cyan shadow-[0_0_10px_rgba(0,245,212,0.4)] ring-1 ring-cyber-cyan";
        } else if (isCompleted) {
          statusClass = "bg-emerald-950/80 border-emerald-500 text-emerald-400 hover:bg-emerald-900/60";
        } else if (isUnlocked) {
          statusClass = "bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700";
        }

        return (
          <button
            key={lvl.id}
            disabled={isLocked}
            onClick={() => {
              if (isUnlocked) {
                sound.playClick();
                onSelectLevel(`level-${lvl.id}`);
              }
            }}
            title={`${lvl.name} (${isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Unlocked'})`}
            className={`
              relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 border-2 font-pixel text-[11px] transition-all select-none
              ${statusClass}
              ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer active:translate-y-0.5'}
            `}
          >
            {isCompleted ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : isLocked ? (
              <Lock className="w-3.5 h-3.5" />
            ) : isCurrent ? (
              <span>{lvl.id}</span>
            ) : (
              <span>{lvl.id}</span>
            )}

            {/* Current level indicator dot */}
            {isCurrent && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyber-cyan shadow-[0_0_6px_#00f5d4]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
