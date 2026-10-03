import React from 'react';
import { X, BookOpen, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VoxelButton } from '../common/VoxelButton';
import { CyberBadge } from '../common/CyberBadge';

export function ClueNotebookModal({ isOpen, onClose, clues = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-cyber-900 border-t-4 border-l-4 border-cyber-cyan border-r-4 border-b-4 border-cyan-950 shadow-[0_0_30px_rgba(0,245,212,0.3)] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 bg-cyan-950/80 border-b-2 border-cyan-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-cyber-cyan animate-pulse" />
            <h2 className="font-pixel text-sm text-cyber-cyan tracking-wider uppercase">
              CASE NOTEBOOK — EVIDENCE LOG
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-colors border border-cyan-700/60"
            aria-label="Close Notebook"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 font-sans flex-1">
          <div className="p-3 bg-cyber-950/60 border border-slate-700/60 flex items-center justify-between">
            <div className="text-xs text-slate-400 font-code">
              STATUS: <span className="text-emerald-400 font-bold">{clues.length} / 5 CLUES RECOVERED</span>
            </div>
            <CyberBadge variant={clues.length === 5 ? "green" : "amber"} size="xs">
              {clues.length === 5 ? "ALL EVIDENCE READY" : "INVESTIGATION ONGOING"}
            </CyberBadge>
          </div>

          {clues.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-400/80 mx-auto" />
              <p className="font-pixel text-xs text-slate-400">NO CLUES COLLECTED YET</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Complete Level 1 (Spot the Phish) and subsequent challenges to unlock critical forensic evidence for your case file.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {clues.map((clue, idx) => (
                <div
                  key={clue.id || idx}
                  className="p-4 bg-cyber-950/80 border-l-4 border-cyber-cyan border-t border-r border-b border-slate-800 hover:border-slate-700 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{clue.icon || '🔍'}</span>
                      <h4 className="font-pixel text-xs text-slate-100 uppercase tracking-wide">
                        {clue.title}
                      </h4>
                    </div>
                    <CyberBadge variant="cyan" size="xs">
                      {clue.tag || `CLUE #${clue.number || idx + 1}`}
                    </CyberBadge>
                  </div>
                  <p className="text-xs text-cyber-cyan/90 font-code font-medium mb-1.5">
                    {clue.summary}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {clue.detail}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-cyber-950/90 border-t border-slate-800 flex justify-end">
          <VoxelButton variant="cyan" size="sm" onClick={onClose}>
            CLOSE DOSSIER
          </VoxelButton>
        </div>
      </div>
    </div>
  );
}
