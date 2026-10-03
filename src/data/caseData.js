export const CASE_METADATA = {
  id: "CASE-01",
  title: "BLOCKTRACE",
  caseNumber: "CASE 01",
  name: "FIND THE HACKER",
  subtitle: "An attack has occurred. Collect the evidence. Find the hacker.",
  targetOrganization: "HexaCorp Academy Data Core",
  incidentTime: "14:22 UTC",
  threatLevel: "CRITICAL",
  totalLevels: 5,
  totalClues: 5,
  ranks: [
    { name: "MASTER DETECTIVE", minScore: 1200, icon: "👑", desc: "Flawless threat intelligence and deduction skills." },
    { name: "THREAT HUNTER", minScore: 950, icon: "🛡️", desc: "Expert investigative instincts with rapid response." },
    { name: "CYBER SCOUT", minScore: 700, icon: "🔍", desc: "Solid analytical foundation and vigilance." },
    { name: "NOVICE DETECTIVE", minScore: 0, icon: "📋", desc: "Promising trainee ready for more field operations." }
  ],
  levels: [
    {
      id: 1,
      name: "SPOT THE PHISH",
      icon: "📧",
      objective: "Identify the malicious phishing email targeting students.",
      maxScore: 250,
      xp: 250
    },
    {
      id: 2,
      name: "PASSWORD DETECTIVE",
      icon: "🔑",
      objective: "Analyze password entropy and pinpoint the strongest credential.",
      maxScore: 250,
      xp: 250
    },
    {
      id: 3,
      name: "SUSPICIOUS WEBSITE",
      icon: "🌐",
      objective: "Investigate rogue domain indicators and unmask the fake portal.",
      maxScore: 300,
      xp: 300
    },
    {
      id: 4,
      name: "TRACE THE ATTACK",
      icon: "🕵️",
      objective: "Reconstruct the attack kill chain in correct chronological order.",
      maxScore: 300,
      xp: 300
    },
    {
      id: 5,
      name: "CATCH THE HACKER",
      icon: "🚨",
      objective: "Cross-examine 3 suspects using gathered evidence and make the final arrest.",
      maxScore: 400,
      xp: 400
    }
  ]
};

export const INITIAL_GAME_STATE = {
  currentScreen: 'home', // 'home' | 'level-1' | 'level-2' | 'level-3' | 'level-4' | 'level-5' | 'victory'
  unlockedLevel: 1,
  score: 0,
  xp: 0,
  timerSeconds: 0,
  timerRunning: false,
  clues: [],
  levelResults: {
    1: { completed: false, score: 0, attempts: 0 },
    2: { completed: false, score: 0, attempts: 0 },
    3: { completed: false, score: 0, attempts: 0 },
    4: { completed: false, score: 0, attempts: 0 },
    5: { completed: false, score: 0, attempts: 0 }
  },
  soundMuted: false,
  scanlinesEnabled: true
};
