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
      <header className="sticky top-0 z-40 w-full bg-cyber-950/95 border-b-2 border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {/* Top Mini Cyber Bar */}
        <div className="px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 text-xs">
          {/* Logo & Case Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group text-left focus:outline-none"
              title="Return to Case Headquarters"
            >
              {/* 3D Voxel cube logo icon */}
              <div className="w-7 h-7 bg-cyber-cyan border-t-2 border-l-2 border-white/80 border-r-2 border-b-2 border-cyan-900 flex items-center justify-center font-pixel text-[10px] text-cyber-950 font-bold shadow-[2px_2px_0px_#004d43] group-hover:scale-105 transition-transform">
                BT
              </div>
              <div>
                <div className="font-pixel text-[11px] sm:text-xs text-cyber-cyan tracking-wider flex items-center gap-1.5">
                  BLOCKTRACE
                  <span className="text-[9px] px-1.5 py-0.2 bg-cyan-950 text-cyan-300 border border-cyan-800 hidden sm:inline-block">
                    CASE 01
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-code truncate max-w-[140px] sm:max-w-none">
                  FIND THE HACKER
                </div>
              </div>
            </button>

            {/* Level Navigator (Visible when playing) */}
            {isGameActive && (
              <div className="hidden md:flex items-center ml-4 pl-4 border-l border-slate-800">
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
          <div className="flex items-center gap-2 sm:gap-4 font-code text-xs">
            {/* Level Indicator */}
            {isGameActive && (
              <div className="px-2.5 py-1 bg-cyber-900 border border-slate-700 flex items-center gap-1.5 text-slate-300">
                <span className="text-slate-500 font-pixel text-[9px]">LVL</span>
                <span className="font-bold text-cyber-cyan">{currentLevelNum}/5</span>
              </div>
            )}

            {/* XP & Score */}
            <div className="px-2.5 py-1 bg-cyber-900 border border-slate-700 flex items-center gap-2">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>{state.xp} <span className="text-[10px] text-slate-400">XP</span></span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-cyber-cyan font-bold">
                {state.score} <span className="text-[10px] text-slate-400">PTS</span>
              </span>
            </div>

            {/* Clues Notebook Button */}
            <button
              onClick={() => {
                setShowNotebook(true);
              }}
              className="px-2.5 py-1 bg-cyan-950/80 border border-cyan-700 hover:border-cyber-cyan text-cyber-cyan hover:bg-cyan-900/60 transition-all flex items-center gap-1.5 active:translate-y-0.5"
              title="Open Evidence Dossier"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
              <span className="font-pixel text-[9px] hidden sm:inline">CLUES:</span>
              <span className="font-bold text-white bg-cyan-900 px-1.5 py-0.2 border border-cyan-700 text-[11px]">
                {state.clues.length}/5
              </span>
            </button>

            {/* Investigation Timer */}
            {isGameActive && (
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-cyber-900 border border-slate-700 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-code text-xs text-slate-200">{formatTime(state.timerSeconds)}</span>
              </div>
            )}

            {/* Controls: Audio, Scanlines, Help, Reset */}
            <div className="flex items-center gap-1">
              {/* Sound Toggle */}
              <button
                onClick={onToggleSound}
                className={`p-1.5 border transition-colors ${
                  state.soundMuted
                    ? 'border-slate-800 bg-slate-900 text-slate-500 hover:text-slate-300'
                    : 'border-cyan-800 bg-cyan-950 text-cyber-cyan hover:border-cyber-cyan'
                }`}
                title={state.soundMuted ? "Unmute Audio" : "Mute Audio"}
                aria-label={state.soundMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {state.soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* CRT Scanline Toggle */}
              <button
                onClick={onToggleScanlines}
                className={`p-1.5 border hidden sm:block transition-colors ${
                  state.scanlinesEnabled
                    ? 'border-emerald-800 bg-emerald-950 text-emerald-400'
                    : 'border-slate-800 bg-slate-900 text-slate-500 hover:text-slate-300'
                }`}
                title="Toggle CRT Scanline Effect"
                aria-label="Toggle CRT Scanlines"
              >
                <Monitor className="w-4 h-4" />
              </button>

              {/* Help / Guide */}
              <button
                onClick={() => {
                  setShowHowToPlay(true);
                }}
                className="p-1.5 border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                title="Case Brief & Help"
                aria-label="Case Brief & Help"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              {/* Reset Game */}
              {isGameActive && (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="p-1.5 border border-rose-900/60 bg-rose-950/30 text-rose-400 hover:bg-rose-900/60 hover:text-white transition-colors ml-1"
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
            <div className="text-[10px] font-pixel text-slate-400 uppercase">
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
