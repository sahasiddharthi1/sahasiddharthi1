<div align="center">

<img src="https://raw.githubusercontent.com/sahasiddharthi1/sahasiddharthi1/main/circuit-hero.svg" width="900" />

<br/><br/>

<a href="https://sid-portfolio-snowy.vercel.app/"><img src="https://img.shields.io/badge/PORTFOLIO-040711?style=for-the-badge&logo=vercel&logoColor=00E5FF" /></a>&nbsp;<a href="https://www.linkedin.com/in/siddharthi-saha-269280259/"><img src="https://img.shields.io/badge/LINKEDIN-040711?style=for-the-badge&logo=linkedin&logoColor=00E5FF" /></a>&nbsp;<a href="https://github.com/sahasiddharthi1"><img src="https://img.shields.io/badge/GITHUB-040711?style=for-the-badge&logo=github&logoColor=00E5FF" /></a>&nbsp;<a href="mailto:sahasiddharthi0@gmail.com"><img src="https://img.shields.io/badge/EMAIL-040711?style=for-the-badge&logo=gmail&logoColor=00E5FF" /></a>

<br/><br/>

<img src="https://komarev.com/ghpvc/?username=sahasiddharthi1&color=00E5FF&style=for-the-badge&label=PROFILE+VIEWS" />

<br/><br/>

<img src="https://raw.githubusercontent.com/sahasiddharthi1/sahasiddharthi1/main/tech-ticker.svg" width="900" />

</div>

<br/>

> Full-Stack Developer building enterprise agentic AI platforms, distributed Go systems, and high-performance React UIs at LTIMindtree — plus from-scratch systems work (a Kafka-inspired broker, a blockchain SaaS) and applied AI agents outside of it.

<br/>

<div align="center">
  <img src="https://raw.githubusercontent.com/sahasiddharthi1/sahasiddharthi1/main/waveform-stats.svg" width="900" />
</div>

<sub align="center">

every commit plotted by day and local hour (IST) — night owl or early riser, at a glance. Last 15 days shown above.

</sub>

<details>
<summary>see the 15 days before that</summary>
<br/>

<div align="center">
  <img src="https://raw.githubusercontent.com/sahasiddharthi1/sahasiddharthi1/main/waveform-stats-earlier-1.svg" width="900" />
</div>

</details>

<br/>

*Live view count above updates on every real page load — that's a genuinely real-time counter, not something on the daily refresh cycle below.*

<div align="center">

