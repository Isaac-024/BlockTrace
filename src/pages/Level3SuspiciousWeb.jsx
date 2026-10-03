import React, { useState } from 'react';
import { Globe, ShieldAlert, AlertTriangle, CheckCircle2, ArrowRight, Lock, Unlock, Search, Terminal, Info, ExternalLink } from 'lucide-react';
import { LEVEL_3_CLUES, LEVEL_3_QUIZ } from '../data/level3Website';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { VoxelButton } from '../components/common/VoxelButton';
import { CyberBadge } from '../components/common/CyberBadge';
import { sound } from '../utils/soundSynthesizer';
import { fireClueDiscoverySparks } from '../components/effects/VictoryConfetti';
import { calculateLevelScore } from '../utils/scoring';

export function Level3SuspiciousWeb({ onComplete, onNextLevel, isCompleted, currentClues }) {
  const [inspectedClues, setInspectedClues] = useState(new Set());
  const [activeInspector, setActiveInspector] = useState(LEVEL_3_CLUES[0]);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [solved, setSolved] = useState(isCompleted);
  const [attempts, setAttempts] = useState(0);

  // Sync solved state if isCompleted changes
  React.useEffect(() => {
    setSolved(isCompleted);
    if (!isCompleted) {
      setQuizFeedback(null);
      setAttempts(0);
      setInspectedClues(new Set());
      setActiveInspector(LEVEL_3_CLUES[0]);
      setSelectedQuizOption(null);
    }
  }, [isCompleted]);

  const handleInspectZone = (clue) => {
    setActiveInspector(clue);
    setInspectedClues((prev) => {
      const next = new Set(prev);
      next.add(clue.id);
      return next;
    });
  };

  const handleQuizAnswer = (option) => {
    setSelectedQuizOption(option);
    setAttempts((prev) => prev + 1);

    if (option.isCorrect) {
      // Meaningful event: Correct technical deduction & Clue Found
      sound.playClueFound();
      fireClueDiscoverySparks();
      setSolved(true);

      const earnedScore = calculateLevelScore(300, attempts + 1);
      const earnedXp = 300;

      setQuizFeedback({
        type: 'success',
        title: 'ROGUE INFRASTRUCTURE UNMASKED // CLUE 3 UNLOCKED',
        message: option.feedback,
        clue: LEVEL_3_QUIZ.clueDiscovered,
        earnedScore,
        earnedXp
      });

      onComplete(3, earnedScore, earnedXp, LEVEL_3_QUIZ.clueDiscovered, attempts + 1);
    } else {
      sound.playIncorrect();
      setQuizFeedback({
        type: 'error',
        title: 'INCORRECT TECHNICAL DEDUCTION',
        message: option.feedback,
        educationalHint: 'Remember the forensic indicators: Check the protocol prefix (HTTP vs HTTPS) and the Top-Level Domain suffix (.edu vs .xyz).'
      });
    }
  };

  const allInspected = inspectedClues.size >= 3;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Objective Header */}
      <div className="p-4 bg-cyber-900 border-2 border-slate-700 shadow-voxel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CyberBadge variant="cyan" size="sm">LEVEL 3 // WEB DOMAIN INVESTIGATION</CyberBadge>
            {solved && <CyberBadge variant="green" size="sm">COMPLETED</CyberBadge>}
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span>🌐 SUSPICIOUS WEBSITE</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Investigate the simulated fake login site below. <span className="text-cyber-cyan font-semibold">Click highlighted red-flag targets</span> to gather evidence, then confirm the critical security threat.
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
            NEXT: TRACE THE ATTACK
          </VoxelButton>
        )}
      </div>

      {/* Main Grid: Browser Sandbox (Left) & Inspector Terminal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Simulated Browser Frame (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Simulated Browser Window Chrome */}
          <div className="border-4 border-slate-700 bg-cyber-950 shadow-voxel overflow-hidden">
            {/* Window Title Bar */}
            <div className="px-3 py-2 bg-slate-900 border-b-2 border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-none border border-black/40" />
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-none border border-black/40" />
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-none border border-black/40" />
                <span className="font-code text-[11px] text-slate-300 ml-2 font-bold">
                  VOXELNET NAVIGATOR — ISOLATED SANDBOX
                </span>
              </div>
              <CyberBadge variant="rose" size="xs">UNTRUSTED HOST</CyberBadge>
            </div>

            {/* Browser Address Bar with Clickable Inspection Targets */}
            <div className="p-2.5 bg-slate-800/90 border-b-2 border-slate-700 flex items-center gap-2">
              {/* Padlock Icon (Clickable target) */}
              <button
                onClick={() => handleInspectZone(LEVEL_3_CLUES[1])}
                className={`
                  p-1.5 border flex items-center gap-1 transition-all
                  ${inspectedClues.has('padlock')
                    ? 'border-rose-500 bg-rose-950/80 text-rose-300'
                    : 'border-amber-500 bg-amber-950/60 text-amber-300 animate-pulse'}
                `}
                title="Click to inspect SSL/TLS Padlock"
              >
                <Unlock className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[10px] font-pixel text-rose-400 hidden sm:inline">NOT SECURE</span>
              </button>

              {/* URL Address Bar (Clickable target) */}
              <button
                onClick={() => handleInspectZone(LEVEL_3_CLUES[0])}
                className={`
                  flex-1 text-left px-3 py-1.5 border font-code text-xs truncate transition-all
                  ${inspectedClues.has('url-bar')
                    ? 'border-rose-500 bg-cyber-950 text-rose-300'
                    : 'border-cyber-cyan bg-cyber-900 text-slate-200 hover:border-white animate-pulse'}
                `}
                title="Click to inspect URL and Domain"
              >
                <span className="text-rose-400 font-bold">http://</span>
                <span className="text-slate-100 font-semibold">campus-login-auth.xyz</span>
                <span className="text-slate-400">/verify-account?token=892348</span>
              </button>
            </div>

            {/* Webpage Content Viewport */}
            <div className="p-5 bg-slate-900/95 space-y-4 min-h-[360px] text-slate-200 font-sans">
              {/* Fake Urgent Banner (Clickable target) */}
              <div
                onClick={() => handleInspectZone(LEVEL_3_CLUES[2])}
                className={`
                  p-3 border-2 cursor-pointer transition-all select-none
                  ${inspectedClues.has('urgent-popup')
                    ? 'border-rose-500 bg-rose-950/40 text-rose-200'
                    : 'border-amber-400 bg-amber-950/50 text-amber-200 hover:scale-[1.01] animate-pulse'}
                `}
              >
                <div className="flex items-center justify-between text-xs font-bold gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>⚠️ MANDATORY ACCOUNT RE-VERIFICATION REQUIRED</span>
                  </div>
                  <span className="font-pixel text-[9px] text-rose-400 bg-cyber-950 px-2 py-0.5 border border-rose-600">
                    EXPIRES IN 14:59
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 font-sans">
                  Failure to authenticate within 15 minutes will terminate your student access permanently.
                </p>
                <span className="text-[10px] text-amber-400 font-code underline block mt-1">
                  🔍 Click this banner to inspect psychological social engineering trigger
                </span>
              </div>

              {/* Fake Campus Portal Branding & Form (Clickable target) */}
              <div
                onClick={() => handleInspectZone(LEVEL_3_CLUES[3])}
                className={`
                  max-w-md mx-auto p-5 border-2 cursor-pointer transition-all space-y-3
                  ${inspectedClues.has('login-form')
                    ? 'border-cyan-500 bg-cyber-950/90'
                    : 'border-slate-700 bg-cyber-950/60 hover:border-slate-500'}
                `}
              >
                <div className="text-center space-y-1 pb-2 border-b border-slate-800">
                  <div className="w-8 h-8 bg-blue-600 mx-auto flex items-center justify-center font-pixel text-xs text-white">
                    CP
                  </div>
                  <h3 className="font-pixel text-xs text-slate-100">
                    CAMPUS SINGLE SIGN-ON
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Enter full credentials to prevent lockout
                  </p>
                </div>

                <div className="space-y-2 text-xs font-code">
                  <div>
                    <label className="text-slate-400 block mb-1">STUDENT ID NUMBER</label>
                    <input
                      type="text"
                      disabled
                      placeholder="e.g. 2026-CS-8924"
                      className="w-full bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-slate-300 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">CAMPUS PASSWORD</label>
                    <input
                      type="password"
                      disabled
                      value="••••••••••••"
                      className="w-full bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-slate-300 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-rose-400 block mb-1">ATM CARD / PIN NUMBER (OVERREACHING!)</label>
                    <input
                      type="text"
                      disabled
                      placeholder="Enter 4-digit PIN"
                      className="w-full bg-slate-900 border border-rose-600/70 px-2.5 py-1.5 text-rose-300 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-1 text-center">
                  <span className="text-[10px] text-cyan-400 font-code underline">
                    🔍 Click form to inspect credential exfiltration destination
                  </span>
                </div>
              </div>

              {/* Fake footer */}
              <div className="text-center text-[10px] text-slate-500 pt-2 font-code">
                © 2026 Campus Network Auth • Privacy • Terms (Broken Links)
              </div>
            </div>
          </div>
        </div>

        {/* Forensic Clue Inspector Pane (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Evidence Tracker Meter */}
          <div className="p-3.5 bg-cyber-900 border-2 border-slate-700 flex items-center justify-between">
            <span className="font-pixel text-[10px] text-slate-300 uppercase">
              EVIDENCE GATHERED:
            </span>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 border ${
                    idx < inspectedClues.size
                      ? 'bg-cyber-cyan border-white shadow-[0_0_8px_#00f5d4]'
                      : 'bg-cyber-950 border-slate-700'
                  }`}
                />
              ))}
              <span className="font-code text-xs text-cyber-cyan font-bold ml-1">
                {inspectedClues.size}/4
              </span>
            </div>
          </div>

          {/* Active Target Diagnostic Card */}
          <VoxelBlock
            title="FORENSIC INSPECTION ANALYSIS"
            icon={Search}
            variant="cyan"
          >
            {activeInspector ? (
              <div className="space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{activeInspector.icon}</span>
                    <h4 className="font-pixel text-xs text-slate-100">
                      {activeInspector.targetName}
                    </h4>
                  </div>
                  <CyberBadge variant="rose" size="xs">SUSPICIOUS</CyberBadge>
                </div>

                <div className="p-3 bg-cyber-950 border border-slate-800 space-y-1.5 font-code">
                  <div className="text-slate-400 text-[11px]">
                    ANALYSIS: <span className="text-rose-400 font-bold">{activeInspector.inspectionDetail.threat || activeInspector.inspectionDetail.status}</span>
                  </div>
                  <div className="text-slate-300 text-[11px] leading-relaxed">
                    {activeInspector.inspectionDetail.notes}
                  </div>
                </div>

                <div className="p-2.5 bg-cyan-950/40 border border-cyan-800/60 text-cyan-200 text-xs">
                  <strong>💡 Detective Takeaway: </strong>
                  {activeInspector.educationalTip}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-6">
                Click any highlighted area on the fake website to reveal technical forensics.
              </p>
            )}
          </VoxelBlock>

          {/* Forensic Question (Unlocked when evidence collected) */}
          <VoxelBlock
            title="VERIFY TECHNICAL THREAT"
            icon={Terminal}
            variant={solved ? "green" : allInspected ? "amber" : "default"}
          >
            <div className="space-y-3 font-sans text-xs">
              <p className="text-slate-200 font-semibold">
                {LEVEL_3_QUIZ.question}
              </p>

              <div className="space-y-2">
                {LEVEL_3_QUIZ.options.map((opt) => {
                  const isSelected = selectedQuizOption?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleQuizAnswer(opt)}
                      className={`
                        w-full text-left p-3 border-2 transition-all font-sans text-xs
                        ${isSelected && opt.isCorrect
                          ? 'border-emerald-400 bg-emerald-950/60 text-emerald-200 shadow-voxel-green'
                          : isSelected && !opt.isCorrect
                          ? 'border-rose-500 bg-rose-950/60 text-rose-200'
                          : 'border-slate-800 bg-cyber-950/80 text-slate-300 hover:border-slate-600'}
                      `}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </VoxelBlock>
        </div>
      </div>

      {/* Feedback Banner */}
      {quizFeedback && (
        <div
          className={`
            p-5 border-4 transition-all duration-300 animate-block-bounce shadow-voxel-lg
            ${quizFeedback.type === 'success' 
              ? 'bg-emerald-950/90 border-emerald-400 shadow-voxel-green text-emerald-100' 
              : 'bg-rose-950/90 border-rose-500 shadow-voxel-rose text-rose-100'}
          `}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {quizFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
                )}
                <h3 className="font-pixel text-xs sm:text-sm tracking-wider uppercase">
                  {quizFeedback.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed max-w-3xl">
                {quizFeedback.message}
              </p>

              {quizFeedback.educationalHint && (
                <div className="p-3 bg-cyber-950/80 border border-rose-700/60 text-xs font-sans text-slate-300">
                  <span className="font-bold text-amber-300">INVESTIGATOR HINT: </span>
                  {quizFeedback.educationalHint}
                </div>
              )}

              {quizFeedback.clue && (
                <div className="p-3 bg-cyber-950/80 border-l-4 border-cyber-cyan text-xs font-code text-cyan-300">
                  <span className="font-pixel text-[10px] text-cyber-cyan block mb-1">
                    EVIDENCE UNLOCKED: {quizFeedback.clue.title}
                  </span>
                  <span>{quizFeedback.clue.summary}</span>
                </div>
              )}
            </div>

            {quizFeedback.type === 'success' && (
              <VoxelButton
                variant="green"
                size="md"
                onClick={onNextLevel}
                icon={ArrowRight}
                className="shrink-0 w-full md:w-auto"
              >
                PROCEED TO LEVEL 4
              </VoxelButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
