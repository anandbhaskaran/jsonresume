# Application Answers — Lead AI GTM Engineer, Hostaway

## Q. Describe an AI agent or agentic workflow you built end-to-end. What marketing or GTM problem did it solve, how did you architect it (models, APIs, orchestration, integrations), and what measurable impact did it have (time saved, cost reduced, or performance improved)?

At LumApps I built the AI outbound sales agent from a blank repo to live production.

**Problem.** Reps were spending 2 to 3 hours a day on manual account research, message writing, and CRM logging before they got to a single conversation. Outbound conversion was flat and pipeline forecasting was guesswork.

**Architecture.** A hierarchical multi-agent system in Python on GCP Vertex AI, orchestrated with LangGraph (with parts on Google ADK for its planner). A planner agent takes a rep's brief and decomposes it into subtasks: researcher, personalizer, drafter, verifier. Tools are exposed as MCP servers I authored: HubSpot, Salesforce and Pendo over REST + OAuth for CRM state, product usage and buying signals. Agent state streams to the UI over AG-UI. Models are Claude and Gemini, routed per subtask by cost and latency profile.

Data grounding is the moat. I designed AI Brain, a temporal knowledge graph on Graphiti and Neo4j that unifies Salesforce, HubSpot, Pendo, call transcripts and product usage into one time-aware source every agent reads and writes to. Event-driven ingest over Pub/Sub, a freshness layer that flags stale facts, write-back contracts per agent. That is what stops the agent from hallucinating an account into the wrong stage.

Quality and economics are instrumented from day one. Eval pipelines on LangSmith with golden datasets and LLM-as-judge scorers on every prompt change, cost-per-request telemetry, token budgets per agent role, and on-call for the whole thing. A verification loop and human-in-the-loop draft step keep the agent from shipping wrong actions to real prospects.

**Impact.** 2x open rates, 2x approved opportunities per rep, and 2 to 3 hours saved per rep per day. Forecast: $4M/quarter in approved opportunities; at 25% conversion, $1M/quarter in revenue. I reported the outcomes directly to C-level.

I also wrote it up publicly, "I Built an AI Outbound Agent. Here's What Actually Worked" on TowardsAI, so the architecture and lessons are traceable.
