import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert, ExternalLink, HelpCircle, Eye } from 'lucide-react';
import { LEVEL_1_EMAILS } from '../data/level1Emails';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { VoxelButton } from '../components/common/VoxelButton';
import { CyberBadge } from '../components/common/CyberBadge';
import { sound } from '../utils/soundSynthesizer';
import { fireClueDiscoverySparks } from '../components/effects/VictoryConfetti';
import { calculateLevelScore } from '../utils/scoring';

export function Level1Phishing({ onComplete, onNextLevel, isCompleted, currentClues }) {
  const [selectedEmail, setSelectedEmail] = useState(LEVEL_1_EMAILS[0]);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', title: '', message: '', details: [] }
  const [solved, setSolved] = useState(isCompleted);

  const handleSelectEmail = (email) => {
    sound.playClick();
    setSelectedEmail(email);
    // Don't auto-clear feedback if already solved
    if (!solved) {
      setFeedback(null);
    }
  };

  const handleExamineAndSubmit = (emailToTest) => {
    const email = emailToTest || selectedEmail;
    setAttempts((prev) => prev + 1);

    if (email.isMalicious) {
      // Correct!
      sound.playCorrect();
      sound.playClueFound();
      fireClueDiscoverySparks();
      setSolved(true);

      const earnedScore = calculateLevelScore(250, attempts + 1);
      const earnedXp = 250;

      setFeedback({
        type: 'success',
        title: 'CLUE FOUND // PHISHING ATTEMPT IDENTIFIED',
        message: 'You successfully spotted the malicious email! Notice the forged sender domain (.ru.cc), manufactured artificial urgency (2-hour timer), unencrypted HTTP link, and aggressive credential harvesting.',
        clue: email.clueDiscovered,
        earnedScore,
        earnedXp
      });

      onComplete(1, earnedScore, earnedXp, email.clueDiscovered, attempts + 1);
    } else {
      // Incorrect!
      sound.playIncorrect();
      setFeedback({
        type: 'error',
        title: 'INCORRECT // LEGITIMATE EMAIL FLAGGED',
        message: 'Examine the sender, wording, and URL carefully. This email contains no deceptive lures or credential requests. Look for artificial panic, mismatching domain names, or unencrypted external links.',
        educationalHint: email.educationalFeedback
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Objective Header */}
      <div className="p-4 bg-cyber-900 border-2 border-slate-700 shadow-voxel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CyberBadge variant="cyan" size="sm">LEVEL 1 // INCIDENT DISPATCH</CyberBadge>
            {solved && <CyberBadge variant="green" size="sm">COMPLETED</CyberBadge>}
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span>📧 SPOT THE PHISH</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            A malicious attack targeted student accounts. Inspect the 5 inbox messages below and identify the phishing lure.
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
          <div className="px-3 py-2 bg-cyber-900/90 border border-slate-700 flex items-center justify-between text-xs font-code text-slate-300">
            <span className="flex items-center gap-1.5 font-bold">
              <Mail className="w-3.5 h-3.5 text-cyber-cyan" />
              INBOX (5 MESSAGES)
            </span>
            <span className="text-[11px] text-slate-400">Click to inspect</span>
          </div>

          <div className="space-y-2">
            {LEVEL_1_EMAILS.map((email) => {
              const isSelected = selectedEmail.id === email.id;
              return (
                <div
                  key={email.id}
                  onClick={() => handleSelectEmail(email)}
                  className={`
                    p-3.5 border-2 cursor-pointer transition-all select-none
                    ${isSelected 
                      ? 'border-cyber-cyan bg-cyan-950/40 shadow-voxel-cyan -translate-y-0.5' 
                      : 'border-slate-800 bg-cyber-900/90 hover:border-slate-600 hover:bg-slate-800/50'}
                  `}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 truncate">
                      <div className={`w-3 h-3 rounded-none ${email.avatarColor} shrink-0`} />
                      <span className="font-pixel text-[11px] text-slate-200 truncate">
                        {email.senderName}
                      </span>
                    </div>
                    <span className="font-code text-[10px] text-slate-400 shrink-0">
                      {email.time}
                    </span>
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

        {/* Email Preview & Inspection Pane (Right Column) */}
        <div className="lg:col-span-7">
          <VoxelBlock
            title="MESSAGE FORENSIC INSPECTOR"
            icon={Eye}
            variant={selectedEmail.isMalicious && solved ? "green" : "cyan"}
            className="h-full flex flex-col justify-between"
            bodyClassName="p-5 flex-1 flex flex-col justify-between space-y-4"
          >
            {/* Email Header Metadata */}
            <div className="space-y-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-pixel text-xs sm:text-sm text-slate-100 leading-snug">
                  {selectedEmail.subject}
                </h3>
                <span className="font-code text-xs text-slate-400 bg-cyber-950 px-2 py-0.5 border border-slate-800">
                  {selectedEmail.time} • {selectedEmail.date}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-code bg-cyber-950/80 p-3 border border-slate-800">
                <div>
                  <span className="text-slate-500">FROM: </span>
                  <span className="text-slate-200 font-semibold">{selectedEmail.senderName}</span>
                </div>
                <div>
                  <span className="text-slate-500">ADDRESS: </span>
                  <span className={`font-mono ${selectedEmail.senderEmail.includes('.ru') ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                    {selectedEmail.senderEmail}
                  </span>
                </div>
              </div>
            </div>

            {/* Email Body Content */}
            <div className="flex-1 bg-cyber-950/60 p-4 border border-slate-800/80 rounded-none overflow-y-auto max-h-72">
              <pre className="font-sans text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                {selectedEmail.fullBody}
              </pre>
            </div>

            {/* Suspect Flagging Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <div className="text-xs text-slate-400 font-code">
                {attempts > 0 && <span>Attempts logged: {attempts}</span>}
              </div>

              <VoxelButton
                variant={selectedEmail.isMalicious ? "rose" : "cyan"}
                size="md"
                onClick={() => handleExamineAndSubmit(selectedEmail)}
                icon={AlertTriangle}
                className="w-full sm:w-auto"
              >
                FLAG AS PHISHING ATTEMPT
              </VoxelButton>
            </div>
          </VoxelBlock>
        </div>
      </div>

      {/* Animated Clue / Feedback Notification Modal Banner */}
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

              {feedback.educationalHint && (
                <div className="p-3 bg-cyber-950/80 border border-rose-700/60 text-xs font-sans text-slate-300">
                  <span className="font-bold text-amber-300">INVESTIGATOR HINT: </span>
                  {feedback.educationalHint}
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
                PROCEED TO LEVEL 2
              </VoxelButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
