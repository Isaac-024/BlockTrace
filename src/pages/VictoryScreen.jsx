import React, { useEffect } from 'react';
import { Award, CheckCircle2, RotateCcw, Home, Clock, Zap, Shield, FileText, ChevronRight, Share2 } from 'lucide-react';
import { VoxelButton } from '../components/common/VoxelButton';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { CyberBadge } from '../components/common/CyberBadge';
import { calculateRank, formatTime } from '../utils/scoring';
import { fireCyberConfetti } from '../components/effects/VictoryConfetti';
import { sound } from '../utils/soundSynthesizer';

export function VictoryScreen({ state, onPlayAgain, onReturnHome }) {
  const finalRank = calculateRank(state.score);
  const timeFormatted = formatTime(state.timerSeconds);

  useEffect(() => {
    fireCyberConfetti();
    const timer = setTimeout(() => {
      fireCyberConfetti();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center p-4 sm:p-8 cyber-grid animate-fadeIn">
      {/* Background Cyber Glowing Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8 py-6">
        {/* Victory Header Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-950/90 border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
            <span className="w-2.5 h-2.5 bg-emerald-400 animate-ping" />
            <span className="font-pixel text-xs text-emerald-300 uppercase tracking-widest">
              CASE CLOSED // THREAT ELIMINATED
            </span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-200 to-emerald-400 tracking-wider drop-shadow-[0_4px_16px_rgba(16,185,129,0.5)]">
            CASE CLOSED! 🎉
          </h1>

          <p className="font-pixel text-xs sm:text-sm text-cyber-cyan tracking-wider uppercase">
            CYBER DETECTIVE SUCCESSFULLY STOPPED THE ATTACK
          </p>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            HexaCorp Core Systems are secure. Vikram Desai has been apprehended, the rogue listener terminated, and student credentials protected.
          </p>
        </div>

        {/* Rank & Medallion Banner */}
        <div className="p-6 bg-cyber-900 border-4 border-emerald-500 shadow-voxel-green text-center space-y-3">
          <div className="text-4xl sm:text-5xl mb-1">{finalRank.icon}</div>
          <div className="font-code text-xs text-slate-400 uppercase tracking-widest">
            AWARDED DETECTIVE TITLE
          </div>
          <h2 className="font-pixel text-xl sm:text-3xl text-emerald-300 uppercase tracking-wide">
            {finalRank.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans">
            {finalRank.desc}
          </p>
        </div>

        {/* Final Statistics Scoreboard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 bg-cyber-900/90 border-2 border-slate-700 shadow-voxel text-center space-y-1">
            <span className="font-code text-[11px] text-slate-400 uppercase block">FINAL SCORE</span>
            <span className="font-pixel text-lg sm:text-2xl text-cyber-cyan font-bold block">
              {state.score}
            </span>
            <span className="font-code text-[10px] text-slate-500">POINTS</span>
          </div>

          <div className="p-4 bg-cyber-900/90 border-2 border-slate-700 shadow-voxel text-center space-y-1">
            <span className="font-code text-[11px] text-slate-400 uppercase block">EXPERIENCE</span>
            <span className="font-pixel text-lg sm:text-2xl text-amber-400 font-bold block">
              {state.xp}
            </span>
            <span className="font-code text-[10px] text-slate-500">XP EARNED</span>
          </div>

          <div className="p-4 bg-cyber-900/90 border-2 border-slate-700 shadow-voxel text-center space-y-1">
            <span className="font-code text-[11px] text-slate-400 uppercase block">CLUES FOUND</span>
            <span className="font-pixel text-lg sm:text-2xl text-emerald-400 font-bold block">
              {state.clues.length} / 5
            </span>
            <span className="font-code text-[10px] text-slate-500">100% DISCOVERY</span>
          </div>

          <div className="p-4 bg-cyber-900/90 border-2 border-slate-700 shadow-voxel text-center space-y-1">
            <span className="font-code text-[11px] text-slate-400 uppercase block">TIME ELAPSED</span>
            <span className="font-pixel text-lg sm:text-2xl text-slate-100 font-bold block">
              {timeFormatted}
            </span>
            <span className="font-code text-[10px] text-slate-500">INVESTIGATION TIME</span>
          </div>
        </div>

        {/* Incident Retrospective: What Students Learned */}
        <VoxelBlock
          title="CYBERSECURITY LEARNING TAKEAWAYS"
          icon={FileText}
          variant="cyan"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
            <div className="p-3 bg-cyber-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-cyber-cyan block">1. Spot Phishing Red Flags</span>
              <p className="text-slate-300">
                Look for fake domains (.ru, .xyz), artificial panic deadlines, and unrequested credential demands.
              </p>
            </div>

            <div className="p-3 bg-cyber-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-cyber-cyan block">2. High-Entropy Passwords</span>
              <p className="text-slate-300">
                Avoid dictionary words and simple l33tspeak. Use unpredictable random character strings with symbols.
              </p>
            </div>

            <div className="p-3 bg-cyber-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-cyber-cyan block">3. Insecure HTTP & Rogue Domains</span>
              <p className="text-slate-300">
                Never submit credentials over unencrypted HTTP connections or unverified third-party domains.
              </p>
            </div>

            <div className="p-3 bg-cyber-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-cyber-cyan block">4. Cyber Kill Chain & Alibis</span>
              <p className="text-slate-300">
                Network forensics (access point triangulation, port telemetry, timestamp matching) uncover the truth.
              </p>
            </div>
          </div>
        </VoxelBlock>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <VoxelButton
            variant="cyan"
            size="lg"
            onClick={onPlayAgain}
            icon={RotateCcw}
            className="w-full sm:w-auto px-8 py-4 shadow-[4px_4px_0px_#005c50]"
          >
            PLAY AGAIN
          </VoxelButton>

          <VoxelButton
            variant="dark"
            size="lg"
            onClick={onReturnHome}
            icon={Home}
            className="w-full sm:w-auto px-8 py-4"
          >
            RETURN TO CASE FILES
          </VoxelButton>
        </div>
      </div>
    </div>
  );
}
