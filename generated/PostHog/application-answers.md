# PostHog — Application Answer

**Anand Bhaskaran** · Zurich, Switzerland · anandbaskaran3193@gmail.com · +41 76 304 3193
anand-creations.com · linkedin.com/in/anandb3

---

## Have you built anything with LLMs, agents, MCPs, or context pipelines?

Yes. My daily job at LumApps is a multi-agent outbound system: LangGraph + Google ADK, tools over MCP servers I authored, agent state streamed to the UI over AG-UI, backed by AI Brain, a temporal knowledge graph on Graphiti/Neo4j that unifies Salesforce, HubSpot, Pendo and product usage into one time-aware context store. I also run 3 AI products I founded solo (SwissNRI, Proplab, PulseView) and write about the patterns publicly on my blog, Substack, and TowardsAI.

**Goal.** 2x outbound conversions without adding SDR headcount. Agents research an account, draft the next action, and hand a reviewed draft to the rep. Outcome so far: 2x open rates, 2x approved opportunities, 2 to 3 hours saved per rep per day, $1M forecast in quarterly revenue.

**What worked.**
- Temporal knowledge graph over vector-only RAG. GTM data is deeply time-dependent (deal stage, last touch, product signals) and a KG that knows *when* a fact was true beats one that just knows *what*.
- MCP over hand-rolled tool wrappers. Swappable, testable, easier to audit. Tool grants are per-agent so the credential physically cannot do what the agent is not allowed to do.
- Draft-before-send with human-in-the-loop on every external action. Preserved customer trust through model regressions.
- LangSmith tracing on every context decision. Debugging a regression became "read the run" instead of "guess and rerun".

**What failed.**
- First attempt was naive vector RAG over all CRM data. Agents got confused on stale or duplicate records and confidently referenced things that had already closed-lost. The temporal KG replaced it.
- One giant agent with the full tool inventory. Tool-selection accuracy collapsed at scale. Fixed with hierarchical delegation and smaller tool grants per sub-agent.
- Autonomous send. Tried it, killed it after two near-incidents. For outbound, HITL is not optional.

**What surprised me.**
- The evaluation suite was harder to design than the agent. "We reviewed a bunch of outputs and they looked good" is not evaluation. Building golden sets with behavioral assertions and judge rubrics forced me to write down what "good" actually means, and that was the real work.
- Adoption depended more on notification hygiene than model quality. Bundling updates beat streaming pings. Every ping spends trust; treat it like a budget.
- MCP made cross-agent tool sharing dramatically easier than I expected. Adding a new agent went from "wire up a new integration" to "point it at the existing tool server".
