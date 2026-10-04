import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle2, ArrowRight, Eye, ShieldAlert, Check } from 'lucide-react';
import { LEVEL_1_EMAILS } from '../data/level1Emails';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { VoxelButton } from '../components/common/VoxelButton';
import { CyberBadge } from '../components/common/CyberBadge';
import { sound } from '../utils/soundSynthesizer';
import { fireClueDiscoverySparks } from '../components/effects/VictoryConfetti';
import { calculateLevelScore } from '../utils/scoring';

export function Level1Phishing({ onComplete, onNextLevel, isCompleted, currentClues }) {
  // A) Inspection State — inspect multiple emails freely
  const [inspectedEmailId, setInspectedEmailId] = useState(LEVEL_1_EMAILS[0].id);
  const [inspectedIds, setInspectedIds] = useState(new Set([LEVEL_1_EMAILS[0].id]));

  // B) Final Answer & Submission State — committed on SUBMIT
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmailId, setSubmittedEmailId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [solved, setSolved] = useState(isCompleted);

  // Sync solved state if isCompleted changes
  React.useEffect(() => {
    setSolved(isCompleted);
    if (!isCompleted) {
      setFeedback(null);
      setIsSubmitted(false);
      setSubmittedEmailId(null);
      setInspectedEmailId(LEVEL_1_EMAILS[0].id);
      setInspectedIds(new Set([LEVEL_1_EMAILS[0].id]));
    }
  }, [isCompleted]);

  // Inspection handler: Clicking an email opens it in the inspector
  const handleInspectEmail = (email) => {
    setInspectedEmailId(email.id);
    setInspectedIds((prev) => {
      const next = new Set(prev);
      next.add(email.id);
      return next;
    });
  };

  const activeEmail = LEVEL_1_EMAILS.find((e) => e.id === inspectedEmailId) || LEVEL_1_EMAILS[0];

  // Final Answer Submission: ONE attempt verified on SUBMIT
  const handleSubmit = (targetEmail) => {
    if (isSubmitted || !targetEmail) return;

    // Lock question permanently
    setIsSubmitted(true);
    setSubmittedEmailId(targetEmail.id);

    if (targetEmail.isMalicious) {
      sound.playVoxelBlast();
      sound.playClueFound();
      fireClueDiscoverySparks();
      setSolved(true);

      const earnedScore = calculateLevelScore(250, 1);
      const earnedXp = 250;

      setFeedback({
        type: 'success',
        title: 'PHISHING ATTEMPT IDENTIFIED // CLUE #1 UNLOCKED',
        message: 'Masterful deduction! You successfully identified the phishing lure. Notice the forged sender domain (.ru.cc), manufactured artificial urgency (2-hour timer), unencrypted HTTP link, and aggressive credential harvesting.',
        clue: targetEmail.clueDiscovered,
        earnedScore,
        earnedXp
      });

      onComplete(1, earnedScore, earnedXp, targetEmail.clueDiscovered, 1);
    } else {
      sound.playIncorrect();
      setFeedback({
        type: 'error',
        title: 'INCORRECT // LEGITIMATE EMAIL FLAGGED',
        message: 'That email is authentic. The actual malicious email disguised itself with artificial panic, an external domain suffix, and an unencrypted link requesting credentials.'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Objective Header */}
      <div className="p-4 bg-cyber-900 border-t-2 border-l-2 border-slate-600 border-r-[4px] border-b-[4px] border-slate-950 shadow-voxel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CyberBadge variant="cyan" size="sm">LEVEL 1 // INCIDENT DISPATCH</CyberBadge>
            {solved && <CyberBadge variant="green" size="sm">COMPLETED</CyberBadge>}
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span>📧 SPOT THE PHISH</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            A targeted attack hit campus accounts. Inspect all 5 inbox messages below, review technical headers, and commit your one final accusation.
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
            NEXT: PASSWORD DETECTIVE
          </VoxelButton>
        )}
      </div>

      {/* Interactive Email Client UI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Email Inbox List (Left Column) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="px-3.5 py-2.5 bg-cyber-900/95 border-t border-l border-slate-700 border-r-2 border-b-2 border-slate-950 flex items-center justify-between text-xs font-code text-slate-300 shadow-voxel">
            <span className="flex items-center gap-1.5 font-bold">
              <Mail className="w-3.5 h-3.5 text-cyber-cyan" />
              INBOX ({LEVEL_1_EMAILS.length} MESSAGES)
            </span>
            <span className="text-[11px] text-slate-400">
              {inspectedIds.size}/5 Inspected
            </span>
          </div>

          <div className="space-y-2">
            {LEVEL_1_EMAILS.map((email) => {
              const isCurrentlyInspected = activeEmail.id === email.id;
              const hasBeenInspected = inspectedIds.has(email.id);
              const wasSubmittedThis = isSubmitted && submittedEmailId === email.id;

              const postSubmitCorrect = wasSubmittedThis && email.isMalicious;
              const postSubmitWrong = wasSubmittedThis && !email.isMalicious;

              return (
                <div
                  key={email.id}
                  onClick={() => handleInspectEmail(email)}
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
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 truncate">
                      <div className={`w-3 h-3 ${email.avatarColor} shrink-0 border border-black/40`} />
                      <span className="font-pixel text-[11px] text-slate-200 truncate">
                        {email.senderName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {hasBeenInspected && (
                        <CyberBadge variant="slate" size="xs">
                          INSPECTED
                        </CyberBadge>
                      )}
                      <span className="font-code text-[10px] text-slate-400">
                        {email.time}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-100 line-clamp-1 mb-1 font-sans">
                    {email.subject}
                  </h4>

                  <p className="text-[11px] text-slate-400 font-sans line-clamp-2">
                    {email.preview}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Email Preview & Forensic Inspector Pane (Right Column) */}
        <div className="lg:col-span-7">
          <VoxelBlock
            title="FORENSIC MESSAGE INSPECTOR"
            icon={Eye}
            variant="cyan"
            className="h-full flex flex-col justify-between"
            bodyClassName="p-5 flex-1 flex flex-col justify-between space-y-4"
          >
            {/* Email Header Metadata */}
            <div className="space-y-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-pixel text-xs sm:text-sm text-slate-100 leading-snug">
                  {activeEmail.subject}
                </h3>
                <span className="font-code text-xs text-slate-400 bg-cyber-950 px-2.5 py-1 border border-slate-800 shadow-voxel">
                  {activeEmail.time} • {activeEmail.date}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-code bg-cyber-950/90 p-3 border border-slate-800 shadow-voxel">
                <div>
                  <span className="text-slate-500">FROM: </span>
                  <span className="text-slate-200 font-semibold">{activeEmail.senderName}</span>
                </div>
                <div>
                  <span className="text-slate-500">ADDRESS: </span>
                  <span className="text-slate-300 font-mono">
                    {activeEmail.senderEmail}
                  </span>
                </div>
              </div>
            </div>

            {/* Email Body Content */}
            <div className="flex-1 bg-cyber-950/80 p-4 border border-slate-800 rounded-none overflow-y-auto max-h-72 shadow-inner">
              <pre className="font-sans text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                {activeEmail.fullBody}
              </pre>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <div className="text-xs text-slate-400 font-code">
                {isSubmitted
                  ? 'Submission locked.'
                  : `Accuse "${activeEmail.senderName}" as the phishing lure?`}
              </div>

              <VoxelButton
                variant={isSubmitted ? "dark" : "rose"}
                size="md"
                onClick={() => handleSubmit(activeEmail)}
                icon={AlertTriangle}
                className="w-full sm:w-auto"
                disabled={isSubmitted}
              >
                {isSubmitted
                  ? 'SUBMISSION LOCKED'
                  : 'FLAG AS PHISHING ATTEMPT'}
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
                PROCEED TO LEVEL 2
              </VoxelButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
