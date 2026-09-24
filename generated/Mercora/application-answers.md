# Mercora — Application Answers

**Anand Bhaskaran** · Zurich, Switzerland · anandbaskaran3193@gmail.com · +41 76 304 3193
anand-creations.com · linkedin.com/in/anandb3

---

## Why Mercora

$8T of commodity trade running on spreadsheets and email is exactly the shape of problem I have spent the last year solving. At LumApps I built AI Brain, a temporal knowledge graph that unifies Salesforce, HubSpot, Pendo and product usage into one time-aware store agents read and write to. Same pattern Mercora needs: pull decisions out of scattered documents and into a real system of record.

Finance is where I choose to spend my own time outside work, not something I would need to learn to care about. I trade actively, and PulseView (one of the three AI products I founded on the side) was built for my own portfolio first: real-time AI agents that generate AND justify trading signals from technical and news data. I also co-founded SwissNRI, an AI-native cross-border tax and compliance platform, and spent 3+ years as Technical PM at Obermatt building financial analytics products. Physical commodity trade sits at the intersection of the two things I care about most: high-stakes finance and building the AI system of record a legacy category has never had.

"First engineering hire, no roadmap, talk to customers directly, own the architecture" is how I already work at Anand Creations. I want to do it inside a team going after $8T rather than solo.

---

## Most impressive thing I've built

The AI outbound system at LumApps. I own it end to end: agent architecture (LangGraph, Google ADK, tools over MCP, state streamed to the UI over AG-UI), AI Brain (the temporal knowledge graph grounding every agent), and the reliability layer (evals, LangSmith tracing, cost-per-request instrumentation, verification loops, fallback paths, on-call). Reports directly to C-level.

What changed: 2x open rates, 2x approved opportunities, 2 to 3 hours saved per rep per day. Forecast $4M in approved opportunities per quarter, $1M in quarterly revenue at 25% conversion. First production multi-agent system at LumApps, now the reference architecture the rest of the org builds on.

The part I am proudest of is that it is *reliable*. Most agents demo well and fall over in production. This one runs against Salesforce and HubSpot every day, writes back into systems of record, and has not lost customer trust because I built verification loops and human-in-the-loop checkpoints in from day one, not bolted on after the first incident.
