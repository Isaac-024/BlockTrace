import React, { useState } from 'react';
import { Shield, Play, HelpCircle, Terminal, Award, CheckCircle2, ChevronRight, Zap, Lock, Skull } from 'lucide-react';
import { VoxelButton } from '../components/common/VoxelButton';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { CyberBadge } from '../components/common/CyberBadge';
import { HowToPlayModal } from '../components/hud/HowToPlayModal';
import { CASE_METADATA } from '../data/caseData';
import { calculateRank } from '../utils/scoring';

export function HomeScreen({ state, onStart, onNavigate }) {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const completedCount = Object.values(state.levelResults).filter(l => l.completed).length;
  const isStarted = completedCount > 0 || state.timerSeconds > 0;
  const currentRank = calculateRank(state.score);

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center p-4 sm:p-8 cyber-grid">
      {/* Background Cyber Glowing Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8 py-6">
        {/* Top Status Pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-900/90 border-2 border-cyber-cyan shadow-[0_0_15px_rgba(0,245,212,0.25)]">
            <span className="w-2 h-2 bg-rose-500 animate-ping" />
            <span className="font-pixel text-[10px] text-cyber-cyan uppercase tracking-widest">
              INCIDENT ALERT // THREAT DETECTED
            </span>
          </div>
        </div>

        {/* Hero Title Header */}
        <div className="text-center space-y-3">
          {/* Main Logo */}
          <div className="inline-block relative">
            <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyber-cyan tracking-wider drop-shadow-[0_4px_16px_rgba(0,245,212,0.5)]">
              BLOCKTRACE
            </h1>
            {/* Voxel decorative cube pins */}
            <div className="hidden sm:block absolute -top-3 -right-6 w-4 h-4 bg-cyber-cyan border border-white/80 rotate-12 shadow-[0_0_10px_#00f5d4]" />
            <div className="hidden sm:block absolute -bottom-2 -left-6 w-3 h-3 bg-emerald-400 border border-white/80 -rotate-12 shadow-[0_0_8px_#10b981]" />
          </div>

          {/* Case Title */}
          <div className="flex items-center justify-center gap-2 font-pixel text-sm sm:text-base md:text-lg text-emerald-400 tracking-widest uppercase">
            <span className="text-slate-500">[</span>
            <span className="text-cyber-cyan">{CASE_METADATA.caseNumber}:</span>
            <span className="text-slate-100">{CASE_METADATA.name}</span>
            <span className="text-slate-500">]</span>
          </div>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 font-sans tracking-wide leading-relaxed">
            "{CASE_METADATA.subtitle}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <VoxelButton
            variant="cyan"
            size="lg"
            onClick={onStart}
            icon={Play}
            className="w-full sm:w-auto text-xs sm:text-sm px-8 py-4 shadow-[4px_4px_0px_#005c50] hover:scale-105"
          >
            {isStarted ? "RESUME INVESTIGATION" : "START INVESTIGATION"}
          </VoxelButton>

          <VoxelButton
            variant="dark"
            size="lg"
            onClick={() => setShowHowToPlay(true)}
            icon={HelpCircle}
            className="w-full sm:w-auto text-xs sm:text-sm px-6 py-4"
          >
            HOW TO PLAY
          </VoxelButton>
        </div>

        {/* Player Dossier & Case Telemetry Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* Dossier Card */}
          <VoxelBlock
            title="DETECTIVE DOSSIER"
            icon={Shield}
            variant="cyan"
            className="h-full"
          >
            <div className="space-y-3 font-code text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">OPERATOR:</span>
                <span className="text-slate-100 font-bold">CYBER-SPECIALIST</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">CURRENT RANK:</span>
                <span className="text-cyber-cyan font-pixel text-[10px]">{currentRank.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">TOTAL SCORE:</span>
                <span className="text-emerald-400 font-bold">{state.score} PTS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">XP EARNED:</span>
                <span className="text-amber-400 font-bold">{state.xp} XP</span>
              </div>
            </div>
          </VoxelBlock>

          {/* Progress Card */}
          <VoxelBlock
            title="MISSION PROGRESS"
            icon={Terminal}
            variant="green"
            className="h-full"
          >
            <div className="space-y-3 font-code text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">CASE NUMBER:</span>
                <span className="text-slate-200">#01-CORE</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">LEVELS CLEARED:</span>
                <span className="text-emerald-400 font-bold">{completedCount} / 5</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">EVIDENCE CLUES:</span>
                <span className="text-cyber-cyan font-bold">{state.clues.length} / 5 FOUND</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">THREAT STATUS:</span>
                <span className="text-rose-400 font-pixel text-[9px] animate-pulse">ACTIVE ROGUE</span>
              </div>
            </div>
          </VoxelBlock>

          {/* Level Quick Select Grid */}
          <VoxelBlock
            title="OPERATION PHASES"
            icon={Award}
            variant="default"
            className="h-full"
          >
            <div className="space-y-1.5">
              {CASE_METADATA.levels.map((lvl) => {
                const isUnlocked = lvl.id <= state.unlockedLevel;
                const isDone = state.levelResults[lvl.id]?.completed;
                return (
                  <button
                    key={lvl.id}
                    disabled={!isUnlocked}
                    onClick={() => onNavigate(`level-${lvl.id}`)}
                    className={`
                      w-full px-2.5 py-1.5 text-left border flex items-center justify-between transition-colors
                      ${isDone 
                        ? 'border-emerald-800/80 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50' 
                        : isUnlocked 
                        ? 'border-cyan-800/80 bg-cyan-950/40 text-cyber-cyan hover:bg-cyan-900/50' 
                        : 'border-slate-800 bg-cyber-950/60 text-slate-600 cursor-not-allowed'}
                    `}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm">{lvl.icon}</span>
                      <span className="font-pixel text-[9px] truncate">
                        L{lvl.id}: {lvl.name}
                      </span>
                    </div>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : isUnlocked ? (
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
                    ) : (
                      <Lock className="w-3 h-3 text-slate-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </VoxelBlock>
        </div>
      </div>

      {/* How To Play Modal */}
      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </div>
  );
}
