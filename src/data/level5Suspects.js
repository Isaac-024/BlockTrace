export const LEVEL_5_SUSPECTS = [
  {
    id: "suspect-a",
    name: "Alex Vance",
    code: "SUSPECT A",
    role: "Computer Science Student",
    device: "Laptop (ThinkPad E14)",
    os: "Ubuntu Linux 24.04",
    avatarColor: "from-blue-600 to-indigo-800",
    avatarIcon: "🎓",
    riskRating: "LOW RISK (ALIBI CONFIRMED)",
    isHacker: false,
    locationAtAttack: "Campus Main Library, 3rd Floor Quiet Zone",
    networkLog: {
      connectedAP: "AP-Library-03 (MAC: 44:D9:E7:11)",
      signalStrength: "-42 dBm (Excellent, inside library)",
      ipAddress: "10.200.44.89",
      activeConnections: [
        "https://stackoverflow.com (TCP 443)",
        "https://github.com/alex-cs (TCP 443)",
        "https://canvas.campus.edu (TCP 443)"
      ],
      listeningPorts: "None (Standard client mode)"
    },
    alibiDetails: [
      "Library security badge turnstile scanned at 13:45 UTC, remained inside until 16:30 UTC.",
      "Library Wi-Fi logs confirm uninterrupted connection to AP-Library-03 throughout 14:00-14:45 UTC.",
      "Zero network packets routed to the Cafeteria access point or rogue domain 'campus-login-auth.xyz'."
    ],
    interviewStatement: "I was struggling with my CS 240 packet routing lab all afternoon. Prof. Vance can confirm I submitted my lab code on Canvas at 14:10 UTC from the 3rd floor library desk.",
    verdictAnalysis: "Exonerated. Physical and digital alibis place Alex exclusively inside the library with zero Cafeteria Wi-Fi activity and clean network traffic."
  },
  {
    id: "suspect-b",
    name: "Ryan Gallagher",
    code: "SUSPECT B",
    role: "IT Department Intern",
    device: "Desktop Workstation (Fixed Tower)",
    os: "Windows 11 Enterprise",
    avatarColor: "from-emerald-600 to-teal-800",
    avatarIcon: "🖥️",
    riskRating: "CLEARED (DEVICE & ALIBI MISMATCH)",
    isHacker: false,
    locationAtAttack: "IT Helpdesk Office 102 (Hardwired Lab)",
    networkLog: {
      connectedAP: "None — Hardwired Cat6 Gigabit Ethernet",
      signalStrength: "N/A (Wired LAN)",
      ipAddress: "10.100.12.15 (Static Admin Subnet)",
      activeConnections: [
        "https://zoom.us (Encrypted video conference 14:00 - 15:00 UTC)",
        "https://itsupport.campus.edu/tickets (TCP 443)"
      ],
      listeningPorts: "Port 135, 445 (Standard Windows RPC)"
    },
    alibiDetails: [
      "Attending the mandatory all-hands IT security zoom briefing from 14:00 to 15:00 UTC with webcam and microphone active.",
      "Uses a fixed desktop workstation anchored to his desk with a Kensington lock. Could not have roamed to the cafeteria.",
      "Admin credentials require physical FIDO2 hardware YubiKey with MFA, immune to single-factor credential phishing."
    ],
    interviewStatement: "I was on a recorded Zoom call with the entire network administration team when the incident siren went off at 14:22. Plus, I don't even own a portable laptop for work.",
    verdictAnalysis: "Exonerated. Ryan operates a stationary desktop workstation on wired LAN and was live on a monitored video conference throughout the attack timeframe."
  },
  {
    id: "suspect-c",
    name: "Vikram Desai",
    code: "SUSPECT C",
    role: "External Network Contractor",
    device: "Laptop (VoxelBook Stealth)",
    os: "Dual-Boot Kali Linux / Arch",
    avatarColor: "from-rose-600 to-amber-700",
    avatarIcon: "⚡",
    riskRating: "CRITICAL PRIME SUSPECT",
    isHacker: true,
    locationAtAttack: "Campus Cafeteria (Directly below AP-North)",
    networkLog: {
      connectedAP: "AP-Cafeteria-North (MAC: 44:D9:E7:99)",
      signalStrength: "-31 dBm (Direct proximity to cafeteria router)",
      ipAddress: "10.200.14.205 (Matched to rogue traffic sender)",
      activeConnections: [
        "http://campus-login-auth.xyz (DNS resolution recorded at 14:21 UTC)",
        "POST http://194.38.20.14:8080 (Credential harvester listener)",
        "SSH 10.100.0.1 (Unauthorized core access attempt at 14:22 UTC)"
      ],
      listeningPorts: "Port 8080 (Python exfiltration collector script)"
    },
    alibiDetails: [
      "Claimed he was 'only having coffee and reading tech news' in the cafeteria.",
      "Wi-Fi triangulation logs position his laptop at table 4, right under the Cafeteria AP-North where the intrusion packet originated at 14:22 UTC.",
      "Packet captures reveal his MAC address queried 'campus-login-auth.xyz' and hosted the listening service on port 8080 identified in Level 3.",
      "Extracted stolen student credentials were discovered buffered in his memory cache!"
    ],
    interviewStatement: "I'm just a temporary contractor auditing the cafeteria's vending machine telemetry. Any suspicious packets you see must just be 'harmless test scripts'...",
    verdictAnalysis: "GUILTY AS CHARGED! All 5 forensic clues align indisputably: Laptop device roaming on Cafeteria Wi-Fi at 14:22 UTC, hosting port 8080 exfiltration, and originating the unauthorized database access."
  }
];

export const FORENSIC_DOSSIER_CLUES = [
  {
    id: "forensic-1",
    label: "CLUE 1 — Phishing Lure",
    finding: "Rogue domain 'campus-login-auth.xyz' was distributed to trap campus student accounts."
  },
  {
    id: "forensic-2",
    label: "CLUE 2 — Password Entropy",
    finding: "Attacker exploited accounts using weak passwords with low randomness and lack of MFA."
  },
  {
    id: "forensic-3",
    label: "CLUE 3 — Rogue Infrastructure",
    finding: "The rogue server received data on local listener port 8080 from within the campus subnet."
  },
  {
    id: "forensic-4",
    label: "CLUE 4 — Attack Timeline",
    finding: "Intrusion occurred at 14:22 UTC from a mobile LAPTOP connected to Cafeteria AP-North."
  },
  {
    id: "forensic-5",
    label: "CLUE 5 — Digital Forensics",
    finding: "Device MAC at 14:22 UTC resolved DNS queries to the phishing host and initiated the core breach."
  }
];
