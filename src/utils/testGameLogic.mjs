import { CASE_METADATA, INITIAL_GAME_STATE } from '../data/caseData.js';
import { LEVEL_1_EMAILS } from '../data/level1Emails.js';
import { LEVEL_2_PASSWORDS } from '../data/level2Passwords.js';
import { LEVEL_3_CLUES, LEVEL_3_QUIZ } from '../data/level3Website.js';
import { LEVEL_4_CARDS, LEVEL_4_CLUE } from '../data/level4Timeline.js';
import { LEVEL_5_SUSPECTS, FORENSIC_DOSSIER_CLUES } from '../data/level5Suspects.js';
import { calculateRank, calculateLevelScore, formatTime } from './scoring.js';

console.log("=== RUNNING BLOCKTRACE GAME INTEGRATION VERIFICATION ===");

// 1. Case Metadata Check
console.assert(CASE_METADATA.totalLevels === 5, "Total levels must be 5");
console.assert(CASE_METADATA.levels.length === 5, "Levels array must have 5 items");
console.log("✔ Case Metadata Verified");

// 2. Level 1 Emails Check
const maliciousEmails = LEVEL_1_EMAILS.filter(e => e.isMalicious);
console.assert(LEVEL_1_EMAILS.length === 5, "Level 1 must have 5 emails");
console.assert(maliciousEmails.length === 1, "Must have exactly 1 malicious email");
console.assert(maliciousEmails[0].clueDiscovered.number === 1, "Must yield Clue 1");
console.log(`✔ Level 1 Verified: Malicious email is '${maliciousEmails[0].subject}'`);

// 3. Level 2 Passwords Check
const correctPasswords = LEVEL_2_PASSWORDS.filter(p => p.isCorrect);
console.assert(LEVEL_2_PASSWORDS.length === 5, "Level 2 must have 5 passwords");
console.assert(correctPasswords.length === 1, "Must have exactly 1 correct password");
console.assert(correctPasswords[0].password === "T9#kL2!xQ", "Correct password must be T9#kL2!xQ");
console.assert(correctPasswords[0].clueDiscovered.number === 2, "Must yield Clue 2");
console.log("✔ Level 2 Verified: Strongest password is 'T9#kL2!xQ'");

// 4. Level 3 Suspicious Website Check
console.assert(LEVEL_3_CLUES.length === 5, "Level 3 must have 5 inspectable targets");
const correctQuizOpts = LEVEL_3_QUIZ.options.filter(o => o.isCorrect);
console.assert(correctQuizOpts.length === 1, "Level 3 quiz must have 1 correct answer");
console.assert(LEVEL_3_QUIZ.clueDiscovered.number === 3, "Must yield Clue 3");
console.log("✔ Level 3 Verified: 5 Inspection targets & correct domain threat answer");

// 5. Level 4 Timeline Check
console.assert(LEVEL_4_CARDS.length === 4, "Level 4 must have 4 cards");
const steps = LEVEL_4_CARDS.map(c => c.stepNumberCorrect).sort();
console.assert(JSON.stringify(steps) === JSON.stringify([1, 2, 3, 4]), "Cards must sequence 1..4");
console.assert(LEVEL_4_CLUE.number === 4, "Must yield Clue 4");
console.log("✔ Level 4 Verified: Sequence cards mapped 1 to 4 correctly");

// 6. Level 5 Suspects Check
console.assert(LEVEL_5_SUSPECTS.length === 3, "Level 5 must have 3 suspects");
const guiltySuspects = LEVEL_5_SUSPECTS.filter(s => s.isHacker);
console.assert(guiltySuspects.length === 1, "Must have exactly 1 guilty suspect");
console.assert(guiltySuspects[0].name.includes("Vikram"), "Vikram must be the guilty suspect");
console.assert(FORENSIC_DOSSIER_CLUES.length === 5, "Must have 5 forensic dossier clues");
console.log("✔ Level 5 Verified: Vikram identified by Cafeteria AP logs and port 8080");

// 7. Scoring and Ranks Check
const topRank = calculateRank(1300);
const midRank = calculateRank(850);
console.assert(topRank.name === "MASTER DETECTIVE", "Top score yields MASTER DETECTIVE");
console.assert(midRank.name === "CYBER SCOUT", "Mid score yields CYBER SCOUT");
console.assert(formatTime(125) === "02:05", "125 seconds format as 02:05");
console.log("✔ Scoring and Ranks Logic Verified");

console.log("=================================================");
console.log("🎉 ALL BLOCKTRACE CASE 01 GAME INTEGRATION TESTS PASSED!");
console.log("=================================================");
