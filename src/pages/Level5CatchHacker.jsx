import React, { useState } from 'react';
import { UserCheck, ShieldAlert, AlertOctagon, CheckCircle2, ArrowRight, Laptop, Monitor, Wifi, Radio, Search, Terminal, Award } from 'lucide-react';
import { LEVEL_5_SUSPECTS, FORENSIC_DOSSIER_CLUES } from '../data/level5Suspects';
import { VoxelBlock } from '../components/common/VoxelBlock';
import { VoxelButton } from '../components/common/VoxelButton';
import { CyberBadge } from '../components/common/CyberBadge';
import { sound } from '../utils/soundSynthesizer';
import { fireCyberConfetti } from '../components/effects/VictoryConfetti';
import { calculateLevelScore } from '../utils/scoring';

export function Level5CatchHacker({ onComplete, onVictory, isCompleted, currentClues = [] }) {
  const [selectedSuspect, setSelectedSuspect] = useState(LEVEL_5_SUSPECTS[0]);
  const [inspectedSuspects, setInspectedSuspects] = useState(new Set([LEVEL_5_SUSPECTS[0].id]));
  const [confirmAccuseModal, setConfirmAccuseModal] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [solved, setSolved] = useState(isCompleted);
  const [attempts, setAttempts] = useState(0);

  // Sync solved state if isCompleted changes
  React.useEffect(() => {
    setSolved(isCompleted);
    if (!isCompleted) {
      setFeedback(null);
      setAttempts(0);
      setSelectedSuspect(LEVEL_5_SUSPECTS[0]);
      setInspectedSuspects(new Set([LEVEL_5_SUSPECTS[0].id]));
      setConfirmAccuseModal(false);
    }
  }, [isCompleted]);

  const handleSelectSuspect = (suspect) => {
    setSelectedSuspect(suspect);
    setInspectedSuspects((prev) => {
      const next = new Set(prev);
      next.add(suspect.id);
      return next;
    });
  };

  const handleTriggerAccuse = () => {
    setConfirmAccuseModal(true);
  };

  const handleConfirmAccusation = (suspect) => {
    setConfirmAccuseModal(false);
    setAttempts((prev) => prev + 1);

    if (suspect.isHacker) {
      // VICTORY! Correct Suspect Accused
      sound.playVictory();
      fireCyberConfetti();
      setSolved(true);

      const earnedScore = calculateLevelScore(400, attempts + 1);
      const earnedXp = 400;

      const finalClue = {
        id: "clue-5",
        number: 5,
        title: "Perpetrator Apprehended",
        tag: "CASE RESOLVED",
        icon: "🚨",
        summary: "Vikram Desai (External Contractor) identified as the rogue operator.",
        detail: "Digital forensics corroborated all 5 clues: laptop MAC address matched Cafeteria AP-North at 14:22 UTC, rogue listener active on port 8080, and stolen credential hashes recovered in local buffer."
      };

      setFeedback({
        type: 'success',
        title: 'CASE CLOSED // HACKER IDENTIFIED & STOPPED!',
        message: 'BRILLIANT DETECTIVE WORK! You correctly deduced that Vikram Desai was the perpetrator! All 5 forensic vectors aligned: portable laptop connected to the Cafeteria AP at 14:22 UTC, hosting the Python listener on port 8080, and initiating the unauthorized core database breach.',
        clue: finalClue,
        earnedScore,
        earnedXp
      });

      onComplete(5, earnedScore, earnedXp, finalClue, attempts + 1);
    } else {
      // Wrong suspect
      sound.playIncorrect();
      setFeedback({
        type: 'error',
        title: 'FALSE ACCUSATION // ALIBI HOLDS FIRM',
        message: `${suspect.name} is innocent! ${suspect.verdictAnalysis}`,
        educationalHint: 'Check the location and device type: Was the intruder on a wired desktop or mobile laptop? Which access point transmitted the breach at 14:22 UTC?'
      });
    }
  };

  const allSuspectsInspected = inspectedSuspects.size >= 3;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Objective Header */}
      <div className="p-4 bg-cyber-900 border-2 border-slate-700 shadow-voxel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CyberBadge variant="rose" size="sm">LEVEL 5 // FINAL APPREHENSION</CyberBadge>
            {solved && <CyberBadge variant="green" size="sm">CASE SOLVED</CyberBadge>}
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span>🚨 CATCH THE HACKER</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Cross-examine the 3 suspects using your 5 forensic clues. Review device specs, location at 14:22 UTC, and network telemetry to identify the attacker.
          </p>
        </div>

        {solved && (
          <VoxelButton
            variant="green"
            size="md"
            onClick={onVictory}
            icon={Award}
            className="shrink-0"
          >
            VIEW CASE VICTORY DEBRIEF
          </VoxelButton>
        )}
      </div>

      {/* Forensic Clue Cross-Reference Drawer Banner */}
      <div className="p-3.5 bg-cyber-900 border-2 border-cyan-800/80 shadow-voxel space-y-2">
        <div className="flex items-center justify-between text-xs font-code">
          <span className="text-cyber-cyan font-bold flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" />
            CASE DOSSIER // 5 FORENSIC INCIDENT CLUES
          </span>
          <span className="text-slate-400 text-[11px]">Deduce the match</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          {FORENSIC_DOSSIER_CLUES.map((clue, idx) => (
            <div
              key={clue.id}
              className="p-2 bg-cyber-950/80 border border-slate-800 text-[11px] font-sans"
            >
              <div className="font-pixel text-[9px] text-cyber-cyan mb-1">
                {clue.label}
              </div>
              <p className="text-slate-300 line-clamp-2">
                {clue.finding}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Suspect Profiles & Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Suspect Selector Cards (Left 4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="px-3 py-2 bg-cyber-900/90 border border-slate-700 flex items-center justify-between text-xs font-code text-slate-300">
            <span className="flex items-center gap-1.5 font-bold">
              <UserCheck className="w-3.5 h-3.5 text-cyber-cyan" />
              SUSPECT DOSSIERS (3)
            </span>
            <span className="text-[11px] text-slate-400">
              {inspectedSuspects.size}/3 Inspected
            </span>
          </div>

          <div className="space-y-2.5">
            {LEVEL_5_SUSPECTS.map((suspect) => {
              const isSelected = selectedSuspect.id === suspect.id;
              const hasInspected = inspectedSuspects.has(suspect.id);

              return (
                <div
                  key={suspect.id}
                  onClick={() => handleSelectSuspect(suspect)}
                  className={`
                    p-3.5 border-2 cursor-pointer transition-all select-none
                    ${isSelected 
                      ? 'border-cyber-cyan bg-cyan-950/40 shadow-voxel-cyan -translate-y-0.5' 
                      : 'border-slate-800 bg-cyber-900/90 hover:border-slate-600 hover:bg-slate-800/50'}
                  `}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{suspect.avatarIcon}</span>
                      <div>
                        <h4 className="font-pixel text-xs text-slate-100 uppercase">
                          {suspect.name}
                        </h4>
                        <span className="font-code text-[10px] text-slate-400">
                          {suspect.code} • {suspect.role}
                        </span>
                      </div>
                    </div>

                    <CyberBadge
                      variant={hasInspected ? "slate" : "amber"}
                      size="xs"
                    >
                      {hasInspected ? "INSPECTED" : "NEW"}
                    </CyberBadge>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-code pt-1 border-t border-slate-800/80 text-slate-400">
                    <span className="flex items-center gap-1">
                      {suspect.device.includes('Laptop') ? <Laptop className="w-3 h-3 text-cyan-400" /> : <Monitor className="w-3 h-3 text-emerald-400" />}
                      {suspect.device.split(' ')[0]}
                    </span>
                    <span className="truncate max-w-[130px]">{suspect.locationAtAttack.split(',')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Suspect Cross-Examination Bench (Right 8 Cols) */}
        <div className="lg:col-span-8">
          <VoxelBlock
            title={`${selectedSuspect.code} — FORENSIC TELEMETRY`}
            icon={Search}
            variant={selectedSuspect.isHacker && solved ? "green" : "cyan"}
            className="h-full flex flex-col justify-between"
            bodyClassName="p-5 flex-1 flex flex-col justify-between space-y-4"
          >
            {/* Suspect Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cyber-950 border-2 border-slate-700 flex items-center justify-center text-2xl shadow-voxel">
                  {selectedSuspect.avatarIcon}
                </div>
                <div>
                  <h3 className="font-pixel text-sm text-slate-100 uppercase">
                    {selectedSuspect.name}
                  </h3>
                  <div className="font-code text-xs text-slate-400">
                    Role: <span className="text-slate-200">{selectedSuspect.role}</span>
                  </div>
                </div>
              </div>

              <CyberBadge
                variant={selectedSuspect.id === 'suspect-c' ? "rose" : "slate"}
                size="sm"
              >
                {selectedSuspect.riskRating}
              </CyberBadge>
            </div>

            {/* Profile Grid: Device, Location, OS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-code bg-cyber-950/80 p-3 border border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px]">DEVICE HARDWARE</span>
                <span className="text-slate-200 font-bold">{selectedSuspect.device}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">OPERATING SYSTEM</span>
                <span className="text-slate-200 font-bold">{selectedSuspect.os}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">LOCATION AT 14:22 UTC</span>
                <span className="text-amber-300 font-bold">{selectedSuspect.locationAtAttack}</span>
              </div>
            </div>

            {/* Network Traffic Capture Table */}
            <div className="p-3 bg-cyber-950 border border-slate-800 space-y-2 font-code text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-1">
                <span className="flex items-center gap-1 text-cyber-cyan font-bold">
                  <Wifi className="w-3.5 h-3.5" />
                  ACCESS POINT & NETWORK LOGS
                </span>
                <span>IP: {selectedSuspect.networkLog.ipAddress}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500">Connected AP: </span>
                  <span className="text-slate-200">{selectedSuspect.networkLog.connectedAP}</span>
                </div>
                <div>
                  <span className="text-slate-500">Signal: </span>
                  <span className="text-slate-200">{selectedSuspect.networkLog.signalStrength}</span>
                </div>
              </div>

              <div className="text-[11px]">
                <span className="text-slate-500 block mb-1">Active Sockets & Connections:</span>
                <div className="bg-slate-900/90 p-2 border border-slate-800 space-y-1 font-mono text-[10px]">
                  {selectedSuspect.networkLog.activeConnections.map((conn, i) => (
                    <div
                      key={i}
                      className={conn.includes('8080') || conn.includes('campus-login') ? 'text-rose-400 font-bold' : 'text-slate-300'}
                    >
                      {conn}
                    </div>
                  ))}
                  <div className="text-amber-300">
                    Listening: {selectedSuspect.networkLog.listeningPorts}
                  </div>
                </div>
              </div>
            </div>

            {/* Interview & Alibi Details */}
            <div className="p-3 bg-cyber-950/60 border border-slate-800 text-xs space-y-1 font-sans">
              <span className="font-pixel text-[10px] text-slate-400 block uppercase">
                INTERVIEW STATEMENT:
              </span>
              <p className="text-slate-300 italic text-[11px]">
                "{selectedSuspect.interviewStatement}"
              </p>
            </div>

            {/* Accuse Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <div className="text-xs text-slate-400 font-code">
                Ready to make formal arrest?
              </div>

              <VoxelButton
                variant="rose"
                size="md"
                onClick={handleTriggerAccuse}
                icon={AlertOctagon}
                className="w-full sm:w-auto"
              >
                ACCUSE {selectedSuspect.code} ({selectedSuspect.name.split(' ')[0].toUpperCase()})
              </VoxelButton>
            </div>
          </VoxelBlock>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmAccuseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-950/90 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-cyber-900 border-4 border-rose-600 shadow-[0_0_30px_rgba(244,63,94,0.5)] p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertOctagon className="w-6 h-6 shrink-0" />
              <h3 className="font-pixel text-sm uppercase tracking-wider">
                CONFIRM ACCUSATION WARRANT
              </h3>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              You are about to issue a formal cybersecurity arrest warrant against:
            </p>

            <div className="p-3 bg-cyber-950 border border-rose-800/80 font-code text-xs space-y-1 text-slate-200">
              <div>SUSPECT: <span className="font-bold text-rose-300">{selectedSuspect.name}</span></div>
              <div>ROLE: <span className="text-slate-300">{selectedSuspect.role}</span></div>
              <div>DEVICE: <span className="text-slate-300">{selectedSuspect.device}</span></div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Ensure you have cross-referenced all 5 clues before submitting this warrant!
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <VoxelButton
                variant="dark"
                size="sm"
                onClick={() => setConfirmAccuseModal(false)}
              >
                RETURN TO FILES
              </VoxelButton>
              <VoxelButton
                variant="rose"
                size="sm"
                onClick={() => handleConfirmAccusation(selectedSuspect)}
              >
                ISSUE ARREST WARRANT
              </VoxelButton>
            </div>
          </div>
        </div>
      )}

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
                  <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0" />
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
                    CASE STATUS: {feedback.clue.title}
                  </span>
                  <span>{feedback.clue.summary}</span>
                </div>
              )}
            </div>

            {feedback.type === 'success' && (
              <VoxelButton
                variant="green"
                size="md"
                onClick={onVictory}
                icon={Award}
                className="shrink-0 w-full md:w-auto"
              >
                PROCEED TO VICTORY SCREEN
              </VoxelButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
