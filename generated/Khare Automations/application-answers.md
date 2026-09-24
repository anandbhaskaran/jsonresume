# Khare Automations — Application Answer

**Anand Bhaskaran** · Zurich, Switzerland · anandbaskaran3193@gmail.com · +41 76 304 3193
anand-creations.com · linkedin.com/in/anandb3

---

## What have you built and run in production?

**LumApps AI outbound system (current, my daily job).**
Multi-agent workflow on Python + GCP Vertex AI, using LangGraph and Google ADK. Tools exposed over MCP servers I authored. Agent state streamed to the UI over AG-UI. Backed by AI Brain, a temporal knowledge graph on Graphiti/Neo4j that unifies Salesforce, HubSpot, Pendo and product usage into one time-aware context store. Real users: LumApps' Sales and RevOps teams. Reports directly to C-level on outcomes. I own the eval suite (golden sets, judge rubrics, safety cases, LangSmith tracing so every run reconstructs from its log) and I am on-call. Outcome: 2x open rates, 2x approved opportunities, 2 to 3 hours saved per rep per day, $1M forecast quarterly. When it broke: two incidents worth telling. One where a stale CRM record caused an agent to reference a closed-lost deal in a live draft, which is what pushed me to replace vector-only RAG with the temporal KG. Another where tool-selection accuracy collapsed on a large tool inventory, which is what pushed me to hierarchical delegation with smaller per-agent tool grants.

**Beekeeper platform (2020–2026, 10M+ users).**
Architected and ran multiple production systems: Employee Referral System (became the top revenue channel, $1.5M+ generated, $500K ARR), distributed templating engine (powers 15% of all assets on the platform for 10M+ users), and an in-house LLM translation pipeline that replaced $337K/yr in vendor cost, shipped in 6 weeks (GitHub Actions + OpenAI). Ran global observability and on-call across K8s + AWS with Grafana, Datadog, and Logz.io. I was there when each broke and own the postmortems.

**Dronistics (founding engineer, 2018–2020).**
Autonomous drone delivery. Sole engineer on the platform: full-stack (Vue, Java, PostgreSQL, real-time flight-control APIs) and cloud infra on AWS + Docker + Terraform from an empty repo to 500+ real-world deliveries, 99.5% safety record. Every architecture decision closed by me. Every incident on my pager.

**Anand Creations (independent, 2024 to present).**
Three AI-native products I designed, built, and run solo: SwissNRI (cross-border compliance, live users, community-led GTM), PulseView (real-time market intelligence, live users on real-time feeds, AI safety by design), Proplab (vision + LLM property workflows). Plus an open-source Terraform URL-shortener module on the Terraform Registry with ~4,600 users I keep maintaining.
