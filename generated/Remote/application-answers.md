# Remote — Application Answers

**Anand Bhaskaran** · Zurich, Switzerland · anandbaskaran3193@gmail.com · +41 76 304 3193
anand-creations.com · linkedin.com/in/anandb3

---

## Why the FDE role, and what excites me about Remote

I already work as a Forward Deployed Engineer, just under my own shingle. Anand Creations is my independent FDE practice: I embed with teams, run discovery, ship production agentic AI end to end, and hand it back. The Remote FDE role is the same motion at a larger surface, on a platform I already believe in.

The domain lines up specifically:

- **HR / employee platform muscle.** LumApps is an employee experience platform; Beekeeper (my prior 6 years) is the frontline workforce platform with 10M+ users. I have shipped enterprise-grade multi-tenant SaaS with SLA, RBAC, and privacy-by-design in exactly this shape.
- **Cross-border and compliance.** I co-founded SwissNRI, an AI-native cross-border tax and compliance platform for Swiss-Indian families. RAG-grounded assistant with citations back to the regulation, compliance-first agentic design. The multi-jurisdiction, "no wrong answers on tax" mindset is where Remote lives every day.
- **Global-async-native.** I have been remote-first since 2018, ran a distributed team at Obermatt, and am on-call for global production at LumApps. Zurich time zone gives me EMEA overlap and a solid US morning window.

What excites me: the AI opportunity at Remote is dense and real. Every customer has messy HRIS/payroll/identity data across systems, and the "connect Remote's platform to their workflows" mandate is exactly where agentic AI earns its keep. I want to build those integrations, ship them into production, and turn the pattern into a playbook the next customer inherits.

---

## Most complex customer-facing project

The LumApps AI outbound system I own end to end.

**Why it was complex.**

- **Cross-silo integration.** Sales and RevOps needed one context surface, but the source data lived in Salesforce, HubSpot, Pendo, conversation transcripts, and product-usage events. Each with its own schema, freshness, and auth model.
- **Non-deterministic behavior against customer trust.** Agents write into systems of record and draft messages the customer sees. Model regressions and prompt injections had to fail closed, not open.
- **Cross-functional stakeholders.** C-level on outcomes, RevOps on data quality, Sales on adoption, Product on roadmap upstream. Different definitions of "shipped".
- **Live users, real incidents.** No staging cushion. When it broke, someone's outbound was affected.

**How I solved it.**

- Replaced naive vector RAG with **AI Brain**, a temporal knowledge graph on Graphiti/Neo4j that unifies all five silos into one time-aware store. Fixed the "agent cites a closed-lost deal from last quarter" class of failure.
- Exposed all writes over **MCP tool servers I authored**, with per-agent, least-privilege credentials. The forbidden write is structurally impossible, not merely discouraged in a prompt.
- Built the eval layer as the release gate: golden suites with behavioral assertions, judge rubrics, safety cases, LangSmith tracing so every run reconstructs from its log. Regressions block merge.
- Hierarchical delegation with smaller per-agent tool grants after tool-selection accuracy collapsed on the monolithic version.
- Draft-before-send with HITL on every external action. Preserved customer trust through model regressions.

**Outcome.** 2x open rates, 2x approved opportunities, 2 to 3 hours saved per rep per day, $1M forecast in quarterly revenue. Reference architecture the rest of the org now builds on.
