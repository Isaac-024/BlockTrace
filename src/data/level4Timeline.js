export const LEVEL_4_CARDS = [
  {
    id: "card-phishing",
    title: "Phishing Email",
    stepNumberCorrect: 1,
    icon: "📧",
    color: "from-blue-600 to-indigo-700",
    border: "border-blue-400",
    badge: "STAGE 1",
    timestamp: "14:15 UTC",
    description: "The cyber attacker distributes deceitful emails containing deceptive lures and urgent calls to action.",
    technicalDetail: "Initial Access: Social engineering payload delivered to targeted student inboxes."
  },
  {
    id: "card-link",
    title: "Link Clicked",
    stepNumberCorrect: 2,
    icon: "🔗",
    color: "from-cyan-600 to-teal-700",
    border: "border-cyan-400",
    badge: "STAGE 2",
    timestamp: "14:19 UTC",
    description: "An unsuspecting student falls for the urgent lure and navigates to the malicious clone website.",
    technicalDetail: "Execution: Victim clicks hyperlink pointing to rogue domain 'campus-login-auth.xyz'."
  },
  {
    id: "card-creds",
    title: "Credentials Stolen",
    stepNumberCorrect: 3,
    icon: "🔑",
    color: "from-amber-600 to-orange-700",
    border: "border-amber-400",
    badge: "STAGE 3",
    timestamp: "14:21 UTC",
    description: "Victim types their username and password into the imposter portal, sending credentials to the hacker's server.",
    technicalDetail: "Credential Harvesting: Form POST sends plaintext password directly to attacker IP 194.38.20.14."
  },
  {
    id: "card-access",
    title: "Account Access",
    stepNumberCorrect: 4,
    icon: "💻",
    color: "from-rose-600 to-red-700",
    border: "border-rose-400",
    badge: "STAGE 4",
    timestamp: "14:22 UTC",
    description: "The hacker uses harvested credentials to bypass perimeter defenses and infiltrate the core campus database.",
    technicalDetail: "Lateral Movement & Exfiltration: Unauthorized session initiated from rogue device on local Wi-Fi."
  }
];

export const LEVEL_4_CLUE = {
  id: "clue-4",
  number: 4,
  title: "Incident Timeline & Vector",
  tag: "LEVEL 4 EVIDENCE",
  icon: "🕵️",
  summary: "Attack executed via 4-stage kill chain completed at 14:22 UTC.",
  detail: "The attack followed the classic MITRE ATT&CK framework: Phishing (Initial Access) -> Malicious Link -> Credential Exfiltration -> Network Intrusion at 14:22 UTC from a laptop connected to the Cafeteria Access Point."
};
