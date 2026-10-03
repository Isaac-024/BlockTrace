import React, { useState } from 'react';
import { Key, ShieldCheck, AlertTriangle, ArrowRight, Zap, CheckCircle2, Lock, Cpu, Sparkles } from 'lucide-react';
import { LEVEL_2_PASSWORDS } from '../data/level2Passwords';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { VoxelButton } from '../components/common/VoxelButton';
import { CyberBadge } from '../components/common/CyberBadge';
import { sound } from '../utils/soundSynthesizer';
import { fireClueDiscoverySparks } from '../components/effects/VictoryConfetti';
import { calculateLevelScore } from '../utils/scoring';

export function Level2Password({ onComplete, onNextLevel, isCompleted, currentClues }) {
  const [selectedPwd, setSelectedPwd] = useState(LEVEL_2_PASSWORDS[0]);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [solved, setSolved] = useState(isCompleted);

  // Sync solved state if isCompleted changes
  React.useEffect(() => {
    setSolved(isCompleted);
    if (!isCompleted) {
      setFeedback(null);
      setAttempts(0);
      setSelectedPwd(LEVEL_2_PASSWORDS[0]);
    }
  }, [isCompleted]);

  const handleSelect = (pwd) => {
    setSelectedPwd(pwd);
  };

  const handleVerify = (pwdToTest) => {
    const pwd = pwdToTest || selectedPwd;
    setAttempts((prev) => prev + 1);

    if (pwd.isCorrect) {
      // Meaningful event: Correct password audit & clue discovered
      sound.playClueFound();
      fireClueDiscoverySparks();
      setSolved(true);

      const earnedScore = calculateLevelScore(250, attempts + 1);
      const earnedXp = 250;

      setFeedback({
        type: 'success',
        title: 'PASSWORD AUDIT COMPLETE // CLUE UNLOCKED',
        message: 'T9#kL2!xQ is by far the strongest credential! It boasts high Shannon entropy, total randomness without dictionary words, mixed uppercase, lowercase, numbers, and symbols, making it virtually uncrackable with modern hardware.',
        clue: pwd.clueDiscovered,
        earnedScore,
        earnedXp
      });

      onComplete(2, earnedScore, earnedXp, pwd.clueDiscovered, attempts + 1);
    } else {
      sound.playIncorrect();
      setFeedback({
        type: 'error',
        title: 'VULNERABLE PASSWORD IDENTIFIED',
        message: `"${pwd.password}" is too weak against brute-force or dictionary attacks. ${pwd.analysis}`,
        educationalHint: 'Look for passwords with high entropy: zero recognizable dictionary words, mixed upper/lower case letters, numbers, and symbols.'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Objective Header */}
      <div className="p-4 bg-cyber-900 border-2 border-slate-700 shadow-voxel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CyberBadge variant="cyan" size="sm">LEVEL 2 // CREDENTIAL FORENSICS</CyberBadge>
            {solved && <CyberBadge variant="green" size="sm">COMPLETED</CyberBadge>}
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span>🔑 PASSWORD DETECTIVE</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Question: <span className="text-cyber-cyan font-bold">"Which password is strongest against brute-force & dictionary attacks?"</span>
          </p>
        </div>

        {solved && (
          <VoxelButton
            variant="green"
            size="md"
            onClick={onNextLevel}
            icon={ArrowRight}
            className="shrink-0"
          >
            NEXT: SUSPICIOUS WEBSITE
          </VoxelButton>
        )}
      </div>

      {/* Main Grid: Interactive Password Cards (Left) & Entropy Scanner (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Passwords Options List (Left) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="px-3 py-2 bg-cyber-900/90 border border-slate-700 flex items-center justify-between text-xs font-code text-slate-300">
            <span className="flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5 text-cyber-cyan" />
              CANDIDATE PASSWORDS (5)
            </span>
            <span className="text-[11px] text-slate-400">Select to test</span>
          </div>

          <div className="space-y-2.5">
            {LEVEL_2_PASSWORDS.map((pwd) => {
              const isSelected = selectedPwd.id === pwd.id;
              return (
                <div
                  key={pwd.id}
                  onClick={() => handleSelect(pwd)}
                  className={`
                    p-3.5 border-2 cursor-pointer transition-all select-none
                    ${isSelected 
                      ? 'border-cyber-cyan bg-cyan-950/40 shadow-voxel-cyan -translate-y-0.5' 
                      : 'border-slate-800 bg-cyber-900/90 hover:border-slate-600 hover:bg-slate-800/50'}
                  `}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-code text-sm sm:text-base font-bold text-slate-100 tracking-wider">
                      {pwd.password}
                    </span>
                    <span className={`font-pixel text-[10px] ${pwd.color}`}>
                      {pwd.strengthLabel}
                    </span>
                  </div>

                  {/* Visual Strength Meter Bar */}
                  <div className="w-full bg-cyber-950 h-2 border border-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${pwd.barColor}`}
                      style={{ width: `${pwd.scoreRating}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-code text-slate-400 mt-1.5">
                    <span>Length: {pwd.length} chars</span>
                    <span>Crack Time: {pwd.crackTimeEstimate.split(' ')[0]} {pwd.crackTimeEstimate.split(' ')[1]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Entropy Scanner Diagnostic Bench (Right) */}
        <div className="lg:col-span-7">
          <VoxelBlock
            title="ENTROPY DIAGNOSTIC SCANNER"
            icon={Cpu}
            variant={selectedPwd.isCorrect && solved ? "green" : "cyan"}
            className="h-full flex flex-col justify-between"
            bodyClassName="p-5 flex-1 flex flex-col justify-between space-y-5"
          >
            {/* Scanned Password Display */}
            <div className="bg-cyber-950 p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs text-slate-500 uppercase tracking-widest">
                  TARGET CREDENTIAL
                </span>
                <CyberBadge
                  variant={selectedPwd.scoreRating > 80 ? "green" : selectedPwd.scoreRating > 40 ? "amber" : "rose"}
                  size="xs"
                >
                  {selectedPwd.strengthLabel}
                </CyberBadge>
              </div>

              <div className="font-code text-xl sm:text-2xl font-bold text-white tracking-widest bg-cyber-900/90 p-3 border border-slate-700 text-center">
                {selectedPwd.password}
              </div>

              {/* Progress meter */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-code">
                  <span className="text-slate-400">Cryptographic Entropy Rating</span>
                  <span className={`font-bold ${selectedPwd.color}`}>{selectedPwd.scoreRating} / 100</span>
                </div>
                <div className="w-full bg-cyber-900 h-3 border border-slate-700 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${selectedPwd.barColor}`}
                    style={{ width: `${selectedPwd.scoreRating}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metric Checklist Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-code">
              <div className={`p-2.5 border text-center ${selectedPwd.metrics.hasUppercase ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300' : 'border-slate-800 bg-cyber-950 text-slate-500'}`}>
                <div className="font-bold text-sm">{selectedPwd.metrics.hasUppercase ? '✓' : '✗'}</div>
                <div className="text-[10px] mt-0.5">UPPERCASE</div>
              </div>
              <div className={`p-2.5 border text-center ${selectedPwd.metrics.hasLowercase ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300' : 'border-slate-800 bg-cyber-950 text-slate-500'}`}>
                <div className="font-bold text-sm">{selectedPwd.metrics.hasLowercase ? '✓' : '✗'}</div>
                <div className="text-[10px] mt-0.5">LOWERCASE</div>
              </div>
              <div className={`p-2.5 border text-center ${selectedPwd.metrics.hasNumbers ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300' : 'border-slate-800 bg-cyber-950 text-slate-500'}`}>
                <div className="font-bold text-sm">{selectedPwd.metrics.hasNumbers ? '✓' : '✗'}</div>
                <div className="text-[10px] mt-0.5">NUMBERS</div>
              </div>
              <div className={`p-2.5 border text-center ${selectedPwd.metrics.hasSymbols ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300' : 'border-slate-800 bg-cyber-950 text-slate-500'}`}>
                <div className="font-bold text-sm">{selectedPwd.metrics.hasSymbols ? '✓' : '✗'}</div>
                <div className="text-[10px] mt-0.5">SYMBOLS</div>
              </div>
            </div>

            {/* Analysis details */}
            <div className="p-3.5 bg-cyber-950/80 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-pixel text-[10px]">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                ESTIMATED BRUTE-FORCE TIME:
              </div>
              <p className="font-code text-cyber-cyan font-bold text-sm">
                {selectedPwd.crackTimeEstimate}
              </p>
              <p className="text-slate-400 leading-relaxed font-sans">
                {selectedPwd.analysis}
              </p>
            </div>

            {/* Submission Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-code">
                Select your choice and submit
              </span>

              <VoxelButton
                variant={selectedPwd.isCorrect ? "green" : "cyan"}
                size="md"
                onClick={() => handleVerify(selectedPwd)}
                icon={ShieldCheck}
                className="w-full sm:w-auto"
              >
                CONFIRM AS STRONGEST PASSWORD
              </VoxelButton>
            </div>
          </VoxelBlock>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`
            p-5 border-4 transition-all duration-300 animate-block-bounce shadow-voxel-lg
            ${feedback.type === 'success' 
              ? 'bg-emerald-950/90 border-emerald-400 shadow-voxel-green text-emerald-100' 
              : 'bg-rose-950/90 border-rose-500 shadow-voxel-rose text-rose-100'}
          `}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
                )}
                <h3 className="font-pixel text-xs sm:text-sm tracking-wider uppercase">
                  {feedback.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed max-w-3xl">
                {feedback.message}
              </p>

              {/* Explanatory bullet points for correct answer */}
              {feedback.type === 'success' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans text-xs">
                  <div className="p-2 bg-cyber-950/80 border border-emerald-700/60 text-emerald-200">
                    <strong>• Length & Complexity:</strong> 9 high-entropy chars resist automated hash-tables.
                  </div>
                  <div className="p-2 bg-cyber-950/80 border border-emerald-700/60 text-emerald-200">
                    <strong>• Maximum Randomness:</strong> No dictionary words, names, or keyboard patterns.
                  </div>
                  <div className="p-2 bg-cyber-950/80 border border-emerald-700/60 text-emerald-200">
                    <strong>• Mixed Character Types:</strong> Upper, lower, numbers, and special symbols combined.
                  </div>
                  <div className="p-2 bg-cyber-950/80 border border-emerald-700/60 text-emerald-200">
                    <strong>• Difficult to Guess:</strong> Immune to social engineering and birthday attacks.
                  </div>
                </div>
              )}

              {feedback.clue && (
                <div className="p-3 bg-cyber-950/80 border-l-4 border-cyber-cyan text-xs font-code text-cyan-300">
                  <span className="font-pixel text-[10px] text-cyber-cyan block mb-1">
                    EVIDENCE UNLOCKED: {feedback.clue.title}
                  </span>
                  <span>{feedback.clue.summary}</span>
                </div>
              )}
            </div>

            {feedback.type === 'success' && (
              <VoxelButton
                variant="green"
                size="md"
                onClick={onNextLevel}
                icon={ArrowRight}
                className="shrink-0 w-full md:w-auto"
              >
                PROCEED TO LEVEL 3
              </VoxelButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
