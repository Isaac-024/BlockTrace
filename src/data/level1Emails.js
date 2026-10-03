export const LEVEL_1_EMAILS = [
  {
    id: "email-1",
    senderName: "Campus IT Support Desk",
    senderEmail: "helpdesk@campus.edu",
    avatarColor: "bg-blue-600",
    subject: "Scheduled Network Maintenance: Sunday 02:00 AM",
    time: "09:15 AM",
    date: "Oct 3, 2026",
    isMalicious: false,
    preview: "Please be advised that the main library wireless APs will undergo standard firmware updates this Sunday...",
    fullBody: `Hello Students & Staff,

This is an automated notification regarding regular server maintenance scheduled for Sunday at 02:00 AM UTC. 

Key Details:
- Affected Services: Campus-Guest Wi-Fi and Library Printer queue
- Estimated downtime: 25 minutes
- No action or password submission is required on your part.

You can verify upcoming maintenance schedules anytime on the internal campus status board at https://status.campus.edu.

Best regards,
Campus IT Operations Team
helpdesk@campus.edu`,
    flags: {
      urgent: false,
      credentialRequest: false,
      suspiciousDomain: false,
      externalLink: false
    },
    educationalFeedback: "This email is legitimate. The sender domain matches @campus.edu, it explicitly states 'No password submission required', uses neutral non-urgent wording, and points to an official HTTPS domain."
  },
  {
    id: "email-2",
    senderName: "Campus Library Circulation",
    senderEmail: "library-notices@campus.edu",
    avatarColor: "bg-emerald-600",
    subject: "Reminder: Book Due in 3 Days (Cybersecurity Essentials)",
    time: "10:30 AM",
    date: "Oct 3, 2026",
    isMalicious: false,
    preview: "Your borrowed book 'Cybersecurity Essentials v4' is due on Oct 6. You can renew it via the student library portal...",
    fullBody: `Dear Student,

Friendly reminder that your checked-out resource is due soon:
- Item: Cybersecurity Essentials (ISBN: 978-0134)
- Due Date: October 6, 2026
- Location: Science & Tech Library Desk

If you wish to extend the loan, log into your regular campus student portal or visit the circulation desk in person.

Campus Library Services
library-notices@campus.edu`,
    flags: {
      urgent: false,
      credentialRequest: false,
      suspiciousDomain: false,
      externalLink: false
    },
    educationalFeedback: "This is a legitimate routine campus library notice. It has a verified .edu sender, no suspicious external links, and invites you to visit in person."
  },
  {
    id: "email-3",
    senderName: "GLOBAL CAREER OPPORTUNITIES",
    senderEmail: "internship-rewards@careers-portal-campus-verify.ru.cc",
    avatarColor: "bg-rose-600",
    subject: "🔥 URGENT: High-Paying Internship Selected ($4,500/Mo) — 2 HOURS TO CLAIM!",
    time: "11:45 AM",
    date: "Oct 3, 2026",
    isMalicious: true,
    preview: "Congratulations! You have been selected for a high-paying internship. Click here immediately to verify your account...",
    fullBody: `CONGRATULATIONS STUDENT!

You have been exclusively pre-selected for the 2026 Executive Cyber Technology Paid Internship Program ($4,500/month stipend + remote workstation allowance).

⚠️ CRITICAL NOTICE: Due to high demand, your spot will EXPIRE in exactly 2 HOURS if unconfirmed.

To secure your placement immediately:
1. Click the link below to verify your student credentials:
   >>> http://campus-login-auth.xyz/verify-account?token=892348 <<<
2. Enter your full student ID, current network password, and phone number to unlock the portal.

Failure to verify within 2 hours will result in automatic forfeiture to the next candidate!

Career Opportunity Dispatch
internship-rewards@careers-portal-campus-verify.ru.cc`,
    flags: {
      urgent: true,
      credentialRequest: true,
      suspiciousDomain: true,
      externalLink: true
    },
    redFlagsIdentified: [
      "Suspicious sender domain (.ru.cc instead of official university .edu domain)",
      "Manufactured artificial urgency ('EXPIRES IN 2 HOURS!') to panic the victim",
      "Too-good-to-be-true offer ($4,500/month unsolicited internship)",
      "Insecure unencrypted HTTP hyperlink (http://campus-login-auth.xyz)",
      "Direct request for student network password and credentials"
    ],
    clueDiscovered: {
      id: "clue-1",
      number: 1,
      title: "Phishing Attack Vector",
      tag: "LEVEL 1 EVIDENCE",
      icon: "📧",
      summary: "Found phishing lure from 'careers-portal-campus-verify.ru.cc' directing victims to fake portal 'campus-login-auth.xyz'.",
      detail: "The attacker used artificial panic (2-hour deadline) and financial lure ($4,500) to harvest student credentials via an unencrypted HTTP phishing page."
    },
    educationalFeedback: "EXCELLENT DETECTIVE WORK! You spotted the malicious phish. Notice the fake .ru.cc domain, the urgent 2-hour panic trigger, the fake HTTP login URL, and the blatant request for password credentials."
  },
  {
    id: "email-4",
    senderName: "Course Canvas Notifications",
    senderEmail: "notifications@instructure-canvas.edu",
    avatarColor: "bg-purple-600",
    subject: "New Grade Posted: Lab 03 - Voxel Network Protocols",
    time: "12:10 PM",
    date: "Oct 3, 2026",
    isMalicious: false,
    preview: "Prof. Vance has published your grade and feedback for Lab 03. Log into your LMS dashboard to view comments...",
    fullBody: `Hello,

A new score has been recorded for your course:
- Course: CS 240 — Cyber Systems & Protocols
- Assignment: Lab 03 - Voxel Network Protocols
- Score: 96 / 100

Instructor Feedback: "Great analysis on packet routing and voxel block structure."

View this in Canvas by opening your regular browser bookmark or mobile app.

Instructure Canvas System`,
    flags: {
      urgent: false,
      credentialRequest: false,
      suspiciousDomain: false,
      externalLink: false
    },
    educationalFeedback: "This is a legitimate LMS grading notification. It contains no links asking for passwords and instructs you to use your regular saved bookmark."
  },
  {
    id: "email-5",
    senderName: "Campus Dining & Cafeteria",
    senderEmail: "dining@campus.edu",
    avatarColor: "bg-amber-600",
    subject: "Weekly Chef Specials & Taco Tuesday Coupon",
    time: "01:05 PM",
    date: "Oct 3, 2026",
    isMalicious: false,
    preview: "Check out this week's meal specials at the Student Union food court. Show your student ID barcode at checkout...",
    fullBody: `Campus Dining Weekly Update:

Join us at the Student Union Food Court this week:
- Tuesday: Street Tacos with freshly made guacamole
- Thursday: Artisan Voxel Burger Bar
- Friday: Seafood & Veggie Noodle Bowls

Present your physical student ID card at the cashier station to apply your 10% meal plan discount.

Bon Appétit!
Campus Dining Services`,
    flags: {
      urgent: false,
      credentialRequest: false,
      suspiciousDomain: false,
      externalLink: false
    },
    educationalFeedback: "This is a standard cafeteria announcement. It uses normal communication and requires your physical student card at the cashier."
  }
];
