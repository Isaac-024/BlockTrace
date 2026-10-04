import React, { useState } from 'react';
import { GitFork, ArrowRight, CheckCircle2, AlertTriangle, Move, ChevronLeft, ChevronRight, ShieldCheck, Eye, Info } from 'lucide-react';
import { LEVEL_4_CARDS, LEVEL_4_CLUE } from '../data/level4Timeline';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { VoxelButton } from '../components/common/VoxelButton';
import { CyberBadge } from '../components/common/CyberBadge';
import { sound } from '../utils/soundSynthesizer';
import { fireClueDiscoverySparks } from '../components/effects/VictoryConfetti';
import { calculateLevelScore } from '../utils/scoring';

export function Level4TraceAttack({ onComplete, onNextLevel, isCompleted, currentClues }) {
  // Start with shuffled order initially so the player has to sequence them
  const [cards, setCards] = useState(() => {
    return [LEVEL_4_CARDS[2], LEVEL_4_CARDS[0], LEVEL_4_CARDS[3], LEVEL_4_CARDS[1]];
  });

  // A) Inspection State — inspect card technical forensics freely
  const [inspectedCardId, setInspectedCardId] = useState(LEVEL_4_CARDS[0].id);
  const [inspectedIds, setInspectedIds] = useState(new Set([LEVEL_4_CARDS[0].id]));

  // B) Final Answer & Submission State
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [solved, setSolved] = useState(isCompleted);

  // Sync solved state if isCompleted changes
  React.useEffect(() => {
    setSolved(isCompleted);
    if (!isCompleted) {
      setFeedback(null);
      setIsSubmitted(false);
      setCards([LEVEL_4_CARDS[2], LEVEL_4_CARDS[0], LEVEL_4_CARDS[3], LEVEL_4_CARDS[1]]);
      setInspectedCardId(LEVEL_4_CARDS[0].id);
      setInspectedIds(new Set([LEVEL_4_CARDS[0].id]));
    }
  }, [isCompleted]);

  // Inspection handler: Clicking a card inspects its detailed forensic telemetry
  const handleInspectCard = (card) => {
    setInspectedCardId(card.id);
    setInspectedIds((prev) => {
      const next = new Set(prev);
      next.add(card.id);
      return next;
    });
  };

  const activeCard = LEVEL_4_CARDS.find((c) => c.id === inspectedCardId) || cards[0];

  // Drag & Drop Handlers — disabled after submission
  const handleDragStart = (e, index) => {
    if (isSubmitted) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    if (isSubmitted) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    if (isSubmitted) return;
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newCards = [...cards];
    const [moved] = newCards.splice(draggedIndex, 1);
    newCards.splice(dropIndex, 0, moved);
    setCards(newCards);
    setDraggedIndex(null);
  };

  // Button move fallback (Mobile friendly) — disabled after submission
  const handleMoveCard = (currentIndex, direction) => {
    if (isSubmitted) return;
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= cards.length) return;

    const newCards = [...cards];
    const temp = newCards[currentIndex];
    newCards[currentIndex] = newCards[targetIndex];
    newCards[targetIndex] = temp;
    setCards(newCards);
  };

  const handleVerifySequence = () => {
    if (isSubmitted) return;

    // Lock timeline verification permanently
    setIsSubmitted(true);

    // Verify order: step 1, 2, 3, 4
    const isCorrect = cards.every((card, idx) => card.stepNumberCorrect === idx + 1);

    if (isCorrect) {
      sound.playVoxelBlast();
      sound.playClueFound();
      fireClueDiscoverySparks();
      setSolved(true);

      const earnedScore = calculateLevelScore(300, 1);
      const earnedXp = 300;

      setFeedback({
        type: 'success',
        title: 'ATTACK KILL CHAIN RECONSTRUCTED // CLUE #4 UNLOCKED',
        message: 'Masterful timeline deduction! The attack sequence follows the cyber kill chain: Phishing Email (Initial Delivery) ➔ Link Clicked (User Execution) ➔ Credentials Stolen (Harvesting) ➔ Account Access (Unauthorized Intrusion at 14:22 UTC).',
        clue: LEVEL_4_CLUE,
        earnedScore,
        earnedXp
      });

      onComplete(4, earnedScore, earnedXp, LEVEL_4_CLUE, 1);
    } else {
      sound.playIncorrect();
      setFeedback({
        type: 'error',
        title: 'INCORRECT ATTACK SEQUENCE',
        message: 'The chronological chain is out of order. Consider what payload was delivered first, what action the victim took, what was exfiltrated, and what the final intrusion event was.'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Objective Header */}
      <div className="p-4 bg-cyber-900 border-t-2 border-l-2 border-slate-600 border-r-[4px] border-b-[4px] border-slate-950 shadow-voxel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CyberBadge variant="cyan" size="sm">LEVEL 4 // FORENSIC TIMELINE</CyberBadge>
            {solved && <CyberBadge variant="green" size="sm">COMPLETED</CyberBadge>}
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span>🕵️ TRACE THE ATTACK</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Reconstruct the cyber attack progression. Click any card to inspect its telemetry, arrange them into the correct chronological order, then submit.
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
            NEXT: CATCH THE HACKER
          </VoxelButton>
        )}
      </div>

      {/* Interactive Timeline Slots */}
      <div className="space-y-4">
        {/* Timeline Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-cyber-900 border-t border-l border-slate-700 border-r-2 border-b-2 border-slate-950 font-code text-xs shadow-voxel">
          <div className="flex items-center gap-2 text-slate-300">
            <GitFork className="w-4 h-4 text-cyber-cyan" />
            <span className="font-bold">CYBER KILL CHAIN RECONSTRUCTION ({inspectedIds.size}/4 Cards Inspected)</span>
          </div>

          <div className="flex items-center gap-2">
            {isSubmitted ? (
              <span className="text-xs font-code text-slate-500">Timeline locked.</span>
            ) : (
              <VoxelButton
                variant="cyan"
                size="sm"
                onClick={handleVerifySequence}
                icon={ShieldCheck}
              >
                VERIFY TIMELINE
              </VoxelButton>
            )}
          </div>
        </div>

        {/* 4 Sequential Slots Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {cards.map((card, index) => {
            const isCurrentlyInspected = activeCard.id === card.id;
            const isCorrectPosition = isSubmitted && card.stepNumberCorrect === index + 1;
            const isWrongPosition = isSubmitted && card.stepNumberCorrect !== index + 1;

            return (
              <div
                key={card.id}
                draggable={!isSubmitted}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => handleInspectCard(card)}
                className={`
                  relative p-4 border-t-2 border-l-2 border-r-[4px] border-b-[4px] transition-all duration-150 select-none flex flex-col justify-between cursor-pointer
                  ${isSubmitted
                    ? isCorrectPosition
                      ? 'border-emerald-400 bg-emerald-950/50 shadow-voxel-green cursor-default'
                      : isWrongPosition
                      ? 'border-rose-600 bg-rose-950/30 shadow-voxel-rose cursor-default'
                      : 'border-slate-800 bg-cyber-900/90 shadow-voxel cursor-default'
                    : isCurrentlyInspected
                    ? 'border-cyber-cyan bg-cyan-950/40 shadow-voxel-cyan -translate-y-0.5'
                    : 'border-slate-800 bg-cyber-900/90 hover:border-slate-600 hover:bg-slate-800/60 shadow-voxel'}
                  ${draggedIndex === index ? 'opacity-40 scale-95 border-dashed border-cyber-cyan' : ''}
                `}
              >
                {/* Stage Header Tag */}
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-cyber-950 border border-slate-700 flex items-center justify-center font-pixel text-xs text-cyber-cyan shadow-voxel">
                      {index + 1}
                    </span>
                    <span className="font-code text-[11px] text-slate-400">
                      STEP {index + 1}
                    </span>
                  </div>
                  {!isSubmitted && <Move className="w-3.5 h-3.5 text-slate-500" />}
                  {isSubmitted && isCorrectPosition && <span className="text-emerald-400 text-xs font-bold font-pixel">✓</span>}
                  {isSubmitted && isWrongPosition && <span className="text-rose-400 text-xs font-bold font-pixel">✗</span>}
                </div>

                {/* Card Main Body */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{card.icon}</span>
                    <h3 className="font-pixel text-xs sm:text-sm text-slate-100 uppercase">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {card.description}
                  </p>

                  <div className="p-2 bg-cyber-950/90 border border-slate-800 text-[11px] font-code text-slate-400 shadow-inner">
                    {card.technicalDetail}
                  </div>
                </div>

                {/* Arrow Controls for accessibility & touch — disabled after submission */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <button
                    disabled={index === 0 || isSubmitted}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveCard(index, -1);
                    }}
                    className="p-1 border-t border-l border-slate-700 border-r-2 border-b-2 border-slate-950 bg-cyber-950 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-voxel"
                    title="Move Left / Earlier"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="font-pixel text-[9px] text-slate-500">
                    {isSubmitted ? 'LOCKED' : 'DRAG OR SHIFT'}
                  </span>

                  <button
                    disabled={index === cards.length - 1 || isSubmitted}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveCard(index, 1);
                    }}
                    className="p-1 border-t border-l border-slate-700 border-r-2 border-b-2 border-slate-950 bg-cyber-950 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-voxel"
                    title="Move Right / Later"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Forensic Inspection Readout for Currently Inspected Card */}
      <VoxelBlock
        title={`KILL CHAIN TELEMETRY // ${activeCard.title}`}
        icon={Eye}
        variant="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeCard.icon}</span>
              <span className="font-pixel text-xs text-cyber-cyan uppercase">{activeCard.title}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {activeCard.description}
            </p>
          </div>
          <div className="p-3 bg-cyber-950/90 border border-slate-800 font-code text-[11px] space-y-1 text-slate-300 shadow-inner">
            <span className="text-slate-500 block font-pixel text-[9px]">TECHNICAL FORENSIC LOG:</span>
            <p>{activeCard.technicalDetail}</p>
          </div>
        </div>
      </VoxelBlock>

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
                PROCEED TO LEVEL 5
              </VoxelButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