[Experience](#-experience) · [Systems & Production](#-systems--production-projects) · [AI Agents](#-ai-agent-projects) · [Stack](#-stack) · [Education](#-education--credentials) · [Signal](#-signal)

</div>

## ▸ experience

**Software Developer — Backend / Frontend** · LTIMindtree, Blueverse Platform · Hyderabad, India
`Jul 2025 — Present`

<details>
<summary>expand full role</summary>
<br/>

| | | |
|---|---|---|
| 🏗️ | **Agentic AI platform** | Architected the frontend for Blueverse Agentic Foundry, an enterprise platform to build, deploy and govern autonomous AI agents — sole UI architect on the core Foundry module, serving 500+ internal users. |
| ⚡ | **Agent builder** | Node-based drag-and-drop workflow UI in React Flow + Redux Toolkit (nested nodes, triggers, actions) — 40% faster agent creation, 30% less onboarding friction. |
| 📇 | **Marketplace** | react-window virtualisation + memoised filters across a 1,000+ item catalogue — 60% faster TTI, 70% fewer re-render cycles. |
| 📝 | **Form engine** | JSON-schema-driven config form via React Hook Form with runtime LLM-parameter validation — 25% fewer submission errors. |
| ☁️ | **Cloud integration** | REST/GraphQL into AWS Bedrock & internal vector DBs, optimistic UI for streaming agent responses — 35% lower perceived latency. |
| ✅ | **Quality & leadership** | 85%+ Jest coverage across UI repos; Sprint Lead running standups and delivery across 3 sprint cycles. |

</details>

<br/>

## ▸ systems & production projects

**⟨ LedgerForge ⟩** — Blockchain SaaS Platform
![Go](https://img.shields.io/badge/Go-040711?style=flat-square&logo=go&logoColor=00E5FF) ![ECDSA](https://img.shields.io/badge/ECDSA-040711?style=flat-square) ![PoW](https://img.shields.io/badge/PoW-040711?style=flat-square) ![WebSockets](https://img.shields.io/badge/WebSockets-040711?style=flat-square) ![JWT](https://img.shields.io/badge/JWT-040711?style=flat-square&logo=jsonwebtokens&logoColor=00E5FF) ![MongoDB](https://img.shields.io/badge/MongoDB-040711?style=flat-square&logo=mongodb&logoColor=00E5FF) ![React](https://img.shields.io/badge/React-040711?style=flat-square&logo=react&logoColor=00E5FF) ![Next.js](https://img.shields.io/badge/Next.js-040711?style=flat-square&logo=nextdotjs&logoColor=00E5FF)

<details>
<summary>expand</summary>
<br/>

Production-oriented blockchain SaaS end-to-end: Go chain engine (SHA-256, Proof-of-Work, atomic persistence), ECDSA (P-256) wallets, signed transactions, fee-priority mempool, auto-mining, WebSocket broadcasting, Argon2id/JWT auth — 12 REST/WebSocket endpoints across 13 packages, 2,447 LOC. Shipped alongside a 9-route React/TypeScript operator dashboard, a MongoDB repository layer with file-based fallback, and an SEO-optimised Next.js marketing site with SSR and JSON-LD.

</details>

**⟨ GoKafka ⟩** — Kafka-Inspired Distributed Message Broker · [repo ↗](https://github.com/sahasiddharthi1/go_kafka)
![Go](https://img.shields.io/badge/Go-040711?style=flat-square&logo=go&logoColor=00E5FF) ![TCP](https://img.shields.io/badge/TCP-040711?style=flat-square) ![Gin](https://img.shields.io/badge/Gin-040711?style=flat-square) ![Goroutines](https://img.shields.io/badge/Goroutines-040711?style=flat-square) ![Mutexes](https://img.shields.io/badge/Mutexes-040711?style=flat-square) ![Binary I/O](https://img.shields.io/badge/Binary_I%2FO-040711?style=flat-square) ![React](https://img.shields.io/badge/React-040711?style=flat-square&logo=react&logoColor=00E5FF)

<details>
<summary>expand</summary>
<br/>

Built from scratch in Go, zero external dependencies — custom TCP binary framing, append-only segment log (`.log` + `.index`), FNV hash partition routing, persistent consumer group offsets. Async batch producer sustaining 2,000+ msg/sec, leader/follower replication with ISR tracking, at-least-once delivery, Dead Letter Queue with full replay. Gin REST API with Swagger UI, 90%+ core-path test coverage, an interactive CLI checker, and a React dashboard for produce/consume/stress-test & DLQ inspection.

</details>

**⟨ ShopFlow ⟩** — Distributed E-Commerce Backend + Custom APM · [repo ↗](https://github.com/sahasiddharthi1/djp)
![Node.js](https://img.shields.io/badge/Node.js-040711?style=flat-square&logo=nodedotjs&logoColor=00E5FF) ![Express](https://img.shields.io/badge/Express-040711?style=flat-square&logo=express&logoColor=00E5FF) ![AsyncLocalStorage](https://img.shields.io/badge/AsyncLocalStorage-040711?style=flat-square) ![JWT](https://img.shields.io/badge/JWT-040711?style=flat-square&logo=jsonwebtokens&logoColor=00E5FF) ![DLQ](https://img.shields.io/badge/DLQ-040711?style=flat-square)

<details>
<summary>expand</summary>
<br/>

Partitioned in-memory queue (8 lanes) with autoscaling workers processing 20,000+ jobs/min; JWT auth, rate limiting, HTTP 429 backpressure. Exactly-once execution via dedup IDs and exponential backoff (1s→2s→4s) plus a Dead Letter Queue. Custom APM built on AsyncLocalStorage for async trace propagation, flamegraphs, and p50/p95/p99 latency tracking at under 2% overhead.

</details>

**⟨ TradeStream ⟩** — High-Frequency Crypto Dashboard
![React](https://img.shields.io/badge/React-040711?style=flat-square&logo=react&logoColor=00E5FF) ![WebSockets](https://img.shields.io/badge/WebSockets-040711?style=flat-square) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-040711?style=flat-square&logo=tailwindcss&logoColor=00E5FF) ![Web Workers](https://img.shields.io/badge/Web_Workers-040711?style=flat-square) ![Chart.js](https://img.shields.io/badge/Chart.js-040711?style=flat-square&logo=chartdotjs&logoColor=00E5FF)

<details>
<summary>expand</summary>
<br/>

Real-time dashboard for 50+ concurrent crypto assets with sub-second WebSocket updates, Chart.js candlestick/line charts, fully responsive Tailwind layouts, custom ticker-subscription hooks. Fixed a stale-closure WebSocket bug via `useRef`, offloaded heavy transforms to a Web Worker to keep the main thread free, and throttled UI commits to 60fps to prevent React tearing during high-volatility spikes.

</details>

<br/>

## ▸ ai agent projects

**⟨ CarouDeal ⟩** — 3-tier buy-side shopping agent
![JavaScript](https://img.shields.io/badge/JavaScript-040711?style=flat-square&logo=javascript&logoColor=00E5FF) ![Go](https://img.shields.io/badge/Go-040711?style=flat-square&logo=go&logoColor=00E5FF) ![Python](https://img.shields.io/badge/Python-040711?style=flat-square&logo=python&logoColor=00E5FF) ![LangGraph](https://img.shields.io/badge/LangGraph-040711?style=flat-square)

<details>
<summary>expand</summary>
<br/>

Vanilla-JS UI → Go REST API → Python LangGraph 5-node state machine (understand / search / analyze / safeguard / recommend); deterministic scoring engine and a rule-based scam detector for recommerce marketplaces.

</details>

**⟨ Free Voice Agent ⟩** — browser-native voice agent
![Web Speech API](https://img.shields.io/badge/Web_Speech_API-040711?style=flat-square) ![Ollama](https://img.shields.io/badge/Ollama-040711?style=flat-square) ![Gemini](https://img.shields.io/badge/Gemini-040711?style=flat-square) ![RAG](https://img.shields.io/badge/RAG-040711?style=flat-square)

<details>
<summary>expand</summary>
<br/>

Web Speech API STT/TTS on a from-scratch `BaseLLM` abstraction — one `complete()` contract swapping mock/Ollama/Gemini backends via dependency inversion, each returning a typed `LLMResult`. RAG-grounded, confidence-gated warm handoff with full transcript, consent/DNC compliance built in.

</details>

**⟨ CodeGraph Agent ⟩** — natural-language code exploration client
![Python](https://img.shields.io/badge/Python-040711?style=flat-square&logo=python&logoColor=00E5FF) ![JSON-RPC](https://img.shields.io/badge/JSON--RPC-040711?style=flat-square)

<details>
<summary>expand</summary>
<br/>

Python client wrapping `codegraph serve mcp` over JSON-RPC, with CLI and REPL modes.

</details>

<br/>

## ▸ stack

**Languages**
![JavaScript](https://img.shields.io/badge/JavaScript-040711?style=flat-square&logo=javascript&logoColor=00E5FF) ![TypeScript](https://img.shields.io/badge/TypeScript-040711?style=flat-square&logo=typescript&logoColor=00E5FF) ![Go](https://img.shields.io/badge/Go-040711?style=flat-square&logo=go&logoColor=00E5FF) ![Python](https://img.shields.io/badge/Python-040711?style=flat-square&logo=python&logoColor=00E5FF) ![C++](https://img.shields.io/badge/C%2B%2B-040711?style=flat-square&logo=cplusplus&logoColor=00E5FF) ![HTML5](https://img.shields.io/badge/HTML5-040711?style=flat-square&logo=html5&logoColor=00E5FF) ![CSS3](https://img.shields.io/badge/CSS3-040711?style=flat-square&logo=css3&logoColor=00E5FF)

**Frontend**
![React](https://img.shields.io/badge/React-040711?style=flat-square&logo=react&logoColor=00E5FF) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-040711?style=flat-square&logo=redux&logoColor=00E5FF) ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-040711?style=flat-square&logo=reacthookform&logoColor=00E5FF) ![Material UI](https://img.shields.io/badge/Material_UI-040711?style=flat-square&logo=mui&logoColor=00E5FF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-040711?style=flat-square&logo=tailwindcss&logoColor=00E5FF) ![Chart.js](https://img.shields.io/badge/Chart.js-040711?style=flat-square&logo=chartdotjs&logoColor=00E5FF)

**Backend**
![Node.js](https://img.shields.io/badge/Node.js-040711?style=flat-square&logo=nodedotjs&logoColor=00E5FF) ![Express](https://img.shields.io/badge/Express-040711?style=flat-square&logo=express&logoColor=00E5FF) ![GraphQL](https://img.shields.io/badge/GraphQL-040711?style=flat-square&logo=graphql&logoColor=00E5FF) ![WebSockets](https://img.shields.io/badge/WebSockets-040711?style=flat-square) ![Gin](https://img.shields.io/badge/Gin-040711?style=flat-square) ![JSON-RPC](https://img.shields.io/badge/JSON--RPC-040711?style=flat-square)

**Cloud & AI**
![AWS Bedrock](https://img.shields.io/badge/AWS_Bedrock-040711?style=flat-square&logo=amazonaws&logoColor=00E5FF) ![Azure OpenAI](https://img.shields.io/badge/Azure_OpenAI-040711?style=flat-square&logo=microsoftazure&logoColor=00E5FF) ![LangGraph](https://img.shields.io/badge/LangGraph-040711?style=flat-square) ![RAG](https://img.shields.io/badge/RAG-040711?style=flat-square) ![MCP](https://img.shields.io/badge/MCP-040711?style=flat-square) ![Docker](https://img.shields.io/badge/Docker-040711?style=flat-square&logo=docker&logoColor=00E5FF)

**Tools**
![Git](https://img.shields.io/badge/Git-040711?style=flat-square&logo=git&logoColor=00E5FF) ![Postman](https://img.shields.io/badge/Postman-040711?style=flat-square&logo=postman&logoColor=00E5FF) ![Linux](https://img.shields.io/badge/Linux-040711?style=flat-square&logo=linux&logoColor=00E5FF) ![MySQL](https://img.shields.io/badge/MySQL-040711?style=flat-square&logo=mysql&logoColor=00E5FF)

<br/>

## ▸ education & credentials

🎓 **B.Tech, Electrical Engineering** — IIT (ISM) Dhanbad · `May 2021 – May 2025`
DSA · Operating Systems · Database Management · Web Technologies

🏅 **Certifications:** Azure AI · CSS · Java · C++ · Analytical Thinking
🧩 **Competitive programming:** 80%+ solve rate on LeetCode and GeeksforGeeks

<br/>

## ▸ signal

<div align="center">
  <img height="165" src="https://github-readme-stats.vercel.app/api?username=sahasiddharthi1&show_icons=true&hide_border=true&count_private=true&include_all_commits=true&bg_color=040711&title_color=00E5FF&icon_color=00E5FF&text_color=d6f0ff" />
  &nbsp;&nbsp;
  <img height="165" src="https://github-readme-stats.vercel.app/api/top-langs/?username=sahasiddharthi1&layout=compact&hide_border=true&langs_count=6&bg_color=040711&title_color=00E5FF&text_color=d6f0ff" />
</div>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/wakatime?username=sahasiddharthi1&api_domain=wakapi.dev&hide_border=true&bg_color=040711&title_color=00E5FF&icon_color=00E5FF&text_color=d6f0ff&custom_title=Coding+Stats+(Wakapi)&layout=compact" />
</div>

<div align="center">
  <img src="https://streak-stats.demolab.com/?user=sahasiddharthi1&hide_border=true&background=040711&ring=00E5FF&fire=00E5FF&currStreakLabel=00E5FF&sideLabels=d6f0ff&currStreakNum=d6f0ff&sideNums=d6f0ff&dates=3a5570" />
</div>

<br/>

<div align="center">
  <img src="https://isometric-contributions-spectrewolf8.onrender.com/api/graph?username=sahasiddharthi1&theme=github&stats=true&width=1000&height=600" alt="GitHub Contributions" />
</div>

<sub align="center">

the same year of contributions as the calendar above, as an isometric skyline — height per day is the real contribution count, regenerated on the same refresh cycle.

</sub>
