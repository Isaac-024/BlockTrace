export const LEVEL_3_CLUES = [
  {
    id: "url-bar",
    targetName: "Address Bar / URL",
    elementSelector: "url",
    icon: "🌐",
    title: "Domain & Hostname Inspection",
    inspectionDetail: {
      url: "http://campus-login-auth.xyz/verify-account?token=892348",
      threat: "CRITICAL: Insecure protocol + Rogue TLD",
      notes: "The official university portal is 'https://portal.campus.edu'. This site uses unencrypted HTTP and a suspicious '.xyz' Top-Level Domain registered through an offshore anonymity proxy."
    },
    educationalTip: "Always verify the domain suffix (.edu vs .xyz) and never enter confidential data over unencrypted HTTP!"
  },
  {
    id: "padlock",
    targetName: "Security Padlock Icon",
    elementSelector: "ssl",
    icon: "🔓",
    title: "SSL/TLS Certificate Status",
    inspectionDetail: {
      status: "NOT SECURE / NO ENCRYPTION",
      threat: "WARNING: Missing Valid HTTPS Certificate",
      notes: "The connection to this server is unencrypted. Anyone on the local Wi-Fi network (or router) can eavesdrop on usernames and passwords sent in plaintext."
    },
    educationalTip: "Legitimate institutional portals always enforce valid, trusted HTTPS encryption with a closed padlock icon."
  },
  {
    id: "urgent-popup",
    targetName: "Panic Timer Banner",
    elementSelector: "popup",
    icon: "⚠️",
    title: "Psychological Manipulation & Social Engineering",
    inspectionDetail: {
      bannerText: "⚠️ ATTENTION: Your Student Account Will Be Permanently Terminated In 14:59 Minutes!",
      threat: "HIGH: Fabricated Urgency Scam",
      notes: "Attackers manufacture artificial time limits to bypass victims' critical thinking and trigger fear-driven compliance."
    },
    educationalTip: "Official organizations almost never give you a 15-minute countdown ultimatum to enter your password."
  },
  {
    id: "login-form",
    targetName: "Credential Form Fields",
    elementSelector: "form",
    icon: "📝",
    title: "Overreaching Credential Harvesting",
    inspectionDetail: {
      fields: "Student ID, Password, and Personal Security PIN",
      threat: "HIGH: Data Exfiltration Hook",
      notes: "The form transmits data directly to an unmonitored external server script: 'POST http://194.38.20.14:8080/collect.php'."
    },
    educationalTip: "Look at what is requested. Official SSO systems do not ask for your raw PIN alongside your password in this manner."
  },
  {
    id: "footer-cert",
    targetName: "Footer & Legal Infrastructure",
    elementSelector: "footer",
    icon: "📋",
    title: "Certificate & Domain Registration Telemetry",
    inspectionDetail: {
      status: "UNREGISTERED SHELL DOMAIN",
      threat: "HIGH: Offshore Anonymous Proxy",
      notes: "WHOIS telemetry indicates domain 'campus-login-auth.xyz' was registered only 2 hours prior to the dispatch. All copyright and privacy links are non-functional dead anchors."
    },
    educationalTip: "Newly registered domains paired with non-functional corporate links strongly indicate temporary phishing infrastructure."
  }
];

export const LEVEL_3_QUIZ = {
  question: "Based on your forensic investigation, which is the most definitive technical indicator that this website is fraudulent?",
  options: [
    {
      id: "opt-1",
      text: "The website uses dark cyber styling",
      isCorrect: false,
      feedback: "Styling and color themes are aesthetic choices, not a technical indicator of legitimacy or fraud."
    },
    {
      id: "opt-2",
      text: "It lacks HTTPS encryption and uses an unverified '.xyz' domain instead of official '.edu'",
      isCorrect: true,
      feedback: "Spot on! The combination of an unencrypted HTTP connection and a rogue '.xyz' hostname proves this server is an imposter clone."
    },
    {
      id: "opt-3",
      text: "The web page loads too quickly",
      isCorrect: false,
      feedback: "Page load speed does not indicate whether a website is a phishing honeypot or legitimate."
    },
    {
      id: "opt-4",
      text: "The font size of the header is too large",
      isCorrect: false,
      feedback: "Font size is just a design element, not an indicator of cryptographic legitimacy."
    }
  ],
  clueDiscovered: {
    id: "clue-3",
    number: 3,
    title: "Rogue Phishing Infrastructure",
    tag: "LEVEL 3 EVIDENCE",
    icon: "🌐",
    summary: "Rogue domain 'campus-login-auth.xyz' resolves to IP 194.38.20.14 on port 8080.",
    detail: "Server logs confirm the rogue website was registered only 2 hours prior to the attack, communicating with an exfiltration collector endpoint running on local Wi-Fi port 8080."
  }
};
