export const LEVEL_2_PASSWORDS = [
  {
    id: "pwd-1",
    password: "password123",
    length: 11,
    isCorrect: false,
    scoreRating: 15,
    strengthLabel: "VERY WEAK",
    crackTimeEstimate: "0.0001 seconds (Instant)",
    color: "text-rose-500",
    barColor: "bg-rose-500",
    metrics: {
      hasUppercase: false,
      hasLowercase: true,
      hasNumbers: true,
      hasSymbols: false,
      hasDictionaryWord: true,
      entropy: "Very Low"
    },
    flaws: [
      "Uses the exact word 'password' (most common password in breach dumps)",
      "Appends simple predictable sequential sequence '123'",
      "Vulnerable to instant rainbow table and dictionary attacks"
    ],
    analysis: "Contains common dictionary root 'password' followed by predictable sequential digits. Cracks almost instantly."
  },
  {
    id: "pwd-2",
    password: "Sai@123",
    length: 7,
    isCorrect: false,
    scoreRating: 30,
    strengthLabel: "WEAK",
    crackTimeEstimate: "0.4 seconds",
    color: "text-amber-500",
    barColor: "bg-amber-500",
    metrics: {
      hasUppercase: true,
      hasLowercase: true,
      hasNumbers: true,
      hasSymbols: true,
      hasDictionaryWord: true,
      entropy: "Low"
    },
    flaws: [
      "Critically short (only 7 characters long)",
      "Common personal name 'Sai' combined with predictable '@123' suffix",
      "Easily broken by automated GPU brute-force masks"
    ],
    analysis: "Even though it mixes character sets, at only 7 characters long, modern GPUs can brute force this in less than a second."
  },
  {
    id: "pwd-3",
    password: "P@ssw0rd!",
    length: 9,
    isCorrect: false,
    scoreRating: 45,
    strengthLabel: "MODERATE",
    crackTimeEstimate: "4.2 seconds",
    color: "text-amber-400",
    barColor: "bg-amber-400",
    metrics: {
      hasUppercase: true,
      hasLowercase: true,
      hasNumbers: true,
      hasSymbols: true,
      hasDictionaryWord: true,
      entropy: "Medium-Low"
    },
    flaws: [
      "Predictable l33tspeak substitutions (@ for a, 0 for o)",
      "Hacking tools like Hashcat automatically test these exact substitutions",
      "Short length (9 chars) based on a textbook dictionary word"
    ],
    analysis: "Replacing letters with symbols like @ and 0 is recognized by password cracking dictionaries automatically."
  },
  {
    id: "pwd-4",
    password: "T9#kL2!xQ",
    length: 9,
    isCorrect: true,
    scoreRating: 98,
    strengthLabel: "VERY STRONG",
    crackTimeEstimate: "Estimated 240+ Years (Against brute-force)",
    color: "text-emerald-400",
    barColor: "bg-emerald-400",
    metrics: {
      hasUppercase: true,
      hasLowercase: true,
      hasNumbers: true,
      hasSymbols: true,
      hasDictionaryWord: false,
      entropy: "Maximum High"
    },
    flaws: [],
    strengths: [
      "Optimal Randomness: No recognizable dictionary roots or common phrases",
      "Mixed Character Sets: Full distribution of uppercase, lowercase, numbers, and symbols",
      "High Shannon Entropy: Unpredictable character transitions that resist GPU pattern rules",
      "Difficult to Guess: Immune to social engineering and birthday attacks"
    ],
    clueDiscovered: {
      id: "clue-2",
      number: 2,
      title: "Compromised Weak Credential",
      tag: "LEVEL 2 EVIDENCE",
      icon: "🔑",
      summary: "Attacker gained entry using stolen credentials of accounts with weak, predictable passwords.",
      detail: "Forensic memory dumps show the attacker exploited single-character substitutions and reused passwords on the campus network, whereas accounts using high-entropy random keys like T9#kL2!xQ remained uncompromised."
    },
    analysis: "The gold standard: completely random character distribution, mixed case, numbers, and special symbols with zero dictionary words."
  },
  {
    id: "pwd-5",
    password: "qwerty",
    length: 6,
    isCorrect: false,
    scoreRating: 5,
    strengthLabel: "CRITICAL FAILURE",
    crackTimeEstimate: "0.00001 seconds (Instantaneous)",
    color: "text-rose-600",
    barColor: "bg-rose-600",
    metrics: {
      hasUppercase: false,
      hasLowercase: true,
      hasNumbers: false,
      hasSymbols: false,
      hasDictionaryWord: false,
      entropy: "Near Zero"
    },
    flaws: [
      "Top keyboard walk sequence across the QWERTY keyboard top row",
      "Only 6 characters long",
      "Included in every baseline hacker wordlist worldwide"
    ],
    analysis: "A classic keyboard pattern. Any security audit tool rejects this immediately."
  }
];
