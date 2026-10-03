import React from 'react';
import { useGameState } from './hooks/useGameState';
import { GameHUD } from './components/hud/GameHUD';
import { ParticleCanvas } from './components/common/ParticleCanvas';
import { ScanlineOverlay } from './components/common/ScanlineOverlay';
import { HomeScreen } from './pages/HomeScreen';
import { Level1Phishing } from './pages/Level1Phishing';
import { Level2Password } from './pages/Level2Password';
import { Level3SuspiciousWeb } from './pages/Level3SuspiciousWeb';
import { Level4TraceAttack } from './pages/Level4TraceAttack';
import { Level5CatchHacker } from './pages/Level5CatchHacker';
import { VictoryScreen } from './pages/VictoryScreen';

export default function App() {
  const {
    state,
    startInvestigation,
    navigateTo,
    recordLevelSuccess,
    toggleSound,
    toggleScanlines,
    resetGame
  } = useGameState();

  const handleNextLevel = (currentLevelNum) => {
    const nextLevel = currentLevelNum + 1;
    if (nextLevel <= 5) {
      navigateTo(`level-${nextLevel}`);
    } else {
      navigateTo('victory');
    }
  };

  return (
    <div className="relative min-h-screen bg-cyber-950 text-slate-100 flex flex-col font-sans selection:bg-cyber-cyan selection:text-cyber-950">
      {/* Background Floating Voxel Particles */}
      <ParticleCanvas />

      {/* CRT Scanline and Vignette Effect */}
      <ScanlineOverlay enabled={state.scanlinesEnabled} />

      {/* Persistent Game HUD */}
      <GameHUD
        state={state}
        onNavigate={navigateTo}
        onToggleSound={toggleSound}
        onToggleScanlines={toggleScanlines}
        onResetGame={resetGame}
      />

      {/* Dynamic Screen Viewport */}
      <main className="relative z-10 flex-1 p-3 sm:p-6 lg:p-8 flex flex-col">
        {state.currentScreen === 'home' && (
          <HomeScreen
            state={state}
            onStart={startInvestigation}
            onNavigate={navigateTo}
          />
        )}

        {state.currentScreen === 'level-1' && (
          <Level1Phishing
            isCompleted={state.levelResults[1]?.completed}
            currentClues={state.clues}
            onComplete={(levelNum, score, xp, clue, attempts) =>
              recordLevelSuccess(levelNum, score, xp, clue, attempts)
            }
            onNextLevel={() => handleNextLevel(1)}
          />
        )}

        {state.currentScreen === 'level-2' && (
          <Level2Password
            isCompleted={state.levelResults[2]?.completed}
            currentClues={state.clues}
            onComplete={(levelNum, score, xp, clue, attempts) =>
              recordLevelSuccess(levelNum, score, xp, clue, attempts)
            }
            onNextLevel={() => handleNextLevel(2)}
          />
        )}

        {state.currentScreen === 'level-3' && (
          <Level3SuspiciousWeb
            isCompleted={state.levelResults[3]?.completed}
            currentClues={state.clues}
            onComplete={(levelNum, score, xp, clue, attempts) =>
              recordLevelSuccess(levelNum, score, xp, clue, attempts)
            }
            onNextLevel={() => handleNextLevel(3)}
          />
        )}

        {state.currentScreen === 'level-4' && (
          <Level4TraceAttack
            isCompleted={state.levelResults[4]?.completed}
            currentClues={state.clues}
            onComplete={(levelNum, score, xp, clue, attempts) =>
              recordLevelSuccess(levelNum, score, xp, clue, attempts)
            }
            onNextLevel={() => handleNextLevel(4)}
          />
        )}

        {state.currentScreen === 'level-5' && (
          <Level5CatchHacker
            isCompleted={state.levelResults[5]?.completed}
            currentClues={state.clues}
            onComplete={(levelNum, score, xp, clue, attempts) =>
              recordLevelSuccess(levelNum, score, xp, clue, attempts)
            }
            onVictory={() => navigateTo('victory')}
          />
        )}

        {state.currentScreen === 'victory' && (
          <VictoryScreen
            state={state}
            onPlayAgain={resetGame}
            onReturnHome={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Cyber Detective Footer */}
      <footer className="relative z-10 py-3 px-4 border-t border-slate-800 bg-cyber-950/90 text-center text-xs font-code text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] text-cyber-cyan">BLOCKTRACE</span>
          <span>• Case 01: Find The Hacker</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Original Voxel Cybersecurity Detective Lab • Educational Edition
        </div>
      </footer>
    </div>
  );
}
