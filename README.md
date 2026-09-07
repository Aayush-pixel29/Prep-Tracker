# ⚡ PrepTracker: Jarvis-Class Career Mastery & Preparation Ecosystem

> **Master DSA, System Design, AI/ML Pipelines & Senior Engineer Trade-offs — Powered by Habit Gamification, Neural Focus Audio, Live Market Intelligence, and Automated LeetCode Tracking.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen.svg)]()
[![Electron](https://img.shields.io/badge/Electron-28.0-47848F.svg)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB.svg)](https://react.dev/)
[![SQLite](https://img.shields.io/badge/Database-SQLite3-003B57.svg)](https://www.sqlite.org/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension%20Manifest%20V3-yellow.svg)]()

---

## 🌟 Overview
Preparing for Tier-1 Tech (Google, Meta, OpenAI, Anthropic, Stripe, Amazon) usually means juggling 10 different tabs: LeetCode, NeetCode, YouTube tutorials, System Design blogs, tech news, and Pomodoro timers. Most engineers drop off due to lack of consistency, overwhelming topic lists, and disconnected tools.

**PrepTracker unifies the entire career preparation pipeline into an offline-first desktop OS and companion Chrome Extension.**

```
Prep-Tracker/
├── prep-tracker/          # Electron + React + SQLite3 Desktop Application
│   ├── electron/          # Main Process, IPC Handlers, SQLite Local DB Engine
│   ├── server/            # Express Local REST API Engine (Port 4242)
│   ├── src/               # React 18 UI (Cyber-Linear Design System)
│   │   ├── components/    # Arc-Reactor Focus Studio, Sidebar HUD, Full-Screen Topic Studio
│   │   ├── pages/         # Dashboard, Practice Arena, Tech Radar, Senior Mindset, Roadmap
│   │   └── utils/         # Gamification Context, 5-Language DB, Role Roadmaps
│   └── LINKEDIN_LAUNCH_POST.md  # Viral Launch Kit & Recruiter Attraction Guide
└── prep-scraper/          # Chrome Extension (Manifest V3)
    ├── content-scripts/   # Zero-friction auto-logging from LeetCode problem submissions
    └── popup/             # Quick stats & streak monitor in browser toolbar
```

---

## 🚀 Key Features

### 1. 🛡️ Iron Man / JARVIS Gamification Engine
- **XP Progression System**: Earn XP for every mastered topic (+100 XP), solved LeetCode problem (+100 XP), deep work session (+75 XP), and interview script review (+50 XP).
- **Suit Evolution Tiers**:
  - `Mark I (Apprentice)` — Lv 1-5
  - `Mark VII (Associate Engineer)` — Lv 6-14
  - `Mark XLII (Senior Engineer)` — Lv 15-29
  - `Mark LXXXV (Staff Architect)` — Lv 30-49
  - `JARVIS Protocol (Principal Master)` — Lv 50+
- **Daily Protocol Quests**: 24-hour resetting challenge board with instant rewards.
- **Hall of Achievements**: 8 unlockable badges with rarity tiers and glow animations.

### 2. 🧘 Deep Work Studio & Neural Soundscapes
- **Arc-Reactor Circular Pomodoro**: 25m Focus Flow & 5m Recharge modes.
- **Web Audio API Native Soundscapes**:
  - `🧠 40Hz Gamma Wave`: Binaural beat tuned for cognitive focus and dopamine retention.
  - `🚀 Deep Space Engine`: Low-frequency rumble for masking distractions.
  - `🌧️ Cyber Warm Rain`: Pink/brown noise synthesis for calm flow states.

### 3. 🗺️ Multi-Language Roadmap & Full-Screen Studio
- **Role-Specific Tracks**: AI Engineer, Machine Learning Engineer, Software Developer, Mobile App Developer, Cloud/DevOps Architect.
- **5-Language Synchronized Solutions**: Switch seamlessly between **Python, Java, C++, C, and JavaScript** for every single DSA topic.
- **Full-Screen Focus Mode (`⛶`)**: Expand the study canvas to eliminate all visual distractions.
- **Interactive Step-by-Step Traces**: Visual pointer tracking and state mutation tables for canonical interview problems (*Two Sum*, *Valid Anagram*, *Reverse Linked List*).
- **Embedded Curated Video Lessons**: High-yield YouTube lectures from NeetCode, Striver, freeCodeCamp, and Tech With Tim.

### 4. ⚡ Unified Practice Arena (NeetCode 150 + Striver SDE + Blind 75)
- Search across 30+ canonical problems by sheet, difficulty, topic, and **FAANG company tags** (Google, Meta, Apple, Amazon, Uber).
- 1-click external solver launch delegating directly to your default browser.
- Local persistent progress tracking with real-time completion percentages.

### 5. 📡 Live Tech Radar & 2026 Market Intelligence
- **AI & LLM Frontier**: DeepSeek V3/R1 architecture, MoE routing, LangGraph multi-agent loops, vLLM PagedAttention, and ColBERT/Hybrid RAG.
- **High-Performance Systems**: Rust async backends (Tokio/Axum), Kafka/Redpanda distributed logs, DuckDB in-process OLAP, and eBPF kernel tracing.
- **2026 Hiring Playbook**: Pattern-based DSA recognition, HLD/LLD convergence, and AI collaboration assessments.

### 6. 🧠 Staff Engineer Mindset & 60-Second Interview Power Scripts
- **Architectural Trade-Off Matrices**: First-principles frameworks for CAP/PACELC, Polyglot Persistence (SQL vs NoSQL vs NewSQL), Cache-Aside vs Write-Behind, and Modular Monoliths vs Microservices.
- **Word-for-Word Speaking Scripts**: 1-click copyable executive scripts for STAR behavioral questions, database scaling, and technical conflict resolution.

### 7. 🔌 Chrome Extension LeetCode Auto-Scraper
- Automatically detects successful submissions on `leetcode.com/problems/*` and syncs problem title, difficulty, and timestamp directly to the local desktop database via REST API.

---

## 🏗️ Architecture & Tech Stack

```mermaid
graph TD
    A["Electron Main Process (Node.js)"] -->|"IPC Bridge & safeExternalOpen"| B["Default Web Browser"]
    A -->|"Express REST API (Port 4242)"| C["SQLite Database (prep_tracker.db)"]
    D["React 18 + Vite Frontend"] -->|"REST Calls"| C
    D -->|"Web Audio API"| E["Binaural & Ambient Sound Engine"]
    D -->|"State Engine"| F["RoleProvider & GamificationProvider"]
    D -->|"LocalStorage"| G["XP, Badges & Quests Cache"]
    H["Chrome Extension Scraper"] -->|"POST /api/submissions"| C
```

---

## 📦 Quick Start & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Aayush-pixel29/Prep-Tracker.git
cd Prep-Tracker
```

### 2. Run Desktop App
```bash
cd prep-tracker
npm install
npm run dev
```

### 3. Build Standalone Desktop Installer (.exe)
```bash
cd prep-tracker
npm run build
```
The compiled installer will be in `prep-tracker/dist-electron/PrepTracker Setup 1.0.0.exe`.

### 4. Load Chrome Extension
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Toggle on **Developer mode** in the top right.
3. Click **Load unpacked** and select the `prep-scraper/` directory.

---

## 🤝 Contributing
Contributions, bug reports, and feature requests are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
