# ElevenLabs — Application Answers

## What makes you excited about the ElevenLabs mission?

Voice is the interface humans reach for first, and it is the one AI has under-served for years. ElevenLabs is closing that gap: voice quality good enough that people forget they are listening to a machine, and language coverage that lets the same story reach everyone, not just the English-speaking half of the internet.

That maps to two things I care about in my own work. First, taste: I have shipped enough AI products to know the difference between a demo that impresses once and a system that people trust every day, and ElevenLabs is on the trust side of that line. Second, multilingual reach: at Proplab I built listings that publish in multiple languages from one workflow, and at SwissNRI I built a compliance assistant for a bicultural audience. Language barriers are a real problem for real people, and ElevenLabs removes them at a scale I could not touch alone.

The bar you have set on model quality, safety, and shipping speed is the bar I want to work at.


## Tell us about a hard problem in your past, and the recent achievement you are most proud of

Same story. The AI outbound system I built and shipped at LumApps.

**The problem.** Sales reps at LumApps were burning 3+ hours a day on manual outbound: pulling context from Salesforce, HubSpot, Pendo, and transcripts, deciding which prospect to reach out to, drafting the email, then repeating for the next one. Every naive "just wire GPT to Salesforce" prototype had the same failure mode: the agent looked smart in a demo and made confident, wrong decisions in production. Wrong title, wrong account, stale opportunity stage. One bad email to a real customer and the whole system loses trust and gets turned off.

The hard part was not the LLM call. It was building a system that could act on real customers, every day, without lying and without needing a human to babysit every step.

**What I built.**

- **Multi-agent architecture on LangGraph and Google ADK over GCP Vertex AI**, with tools exposed over MCP and agent state streamed to the UI over AG-UI. ReAct reasoning, self-reflection, hierarchical delegation, so each agent has a scoped job instead of one god-agent trying to do everything.
- **AI Brain, a temporal knowledge graph on Graphiti and Neo4j.** Unifies 5+ silos (Salesforce, HubSpot, Pendo, transcripts, product usage) into one time-aware memory every agent reads and writes. Every fact has a validity window, not just a value; a freshness layer flags stale data before it reaches the agent's prompt. This is what stopped the "confident, wrong" failure mode: retrieval is grounded to a single source of truth with a clock on it.
- **The reliability layer.** Eval pipelines that reflect real usage, LangSmith tracing across model, orchestration, and infra, cost-per-request telemetry, verification loops, human-in-the-loop draft-before-send, fallback paths, on-call. Built in from day one, not bolted on after the first incident.

**The outcome.** 2x open rates. 2x approved opportunities. 2 to 3 hours saved per rep per day. Forecast $4M in approved opportunities per quarter, $1M in quarterly revenue at 25% conversion. First production multi-agent system at LumApps, now the reference architecture the rest of the org builds on top of. I report directly to C-level on the outcomes.

The part I am proudest of is that it is *reliable*. Most agents demo well and fall over in production. This one runs against Salesforce and HubSpot every day, writes back into systems of record, and has not lost customer trust, because trust was a design constraint, not an afterthought.
