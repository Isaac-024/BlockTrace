import React, { useState } from 'react';
import { Key, ShieldCheck, AlertTriangle, ArrowRight, Zap, CheckCircle2, Lock, Cpu } from 'lucide-react';
import { LEVEL_2_PASSWORDS } from '../data/level2Passwords';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { VoxelButton } from '../components/common/VoxelButton';
import { CyberBadge } from '../components/common/CyberBadge';
import { sound } from '../utils/soundSynthesizer';
import { fireClueDiscoverySparks } from '../components/effects/VictoryConfetti';
import { calculateLevelScore } from '../utils/scoring';

export function Level2Password({ onComplete, onNextLevel, isCompleted, currentClues }) {
  // A) Inspection State — inspect multiple passwords freely
  const [inspectedPwdId, setInspectedPwdId] = useState(LEVEL_2_PASSWORDS[0].id);
  const [inspectedIds, setInspectedIds] = useState(new Set([LEVEL_2_PASSWORDS[0].id]));

  // B) Final Answer & Submission State — committed on SUBMIT
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedPwdId, setSubmittedPwdId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [solved, setSolved] = useState(isCompleted);

  // Sync solved state if isCompleted changes
  React.useEffect(() => {
    setSolved(isCompleted);
    if (!isCompleted) {
      setFeedback(null);
      setIsSubmitted(false);
      setSubmittedPwdId(null);
      setInspectedPwdId(LEVEL_2_PASSWORDS[0].id);
      setInspectedIds(new Set([LEVEL_2_PASSWORDS[0].id]));
    }
  }, [isCompleted]);

  // Inspection handler: Clicking a password loads it into the scanner
  const handleInspectPwd = (pwd) => {
    setInspectedPwdId(pwd.id);
    setInspectedIds((prev) => {
      const next = new Set(prev);
      next.add(pwd.id);
      return next;
    });
  };

  const activePwd = LEVEL_2_PASSWORDS.find((p) => p.id === inspectedPwdId) || LEVEL_2_PASSWORDS[0];

  // Final Answer Submission: ONE attempt verified on SUBMIT
  const handleVerify = (targetPwd) => {
    if (isSubmitted || !targetPwd) return;

    // Lock verification permanently
    setIsSubmitted(true);
    setSubmittedPwdId(targetPwd.id);

    if (targetPwd.isCorrect) {
      sound.playVoxelBlast();
      sound.playClueFound();
      fireClueDiscoverySparks();
      setSolved(true);

      const earnedScore = calculateLevelScore(250, 1);
      const earnedXp = 250;

      setFeedback({
        type: 'success',
        title: 'PASSWORD AUDIT COMPLETE // CLUE #2 UNLOCKED',
        message: 'T9#kL2!xQ is by far the strongest credential! It boasts maximum Shannon entropy, total randomness without dictionary words, mixed uppercase, lowercase, numbers, and symbols, resisting automated GPU cracking attacks.',
        clue: targetPwd.clueDiscovered,
        earnedScore,
        earnedXp
      });

      onComplete(2, earnedScore, earnedXp, targetPwd.clueDiscovered, 1);
    } else {
      sound.playIncorrect();
      setFeedback({
        type: 'error',
        title: 'VULNERABLE PASSWORD AUDITED',
        message: `"${targetPwd.password}" is vulnerable. ${targetPwd.analysis}`
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Objective Header */}
      <div className="p-4 bg-cyber-900 border-t-2 border-l-2 border-slate-600 border-r-[4px] border-b-[4px] border-slate-950 shadow-voxel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CyberBadge variant="cyan" size="sm">LEVEL 2 // CREDENTIAL FORENSICS</CyberBadge>
            {solved && <CyberBadge variant="green" size="sm">COMPLETED</CyberBadge>}
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span>🔑 PASSWORD DETECTIVE</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Question: <span className="text-cyber-cyan font-bold">"Which password is strongest against brute-force &amp; dictionary attacks?"</span>
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
          <div className="px-3.5 py-2.5 bg-cyber-900/95 border-t border-l border-slate-700 border-r-2 border-b-2 border-slate-950 flex items-center justify-between text-xs font-code text-slate-300 shadow-voxel">
            <span className="flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5 text-cyber-cyan" />
              CANDIDATE PASSWORDS ({LEVEL_2_PASSWORDS.length})
            </span>
            <span className="text-[11px] text-slate-400">
              {inspectedIds.size}/5 Inspected
            </span>
          </div>

          <div className="space-y-2.5">
            {LEVEL_2_PASSWORDS.map((pwd) => {
              const isCurrentlyInspected = activePwd.id === pwd.id;
              const hasBeenInspected = inspectedIds.has(pwd.id);
              const wasSubmittedThis = isSubmitted && submittedPwdId === pwd.id;

              const postSubmitCorrect = wasSubmittedThis && pwd.isCorrect;
              const postSubmitWrong = wasSubmittedThis && !pwd.isCorrect;

              return (
                <div
                  key={pwd.id}
                  onClick={() => handleInspectPwd(pwd)}
                  className={`
                    p-3.5 border-t-2 border-l-2 border-r-[4px] border-b-[4px] transition-all select-none cursor-pointer
                    ${isSubmitted
                      ? wasSubmittedThis
                        ? postSubmitCorrect
                          ? 'border-emerald-400 bg-emerald-950/60 text-emerald-100 shadow-voxel-green'
                          : 'border-rose-500 bg-rose-950/60 text-rose-100 shadow-voxel-rose'
                        : isCurrentlyInspected
                        ? 'border-slate-600 bg-slate-800/60 text-slate-300'
                        : 'border-slate-900 bg-cyber-900/80 text-slate-400 opacity-70 hover:opacity-100'
                      : isCurrentlyInspected
                      ? 'border-cyber-cyan bg-cyan-950/50 shadow-voxel-cyan -translate-y-0.5'
                      : 'border-slate-800 bg-cyber-900/90 hover:border-slate-600 hover:bg-slate-800/60 shadow-voxel'}
                  `}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span className="font-code text-sm sm:text-base font-bold text-slate-100 tracking-wider">
                      {pwd.password}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {hasBeenInspected && (
                        <CyberBadge variant="slate" size="xs">
                          INSPECTED
                        </CyberBadge>
                      )}
                      <span className="font-pixel text-[10px] text-slate-400">
                        {pwd.length} chars
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-code text-slate-500">
                    <span>Upper: {pwd.metrics.hasUppercase ? '✓' : '✗'}</span>
                    <span>•</span>
                    <span>Lower: {pwd.metrics.hasLowercase ? '✓' : '✗'}</span>
                    <span>•</span>
                    <span>Num: {pwd.metrics.hasNumbers ? '✓' : '✗'}</span>
                    <span>•</span>
                    <span>Sym: {pwd.metrics.hasSymbols ? '✓' : '✗'}</span>
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
            variant="cyan"
            className="h-full flex flex-col justify-between"
            bodyClassName="p-5 flex-1 flex flex-col justify-between space-y-5"
          >
            {/* Scanned Password Display */}
            <div className="bg-cyber-950/90 p-4 border border-slate-800 space-y-3 shadow-voxel">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs text-slate-500 uppercase tracking-widest">
                  TARGET CREDENTIAL
                </span>
                <CyberBadge variant="slate" size="xs">INSPECTING</CyberBadge>
              </div>

              <div className="font-code text-xl sm:text-2xl font-bold text-white tracking-widest bg-cyber-900/90 p-3 border-2 border-slate-700 text-center shadow-inner">
                {activePwd.password}
              </div>

              {/* Neutral progress bar — character length ratio */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-code">
                  <span className="text-slate-400">Length Analysis</span>
                  <span className="font-bold text-slate-300">{activePwd.length} characters</span>
                </div>
                <div className="w-full bg-cyber-900 h-3 border border-slate-700 overflow-hidden shadow-inner">
                  <div
                    className="h-full transition-all duration-500 bg-cyber-cyan/60"
                    style={{ width: `${Math.min(100, (activePwd.length / 16) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metric Checklist Grid — neutral display */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-code">
              <div className={`p-2.5 border text-center ${activePwd.metrics.hasUppercase ? 'border-slate-600 bg-cyber-950/90 text-slate-200' : 'border-slate-800 bg-cyber-950 text-slate-500'}`}>
                <div className="font-bold text-sm">{activePwd.metrics.hasUppercase ? '✓' : '✗'}</div>
                <div className="text-[10px] mt-0.5">UPPERCASE</div>
              </div>
              <div className={`p-2.5 border text-center ${activePwd.metrics.hasLowercase ? 'border-slate-600 bg-cyber-950/90 text-slate-200' : 'border-slate-800 bg-cyber-950 text-slate-500'}`}>
                <div className="font-bold text-sm">{activePwd.metrics.hasLowercase ? '✓' : '✗'}</div>
                <div className="text-[10px] mt-0.5">LOWERCASE</div>
              </div>
              <div className={`p-2.5 border text-center ${activePwd.metrics.hasNumbers ? 'border-slate-600 bg-cyber-950/90 text-slate-200' : 'border-slate-800 bg-cyber-950 text-slate-500'}`}>
                <div className="font-bold text-sm">{activePwd.metrics.hasNumbers ? '✓' : '✗'}</div>
                <div className="text-[10px] mt-0.5">NUMBERS</div>
              </div>
              <div className={`p-2.5 border text-center ${activePwd.metrics.hasSymbols ? 'border-slate-600 bg-cyber-950/90 text-slate-200' : 'border-slate-800 bg-cyber-950 text-slate-500'}`}>
                <div className="font-bold text-sm">{activePwd.metrics.hasSymbols ? '✓' : '✗'}</div>
                <div className="text-[10px] mt-0.5">SYMBOLS</div>
              </div>
            </div>

            {/* Post-submission analysis display or pre-submission neutral status */}
            {isSubmitted ? (
              <div className="p-3.5 bg-cyber-950/90 border border-slate-800 text-xs space-y-2 shadow-voxel">
                <div className="flex items-center gap-2 text-slate-300 font-pixel text-[10px]">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  BRUTE-FORCE RESISTANCE RATING:
                </div>
                <p className="font-code text-cyber-cyan font-bold text-sm">
                  {activePwd.crackTimeEstimate}
                </p>
                <p className="text-slate-400 leading-relaxed font-sans">
                  {activePwd.analysis}
                </p>
              </div>
            ) : (
              <div className="p-3 bg-cyber-950/70 border border-slate-800 text-xs font-code text-slate-400 text-center shadow-voxel">
                Auditing character distribution and entropy parameters... Click SUBMIT to lock audit.
              </div>
            )}

            {/* Submission Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-code">
                {isSubmitted
                  ? 'Submission locked.'
                  : `Commit "${activePwd.password}" as your final choice?`}
              </span>

              <VoxelButton
                variant={isSubmitted ? "dark" : "green"}
                size="md"
                onClick={() => handleVerify(activePwd)}
                icon={ShieldCheck}
                className="w-full sm:w-auto"
                disabled={isSubmitted}
              >
                {isSubmitted ? 'AUDIT SUBMITTED' : 'CONFIRM AS STRONGEST PASSWORD'}
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

              {feedback.clue && (
                <div className="p-3 bg-cyber-950/90 border-l-4 border-cyber-cyan text-xs font-code text-cyan-300 shadow-voxel">
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
