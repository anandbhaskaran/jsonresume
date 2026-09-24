# Neho — Application Answers

## Tell us about something relevant that you built and is running in production.

**The AI outbound system at LumApps.** Live today, used by reps every day. Reports directly to the CTO/C-level.

**Discovery first.** I spent the first weeks sitting with sales reps, RevOps, and product to map the actual outbound workflow. Where the hours went, where the pain was, where AI would help and where it would just be in the way. Rep sign-off before a line of production code. The single insight that shaped everything: reps don't need an agent that writes emails, they need an agent that *decides who to reach out to and drafts something worth editing*. Everything else flowed from that.

**What I built.**

- **Multi-agent architecture** on Python, LangGraph, and Google ADK over GCP Vertex AI. ReAct + self-reflection + hierarchical delegation, each agent scoped to one job. Model is Gemini via Vertex plus OpenAI for specific tasks.
- **MCP layer over our domain APIs.** Thin, well-designed tool wrappers the agents act through: Salesforce, HubSpot, Pendo, transcripts, product usage. I was the first and most demanding consumer of our own API-first architecture, and that shaped what the domain teams built.
- **AI Brain, a temporal knowledge graph on Graphiti and Neo4j.** Unifies 5+ silos into one time-aware memory every agent reads and writes. Every fact has a validity window. RAG grounded to a single source of truth with a clock on it. Hallucinations dropped.
- **Streaming UI over AG-UI.** Reps watch the agent pick a prospect, pull context, draft, self-check, present. No refresh, no spinner, the reasoning is the interface. Draft-before-send by default, rep stays in control.
- **Reliability layer built in from day one.** Eval pipelines that reflect real usage, LangSmith tracing across model/orchestration/infra, cost-per-request telemetry, verification loops, refusal patterns for out-of-scope requests, fallback paths, and on-call.

**Outcomes (measured, not claimed).**

- 2x open rates.
- 2x approved opportunities.
- 2 to 3 hours saved per rep per day.
- Forecast $4M in approved opportunities per quarter, $1M in quarterly revenue at 25% conversion.
- First production multi-agent system at LumApps, now the reference architecture other teams build on.

**Why I'm proudest of it.** Most agents demo well and fall over in production. This one runs against Salesforce and HubSpot every day, writes back into systems of record, and hasn't lost customer trust, because guardrails and verification loops were design constraints, not afterthoughts.

Happy to walk through it live: [2-min demo](https://drive.google.com/file/d/1MUokeVsz9u9cIn-WN4aWgsEHaelcEBsQ/view?usp=sharing).
