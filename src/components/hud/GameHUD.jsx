import React, { useState } from 'react';
import { Volume2, VolumeX, BookOpen, RotateCcw, HelpCircle, Monitor, Clock, ShieldCheck, Zap } from 'lucide-react';
import { formatTime } from '../../utils/scoring';
import { LevelNavigator } from './LevelNavigator';
import { ClueNotebookModal } from './ClueNotebookModal';
import { HowToPlayModal } from './HowToPlayModal';
import { VoxelButton } from '../common/VoxelButton';

export function GameHUD({
  state,
  onNavigate,
  onToggleSound,
  onToggleScanlines,
  onResetGame
}) {
  const [showNotebook, setShowNotebook] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const currentLevelNum = state.currentScreen.startsWith('level-')
    ? parseInt(state.currentScreen.replace('level-', ''), 10)
    : state.currentScreen === 'victory' ? 5 : 1;

  const isGameActive = state.currentScreen !== 'home';

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-cyber-950/95 border-b-[3px] border-slate-800 shadow-[0_6px_20px_rgba(0,0,0,0.85)] backdrop-blur-md">
        {/* Top Voxel Adventure HUD Bar */}
        <div className="px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 text-xs">
          {/* Logo & Case Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
              title="Return to Case Headquarters"
            >
              {/* 3D Voxel cube logo icon */}
              <div className="w-8 h-8 bg-cyber-cyan border-t-2 border-l-2 border-white/90 border-r-2 border-b-2 border-cyan-950 flex items-center justify-center font-pixel text-xs text-cyber-950 font-bold shadow-[2px_2px_0px_#002b26] group-hover:scale-105 transition-transform">
                BT
              </div>
              <div>
                <div className="font-pixel text-[11px] sm:text-xs text-cyber-cyan tracking-wider flex items-center gap-1.5">
                  BLOCKTRACE
                  <span className="text-[8px] px-1.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-700 hidden sm:inline-block font-pixel">
                    CASE #01
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-code truncate max-w-[140px] sm:max-w-none">
                  CYBER DETECTIVE
                </div>
              </div>
            </button>

            {/* Level Navigator (Visible when playing) */}
            {isGameActive && (
              <div className="hidden md:flex items-center ml-4 pl-4 border-l-2 border-slate-800">
                <LevelNavigator
                  currentScreen={state.currentScreen}
                  unlockedLevel={state.unlockedLevel}
                  levelResults={state.levelResults}
                  onSelectLevel={onNavigate}
                />
              </div>
            )}
          </div>

          {/* Stats Bar: Level, XP, Clues, Timer */}
          <div className="flex items-center gap-2 sm:gap-3 font-code text-xs">
            {/* Level Indicator */}
            {isGameActive && (
              <div className="px-2.5 py-1 bg-cyber-900 border-t border-l border-slate-700 border-r-2 border-b-2 border-slate-950 flex items-center gap-1.5 text-slate-300 shadow-voxel">
                <span className="text-slate-500 font-pixel text-[9px]">LVL</span>
                <span className="font-bold text-cyber-cyan font-pixel text-[10px]">{currentLevelNum}/5</span>
              </div>
            )}

            {/* XP & Score */}
            <div className="px-2.5 py-1 bg-cyber-900 border-t border-l border-slate-700 border-r-2 border-b-2 border-slate-950 flex items-center gap-2 shadow-voxel">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>{state.xp} <span className="text-[9px] text-slate-400">XP</span></span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-cyber-cyan font-bold">
                {state.score} <span className="text-[9px] text-slate-400">PTS</span>
              </span>
            </div>

            {/* Clues Notebook Button (Inventory style) */}
            <button
              onClick={() => setShowNotebook(true)}
              className="px-2.5 py-1 bg-cyan-950/90 border-t border-l border-cyan-400 border-r-2 border-b-2 border-cyan-950 hover:bg-cyan-900 text-cyber-cyan transition-all flex items-center gap-1.5 active:translate-y-0.5 shadow-[2px_2px_0px_#002b26]"
              title="Open Clue Inventory & Case Dossier"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyber-cyan" />
              <span className="font-pixel text-[9px] hidden sm:inline">EVIDENCE:</span>
              <span className="font-bold text-cyber-950 bg-cyber-cyan px-1.5 py-0.2 font-pixel text-[9px]">
                {state.clues.length}/5
              </span>
            </button>

            {/* Investigation Timer */}
            {isGameActive && (
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-cyber-900 border-t border-l border-slate-700 border-r-2 border-b-2 border-slate-950 text-slate-300 shadow-voxel">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-code text-xs text-slate-200">{formatTime(state.timerSeconds)}</span>
              </div>
            )}

            {/* Controls: Audio, Scanlines, Help, Reset */}
            <div className="flex items-center gap-1">
              {/* Sound Toggle */}
              <button
                onClick={onToggleSound}
                className={`p-1.5 border-t border-l border-r-2 border-b-2 transition-all ${
                  state.soundMuted
                    ? 'border-slate-700 bg-slate-900 text-slate-500 hover:text-slate-300 border-r-slate-950 border-b-slate-950'
                    : 'border-cyan-400 bg-cyan-950 text-cyber-cyan hover:bg-cyan-900 border-r-cyan-950 border-b-cyan-950'
                }`}
                title={state.soundMuted ? "Unmute Audio" : "Mute Audio"}
                aria-label={state.soundMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {state.soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* CRT Scanline Toggle */}
              <button
                onClick={onToggleScanlines}
                className={`p-1.5 border-t border-l border-r-2 border-b-2 hidden sm:block transition-all ${
                  state.scanlinesEnabled
                    ? 'border-emerald-400 bg-emerald-950 text-emerald-400 border-r-emerald-950 border-b-emerald-950'
                    : 'border-slate-700 bg-slate-900 text-slate-500 hover:text-slate-300 border-r-slate-950 border-b-slate-950'
                }`}
                title="Toggle CRT Scanline Effect"
                aria-label="Toggle CRT Scanlines"
              >
                <Monitor className="w-4 h-4" />
              </button>

              {/* Help / Guide */}
              <button
                onClick={() => setShowHowToPlay(true)}
                className="p-1.5 border-t border-l border-slate-600 border-r-2 border-b-2 border-slate-950 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all shadow-voxel"
                title="Case Brief & Help"
                aria-label="Case Brief & Help"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              {/* Reset Game */}
              {isGameActive && (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="p-1.5 border-t border-l border-rose-500 border-r-2 border-b-2 border-rose-950 bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 hover:text-white transition-all ml-1 shadow-[2px_2px_0px_#4c0519]"
                  title="Restart Case"
                  aria-label="Restart Case"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Level Navigator Bar (Visible on mobile screens) */}
        {isGameActive && (
          <div className="flex md:hidden px-3 py-1.5 items-center justify-between bg-cyber-900/90 border-t border-slate-800">
            <div className="text-[9px] font-pixel text-slate-400 uppercase">
              LEVEL PROGRESS:
            </div>
            <LevelNavigator
              currentScreen={state.currentScreen}
              unlockedLevel={state.unlockedLevel}
              levelResults={state.levelResults}
              onSelectLevel={onNavigate}
            />
          </div>
        )}
      </header>

      {/* Case Clue Notebook Modal */}
      <ClueNotebookModal
        isOpen={showNotebook}
        onClose={() => setShowNotebook(false)}
        clues={state.clues}
      />

      {/* Case Briefing / How to Play Modal */}
      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-950/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-cyber-900 border-4 border-rose-600 shadow-[0_0_30px_rgba(244,63,94,0.4)] p-6 space-y-4">
            <h3 className="font-pixel text-sm text-rose-400 uppercase tracking-wider">
              ⚠️ RESTART INVESTIGATION?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Are you sure you want to reset your case files? All collected clues, scores, and level progress will be purged from memory.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <VoxelButton
                variant="dark"
                size="sm"
                onClick={() => setShowResetConfirm(false)}
              >
                CANCEL
              </VoxelButton>
              <VoxelButton
                variant="rose"
                size="sm"
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetGame();
                }}
              >
                CONFIRM RESTART
              </VoxelButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
