import React, { useState } from 'react';
import { GitFork, ArrowRight, CheckCircle2, AlertTriangle, Move, ChevronLeft, ChevronRight, RotateCcw, ShieldCheck } from 'lucide-react';
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
    // Shuffled sequence
    return [LEVEL_4_CARDS[2], LEVEL_4_CARDS[0], LEVEL_4_CARDS[3], LEVEL_4_CARDS[1]];
  });

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [solved, setSolved] = useState(isCompleted);
  const [attempts, setAttempts] = useState(0);

  // Sync solved state if isCompleted changes
  React.useEffect(() => {
    setSolved(isCompleted);
    if (!isCompleted) {
      setFeedback(null);
      setAttempts(0);
      setCards([LEVEL_4_CARDS[2], LEVEL_4_CARDS[0], LEVEL_4_CARDS[3], LEVEL_4_CARDS[1]]);
    }
  }, [isCompleted]);

  // Drag & Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newCards = [...cards];
    const [moved] = newCards.splice(draggedIndex, 1);
    newCards.splice(dropIndex, 0, moved);
    setCards(newCards);
    setDraggedIndex(null);
    setFeedback(null);
  };

  // Button move fallback (Mobile friendly)
  const handleMoveCard = (currentIndex, direction) => {
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= cards.length) return;

    const newCards = [...cards];
    const temp = newCards[currentIndex];
    newCards[currentIndex] = newCards[targetIndex];
    newCards[targetIndex] = temp;
    setCards(newCards);
    setFeedback(null);
  };

  const handleResetTimeline = () => {
    setCards([LEVEL_4_CARDS[2], LEVEL_4_CARDS[0], LEVEL_4_CARDS[3], LEVEL_4_CARDS[1]]);
    setFeedback(null);
  };

  const handleVerifySequence = () => {
    setAttempts((prev) => prev + 1);

    // Verify order: step 1, 2, 3, 4
    const isCorrect = cards.every((card, idx) => card.stepNumberCorrect === idx + 1);

    if (isCorrect) {
      // Meaningful event: Correct kill chain timeline & Clue Found
      sound.playClueFound();
      fireClueDiscoverySparks();
      setSolved(true);

      const earnedScore = calculateLevelScore(300, attempts + 1);
      const earnedXp = 300;

      setFeedback({
        type: 'success',
        title: 'ATTACK KILL CHAIN RECONSTRUCTED // CLUE 4 UNLOCKED',
        message: 'Masterful timeline deduction! The attack sequence follows the classic cyber kill chain: Phishing Email (Initial Delivery) ➔ Link Clicked (User Execution) ➔ Credentials Stolen (Harvesting) ➔ Account Access (Unauthorized Intrusion at 14:22 UTC).',
        clue: LEVEL_4_CLUE,
        earnedScore,
        earnedXp
      });

      onComplete(4, earnedScore, earnedXp, LEVEL_4_CLUE, attempts + 1);
    } else {
      sound.playIncorrect();
      setFeedback({
        type: 'error',
        title: 'INCORRECT ATTACK SEQUENCE',
        message: 'The chronological chain is out of order. Consider: What was sent first? What happened when the student opened it? When did the attacker get the password? When did they breach the core?',
        educationalHint: 'Initial Delivery must precede user action, which precedes credential theft, which leads to unauthorized account access.'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Objective Header */}
      <div className="p-4 bg-cyber-900 border-2 border-slate-700 shadow-voxel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CyberBadge variant="cyan" size="sm">LEVEL 4 // FORENSIC TIMELINE</CyberBadge>
            {solved && <CyberBadge variant="green" size="sm">COMPLETED</CyberBadge>}
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span>🕵️ TRACE THE ATTACK</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Reconstruct the attack progression. <span className="text-cyber-cyan font-bold">Drag and drop</span> (or use the arrow controls) to sequence the 4 cards into the correct chronological order.
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
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-cyber-900 border border-slate-700 font-code text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <GitFork className="w-4 h-4 text-cyber-cyan" />
            <span className="font-bold">CYBER KILL CHAIN RECONSTRUCTION</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetTimeline}
              className="px-2 py-1 bg-cyber-950 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Shuffle Reset</span>
            </button>

            <VoxelButton
              variant="cyan"
              size="sm"
              onClick={handleVerifySequence}
              icon={ShieldCheck}
            >
              VERIFY TIMELINE
            </VoxelButton>
          </div>
        </div>

        {/* 4 Sequential Slots Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {cards.map((card, index) => {
            const isCorrectPosition = solved && card.stepNumberCorrect === index + 1;
            return (
              <div
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                className={`
                  relative p-4 border-3 transition-all duration-200 select-none cursor-grab active:cursor-grabbing flex flex-col justify-between
                  ${isCorrectPosition
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-voxel-green'
                    : 'border-slate-700 bg-cyber-900/90 hover:border-cyber-cyan shadow-voxel'}
                  ${draggedIndex === index ? 'opacity-40 scale-95 border-dashed border-cyber-cyan' : ''}
                `}
              >
                {/* Stage Header Tag */}
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-cyber-950 border border-slate-700 flex items-center justify-center font-pixel text-xs text-cyber-cyan">
                      {index + 1}
                    </span>
                    <span className="font-code text-[11px] text-slate-400">
                      STEP {index + 1}
                    </span>
                  </div>
                  <Move className="w-3.5 h-3.5 text-slate-500" />
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

                  <div className="p-2 bg-cyber-950/80 border border-slate-800 text-[11px] font-code text-slate-400">
                    {card.technicalDetail}
                  </div>
                </div>

                {/* Arrow Controls for accessibility & touch */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMoveCard(index, -1)}
                    className="p-1 border border-slate-700 bg-cyber-950 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Left / Earlier"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="font-pixel text-[9px] text-slate-500">
                    DRAG OR MOVE
                  </span>

                  <button
                    disabled={index === cards.length - 1}
                    onClick={() => handleMoveCard(index, 1)}
                    className="p-1 border border-slate-700 bg-cyber-950 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
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
                PROCEED TO LEVEL 5: CATCH THE HACKER
              </VoxelButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
