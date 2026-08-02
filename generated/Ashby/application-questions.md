# Ashby Application Questions

## Describe a role or project that brought out your best work. What enabled that?

Building the outbound AI system at LumApps is the clearest example. Anand Creations, my forward deployed practice, embeds me directly with the client team, no PM handoff, no committee. I ran the whole thing: talked to sales to find the real bottleneck, decided the agent architecture (LangGraph and Google ADK on GCP Vertex AI), built it, and instrumented it so I knew within weeks if it moved the number. Result: 2x open rates, 2x approved opportunities, 2 to 3 hours saved per rep per day, and a forecast of $1M in quarterly revenue.

The part that made it my best work: nobody asked me to fix the memory layer underneath. Every agent needed the same facts about a prospect, but those facts lived in five disconnected silos (Salesforce, HubSpot, Pendo, transcripts, product usage). I saw that was the real constraint on the system working at all, so I designed AI Brain, a temporal knowledge graph on Graphiti and Neo4j with event-driven ingest and a per-agent write-back contract, before anyone requested it.

What made this possible was the setup, not just the problem. I reported to C-level on outcomes, not to a PM on progress, so no process stood between deciding something was right and shipping it. That's the same reason a small, high-trust team beats a bigger one with more process: the person closest to the problem decides, and answers for the metric instead of the plan.

## Describe a time you challenged and changed a product request for better UX or business outcome.

At LumApps, the ask was "improve outbound." Users were the sales reps, and leadership wanted a lift in approved opportunities. The request came in as a tactical one and as a business problem.

Sitting with reps during discovery, I saw the real bottleneck wasn't messaging, it was time. Every rep spent hours manually pulling account context from five disconnected tools (Salesforce, HubSpot, Pendo, call transcripts, product usage) before writing a single email. Better copy on top of that process doesn't scale; it just makes each slow email slightly better. The actual fix was systemic: give every rep, and every future agent, one shared, always-current view of the account.

I made the case with the time math, not a pitch: hours lost per rep per day to manual research directly capped how many accounts they could touch. That reframed the ask from a copy problem to a data and process problem, and because I reported to C-level on outcomes rather than a PM on a spec, there was no gate to get through, just the numbers.

What shipped was bigger than "improve outbound": a multi-agent outbound system plus AI Brain, a temporal knowledge graph unifying those five silos with a per-agent write-back contract, wrapped in eval pipelines and tracing so it stayed a repeatable process, not a one-off campaign. Result: 2x open rates, 2x approved opportunities, 2 to 3 hours saved per rep per day, and a forecast of $1M in quarterly revenue.
