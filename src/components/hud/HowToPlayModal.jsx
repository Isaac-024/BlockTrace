import React from 'react';
import { X, ShieldAlert, Award, Search, Key, Globe, GitFork, UserCheck } from 'lucide-react';
import { VoxelButton } from '../common/VoxelButton';
import { CyberBadge } from '../common/CyberBadge';

export function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-cyber-900 border-t-4 border-l-4 border-emerald-400 border-r-4 border-b-4 border-emerald-950 shadow-[0_0_30px_rgba(16,185,129,0.3)] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 bg-emerald-950/80 border-b-2 border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <h2 className="font-pixel text-sm text-emerald-300 tracking-wider uppercase">
              CYBER DETECTIVE BRIEFING & RULES
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors border border-emerald-700/60"
            aria-label="Close Rules"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm font-sans flex-1 text-slate-300 leading-relaxed">
          <div className="p-4 bg-emerald-950/40 border border-emerald-700/50 space-y-1.5">
            <h3 className="font-pixel text-xs text-emerald-300 uppercase">MISSION DIRECTIVE</h3>
            <p className="text-xs text-slate-300">
              A serious cyber breach occurred at HexaCorp Data Core. As the Cyber Detective, you must investigate 5 progressive levels, collect 5 core clues, analyze forensic evidence, and arrest the true attacker.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-pixel text-xs text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Search className="w-4 h-4 text-cyber-cyan" />
              THE 5 INVESTIGATION LEVELS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-cyber-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyber-cyan font-bold font-pixel text-[11px]">
                  <span>📧 LEVEL 1: SPOT THE PHISH</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Examine 5 inbox emails. Look out for fake sender domains, manufactured urgency, unencrypted HTTP links, and requests for credentials.
                </p>
              </div>

              <div className="p-3 bg-cyber-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyber-cyan font-bold font-pixel text-[11px]">
                  <span>🔑 LEVEL 2: PASSWORD DETECTIVE</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Test 5 passwords through the Entropy Scanner. Discover which password has true cryptographic strength and resist brute-force attacks.
                </p>
              </div>

              <div className="p-3 bg-cyber-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyber-cyan font-bold font-pixel text-[11px]">
                  <span>🌐 LEVEL 3: SUSPICIOUS WEBSITE</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Explore an interactive simulated rogue website. Click and inspect the URL bar, SSL padlock, urgent popup, and form to gather technical evidence.
                </p>
              </div>

              <div className="p-3 bg-cyber-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyber-cyan font-bold font-pixel text-[11px]">
                  <span>🕵️ LEVEL 4: TRACE THE ATTACK</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Reconstruct the cyber kill chain. Drag and drop the timeline cards into the correct chronological progression to map out the breach.
                </p>
              </div>
            </div>

            <div className="p-3 bg-cyber-950/80 border border-rose-900/60 space-y-1">
              <div className="flex items-center gap-2 text-rose-400 font-bold font-pixel text-[11px]">
                <span>🚨 LEVEL 5: CATCH THE HACKER</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Cross-reference your 5 case clues against 3 suspects: Alex (Student), Ryan (Intern), and Vikram (Contractor). Read their network logs, device specs, and alibis to identify the guilty party!
              </p>
            </div>
          </div>

          <div className="p-4 bg-cyber-950/70 border border-slate-800 space-y-2">
            <h4 className="font-pixel text-xs text-amber-300 uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              SCORING & DETECTIVE RANKS
            </h4>
            <p className="text-xs text-slate-400">
              Points and XP are awarded for correct deductions on your first attempt. Complete the case to earn your official rank:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <CyberBadge variant="slate" size="xs">👑 MASTER DETECTIVE (1200+ PTS)</CyberBadge>
              <CyberBadge variant="cyan" size="xs">🛡️ THREAT HUNTER (950+ PTS)</CyberBadge>
              <CyberBadge variant="green" size="xs">🔍 CYBER SCOUT (700+ PTS)</CyberBadge>
              <CyberBadge variant="amber" size="xs">📋 NOVICE DETECTIVE (&lt;700 PTS)</CyberBadge>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-cyber-950/90 border-t border-slate-800 flex justify-end">
          <VoxelButton variant="green" size="sm" onClick={onClose}>
            UNDERSTOOD, COMMENCE MISSION
          </VoxelButton>
        </div>
      </div>
    </div>
  );
}
