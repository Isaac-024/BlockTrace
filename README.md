# 🛡️ BLOCKTRACE — CASE 01: FIND THE HACKER

> **"An attack has occurred. Collect the evidence. Find the hacker."**

**BlockTrace** is an interactive educational cybersecurity game designed for students. Inspired by an original voxel/block-based aesthetic with deep cyber-detective atmosphere, players investigate a fictional cyber attack through 5 progressive challenges, collecting forensic clues, analyzing threat vectors, and identifying the rogue operator.

---

## 🎮 Game Structure & Levels

### 📧 Level 1: Spot the Phish
- **Objective:** Examine 5 candidate emails in the cyber mail client to identify the malicious phishing attempt.
- **Red Flags Analyzed:**
  - Spoofed external domain (`careers-portal-campus-verify.ru.cc`)
  - Manufactured artificial panic ("2 HOURS TO CLAIM!")
  - Unencrypted HTTP destination (`http://campus-login-auth.xyz`)
  - Direct student credential requests
- **Reward:** Unlocks Clue #1 (Phishing Vector) & 250 XP.

### 🔑 Level 2: Password Detective
- **Objective:** Run 5 passwords through the BLOCKTRACE Entropy Scanner to determine which credential offers maximum cryptographic resistance.
- **Analyzed Credentials:** `password123`, `Sai@123`, `P@ssw0rd!`, `T9#kL2!xQ`, `qwerty`.
- **Winning Credential:** `T9#kL2!xQ` (high Shannon entropy, zero dictionary words, mixed case, numbers, and symbols).
- **Reward:** Unlocks Clue #2 (Compromised Weak Credential) & 250 XP.

### 🌐 Level 3: Suspicious Website
- **Objective:** Investigate an imposter campus portal rendered inside the "VoxelNet Navigator" sandbox.
- **Interactive Targets:**
  - Insecure URL protocol and rogue `.xyz` TLD
  - Broken/missing SSL padlock certificate
  - 15-minute countdown fear banner
  - Suspicious credential and PIN harvesting form
- **Reward:** Unlocks Clue #3 (Rogue Infrastructure & IP telemetry) & 300 XP.

### 🕵️ Level 4: Trace the Attack
- **Objective:** Reconstruct the cyber kill chain by arranging timeline cards into the correct chronological progression:
  1. `Phishing Email` (Initial access delivery)
  2. `Link Clicked` (User execution)
  3. `Credentials Stolen` (Harvesting)
  4. `Account Access` (Intrusion at 14:22 UTC)
- **Mechanics:** Drag & drop cards or use one-click directional arrows.
- **Reward:** Unlocks Clue #4 (Attack Timeline) & 300 XP.

### 🚨 Level 5: Catch the Hacker
- **Objective:** Cross-examine 3 suspects using the 5 gathered case clues:
  - **Suspect A (Alex):** Student, ThinkPad laptop, verified alibi in 3rd floor library.
  - **Suspect B (Ryan):** IT intern, stationary desktop workstation, recorded Zoom meeting.
  - **Suspect C (Vikram):** Contractor, VoxelBook laptop on Cafeteria Wi-Fi at 14:22 UTC, hosting port 8080 listener.
- **Action:** Issue a cybersecurity arrest warrant to apprehend Vikram!
- **Reward:** Unlocks Final Victory & Rank classification.

---

## 🏆 Detective Ranks

- 👑 **Master Detective:** >= 1,200 Points (Near-flawless deduction)
- 🛡️ **Threat Hunter:** >= 950 Points (Expert investigative instincts)
- 🔍 **Cyber Scout:** >= 700 Points (Solid analytical foundation)
- 📋 **Novice Detective:** < 700 Points (Promising trainee)

---

## 🛠️ Technology Stack

- **Framework:** React 18
- **Bundler / Dev Server:** Vite 5
- **Styling:** Tailwind CSS 3 (with custom voxel bevel borders, cyber colors, and glow filters)
- **Icons:** Lucide React
- **Sound Effects:** 100% Original Web Audio API Synthesizer (Zero copyrighted assets, browser-native oscillators)
- **Effects:** Custom Canvas floating voxel particle engine + canvas-confetti
- **Persistence:** LocalStorage integration (preserves progress upon refresh, with confirmation reset)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run Vite development server
npm run dev

# 3. Build production bundle
npm run build
```

Open `http://localhost:5173/` in your browser to play!
