import React, { useState } from 'react';
import { Globe, Search, AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, Terminal, ExternalLink, Unlock, ShieldAlert } from 'lucide-react';
import { LEVEL_3_CLUES, LEVEL_3_QUIZ } from '../data/level3Website';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { VoxelButton } from '../components/common/VoxelButton';
import { CyberBadge } from '../components/common/CyberBadge';
import { sound } from '../utils/soundSynthesizer';
import { fireClueDiscoverySparks } from '../components/effects/VictoryConfetti';
import { calculateLevelScore } from '../utils/scoring';

export function Level3SuspiciousWeb({ onComplete, onNextLevel, isCompleted, currentClues }) {
  // A) Inspection State — inspect all 5 website zones freely
  const [inspectedClues, setInspectedClues] = useState(new Set([LEVEL_3_CLUES[0].id]));
  const [activeInspector, setActiveInspector] = useState(LEVEL_3_CLUES[0]);

  // B) Final Answer & Submission State — committed on SUBMIT
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [solved, setSolved] = useState(isCompleted);

  // Sync solved state if isCompleted changes
  React.useEffect(() => {
    setSolved(isCompleted);
    if (!isCompleted) {
      setQuizFeedback(null);
      setIsSubmitted(false);
      setSelectedQuizOption(null);
      setInspectedClues(new Set([LEVEL_3_CLUES[0].id]));
      setActiveInspector(LEVEL_3_CLUES[0]);
    }
  }, [isCompleted]);

  // Inspection handler: Clicking a zone on the browser mockup displays its technical analysis
  const handleInspectZone = (clue) => {
    setActiveInspector(clue);
    setInspectedClues((prev) => {
      const next = new Set(prev);
      next.add(clue.id);
      return next;
    });
  };

  // Option selection before submit
  const handleSelectOption = (opt) => {
    if (isSubmitted) return;
    setSelectedQuizOption(opt);
  };

  // Final Answer Submission: ONE attempt verified on SUBMIT
  const handleSubmitAnswer = () => {
    if (isSubmitted || !selectedQuizOption) return;

    // Lock verification permanently
    setIsSubmitted(true);

    if (selectedQuizOption.isCorrect) {
      sound.playVoxelBlast();
      sound.playClueFound();
      fireClueDiscoverySparks();
      setSolved(true);

      const earnedScore = calculateLevelScore(300, 1);
      const earnedXp = 300;

      setQuizFeedback({
        type: 'success',
        title: 'WEBSITE INFRASTRUCTURE UNMASKED // CLUE #3 UNLOCKED',
        message: 'Accurate technical analysis! The absence of cryptographic SSL/TLS encryption combined with an unverified rogue .xyz domain proves this portal is a counterfeit harvesting honeypot.',
        clue: LEVEL_3_QUIZ.clueDiscovered,
        earnedScore,
        earnedXp
      });

      onComplete(3, earnedScore, earnedXp, LEVEL_3_QUIZ.clueDiscovered, 1);
    } else {
      sound.playIncorrect();
      setQuizFeedback({
        type: 'error',
        title: 'INCORRECT TECHNICAL ASSESSMENT',
        message: `${selectedQuizOption.text} is not the primary forensic indicator of web fraud. Re-examine the protocol and domain authentication telemetry.`
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Objective Header */}
      <div className="p-4 bg-cyber-900 border-t-2 border-l-2 border-slate-600 border-r-[4px] border-b-[4px] border-slate-950 shadow-voxel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CyberBadge variant="cyan" size="sm">LEVEL 3 // WEB DOMAIN FORENSICS</CyberBadge>
            {solved && <CyberBadge variant="green" size="sm">COMPLETED</CyberBadge>}
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span>🌐 SUSPICIOUS WEBSITE AUDIT</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Inspect the 5 interactive elements on the simulated browser clone (URL, Padlock, Banner, Form, Footer). Then commit your forensic verdict.
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

      {/* Main Grid: Interactive Browser Mockup (Left) & Inspector Bench (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Fake Web Browser Container (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Browser Window Chrome */}
          <div className="border-t-2 border-l-2 border-slate-600 border-r-[4px] border-b-[4px] border-slate-950 bg-cyber-950 shadow-voxel overflow-hidden">
            {/* Window Titlebar */}
            <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-rose-500 border border-black/40" />
                <div className="w-2.5 h-2.5 bg-amber-500 border border-black/40" />
                <div className="w-2.5 h-2.5 bg-emerald-500 border border-black/40" />
                <span className="font-pixel text-[10px] text-slate-300 ml-2">
                  CAMPUS AUTHENTICATION GATEWAY — [SANDBOX AUDIT]
                </span>
              </div>
              <span className="font-code text-[10px] text-slate-400">HTTP/1.1</span>
            </div>

            {/* Browser Address & Control Bar */}
            <div className="p-2.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
              {/* SSL/TLS Padlock (Clickable target) */}
              <button
                onClick={() => handleInspectZone(LEVEL_3_CLUES[1])}
                className={`
                  p-1.5 border-t border-l border-r-2 border-b-2 flex items-center gap-1 transition-all
                  ${activeInspector?.id === 'padlock'
                    ? 'border-cyber-cyan bg-cyan-950 text-cyber-cyan shadow-voxel-cyan'
                    : 'border-slate-700 bg-cyber-950 text-slate-400 hover:border-slate-500'}
                `}
                title="Inspect SSL/TLS Padlock"
              >
                <Unlock className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] font-pixel text-slate-400 hidden sm:inline">NOT SECURE</span>
              </button>

              {/* URL Address Bar (Clickable target) */}
              <button
                onClick={() => handleInspectZone(LEVEL_3_CLUES[0])}
                className={`
                  flex-1 text-left px-3 py-1.5 border-t border-l border-r-2 border-b-2 font-code text-xs truncate transition-all
                  ${activeInspector?.id === 'url-bar'
                    ? 'border-cyber-cyan bg-cyan-950 text-cyan-200 shadow-voxel-cyan'
                    : 'border-slate-700 bg-cyber-900 text-slate-200 hover:border-slate-500'}
                `}
                title="Inspect URL and Domain"
              >
                <span className="text-slate-300">http://</span>
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
                  p-3 border-t-2 border-l-2 border-r-[4px] border-b-[4px] cursor-pointer transition-all select-none
                  ${activeInspector?.id === 'urgent-popup'
                    ? 'border-cyber-cyan bg-cyan-950/80 text-slate-200 shadow-voxel-cyan'
                    : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-slate-500'}
                `}
              >
                <div className="flex items-center justify-between text-xs font-bold gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>MANDATORY ACCOUNT RE-VERIFICATION REQUIRED</span>
                  </div>
                  <span className="font-pixel text-[9px] text-slate-300 bg-cyber-950 px-2 py-0.5 border border-slate-700">
                    EXPIRES IN 14:59
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 font-sans">
                  Failure to authenticate within 15 minutes will terminate your student access permanently.
                </p>
              </div>

              {/* Fake Campus Portal Branding & Form (Clickable target) */}
              <div
                onClick={() => handleInspectZone(LEVEL_3_CLUES[3])}
                className={`
                  max-w-md mx-auto p-5 border-t-2 border-l-2 border-r-[4px] border-b-[4px] cursor-pointer transition-all space-y-3
                  ${activeInspector?.id === 'login-form'
                    ? 'border-cyber-cyan bg-cyan-950/80 shadow-voxel-cyan'
                    : 'border-slate-700 bg-cyber-950/70 hover:border-slate-500'}
                `}
              >
                <div className="text-center space-y-1 pb-2 border-b border-slate-800">
                  <div className="w-8 h-8 bg-blue-600 mx-auto flex items-center justify-center font-pixel text-xs text-white shadow-voxel">
                    CP
                  </div>
                  <h3 className="font-pixel text-xs text-slate-100">
                    CAMPUS SINGLE SIGN-ON
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Enter credentials to authenticate
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
                    <label className="text-slate-400 block mb-1">SECURITY / PIN NUMBER</label>
                    <input
                      type="text"
                      disabled
                      placeholder="Enter 4-digit PIN"
                      className="w-full bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-slate-300 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Fake footer (Clickable target) */}
              <div
                onClick={() => handleInspectZone(LEVEL_3_CLUES[4])}
                className={`
                  p-2 text-center text-[10px] border cursor-pointer transition-all font-code
                  ${activeInspector?.id === 'footer-cert'
                    ? 'border-cyber-cyan bg-cyan-950/80 text-cyan-200 shadow-voxel-cyan'
                    : 'border-slate-800/80 text-slate-500 hover:border-slate-600 hover:text-slate-300'}
                `}
              >
                © 2026 Campus Network Auth • Privacy Terms • Security Architecture (Click to Audit)
              </div>
            </div>
          </div>
        </div>

        {/* Forensic Clue Inspector Pane (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Elements Inspected Meter */}
          <div className="p-3.5 bg-cyber-900 border-t border-l border-slate-700 border-r-2 border-b-2 border-slate-950 flex items-center justify-between shadow-voxel">
            <span className="font-pixel text-[10px] text-slate-300 uppercase">
              ELEMENTS AUDITED:
            </span>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((idx) => (
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
                {inspectedClues.size}/5
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
                  <CyberBadge variant="slate" size="xs">INSPECTING</CyberBadge>
                </div>

                <div className="p-3 bg-cyber-950 border border-slate-800 space-y-1.5 font-code shadow-voxel">
                  <div className="text-slate-400 text-[11px]">
                    STATUS: <span className="text-cyan-300 font-semibold">{activeInspector.inspectionDetail.threat || activeInspector.inspectionDetail.status}</span>
                  </div>
                  <div className="text-slate-300 text-[11px] leading-relaxed">
                    {activeInspector.inspectionDetail.notes}
                  </div>
                </div>

                <div className="p-2.5 bg-cyber-950/80 border border-slate-700 text-slate-300 text-xs shadow-inner">
                  {activeInspector.educationalTip}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-6 font-code">
                Click any zone on the browser mockup to examine technical parameters.
              </p>
            )}
          </VoxelBlock>

          {/* Forensic Verdict Question */}
          <VoxelBlock
            title="VERIFY TECHNICAL THREAT"
            icon={Terminal}
            variant={solved ? "green" : "default"}
          >
            <div className="space-y-3 font-sans text-xs">
              <p className="text-slate-200 font-semibold">
                {LEVEL_3_QUIZ.question}
              </p>

              <div className="space-y-2">
                {LEVEL_3_QUIZ.options.map((opt) => {
                  const isSelected = selectedQuizOption?.id === opt.id;
                  const postSubmitCorrect = isSubmitted && isSelected && opt.isCorrect;
                  const postSubmitWrong = isSubmitted && isSelected && !opt.isCorrect;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isSubmitted}
                      className={`
                        w-full text-left p-3 border-t-2 border-l-2 border-r-[4px] border-b-[4px] transition-all font-sans text-xs select-none
                        ${isSubmitted
                          ? postSubmitCorrect
                            ? 'border-emerald-400 bg-emerald-950/70 text-emerald-200 shadow-voxel-green cursor-default'
                            : postSubmitWrong
                            ? 'border-rose-500 bg-rose-950/70 text-rose-200 cursor-default'
                            : 'border-slate-900 bg-cyber-950/80 text-slate-500 opacity-60 cursor-default'
                          : isSelected
                          ? 'border-cyber-cyan bg-cyan-950/60 text-slate-100 shadow-voxel-cyan cursor-pointer'
                          : 'border-slate-800 bg-cyber-950/80 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50 cursor-pointer shadow-voxel'}
                      `}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 font-code">
                  {isSubmitted ? 'Submission locked.' : selectedQuizOption ? 'Option chosen — click SUBMIT.' : 'Select an option above.'}
                </span>
                <VoxelButton
                  variant={isSubmitted ? "dark" : "cyan"}
                  size="sm"
                  onClick={handleSubmitAnswer}
                  icon={ShieldAlert}
                  disabled={!selectedQuizOption || isSubmitted}
                >
                  {isSubmitted ? 'SUBMITTED' : 'SUBMIT VERDICT'}
                </VoxelButton>
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

              {quizFeedback.clue && (
                <div className="p-3 bg-cyber-950/90 border-l-4 border-cyber-cyan text-xs font-code text-cyan-300 shadow-voxel">
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
