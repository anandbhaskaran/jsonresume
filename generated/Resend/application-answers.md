# Resend — Application Answers

## Why do you want to join Resend?

Three reasons, in order.

**The product is what I already reach for.** I run my own AI products on the side (PulseView, Proplab, SwissNRI) and email is a surface I keep hitting. Every existing option is either a 2010-era dashboard bolted onto a fancy API, or a fancy dashboard bolted onto a 2010-era API. Resend is the first one that felt built by people who actually send email from their own code, and I want to build the surface I want to use.

**The team shape.** 50 people, 15 countries, remote-first, "just ship it" as an operating principle. Most of my career has been distributed (LumApps across Europe and the US, Beekeeper across 3 zones, Anand Creations solo). I do my best work when the doc is the source of truth and the meeting is the exception, not the other way around. Resend reads like a place where that is the norm, not a fight I have to keep having.

**The bar on craft.** Debug UX for emails, webhooks, domains and API requests is exactly the kind of work I care about: taking something opaque (why did this email not deliver?) and turning it into a screen a developer trusts on first look. That is the same craft I applied to observability at LumApps and Beekeeper. It's where I want to spend the next several years.


## Tell us about your favorite user experience challenge you've solved with code

**AI outbound agents at LumApps.** *(Happy to share the demo video.)*

I built this with UX in mind from day one, not as a coat of paint at the end. The purpose was clear before a line of code was written: give a sales rep back 2 to 3 hours of their day by handling the parts of outbound they hate, and only those parts. Every design choice fell out of that.

- **Purpose-first.** Discovery started with reps, not models. What do you actually spend the day doing, what do you never want to touch again, where do you need to stay in the driver's seat. The scope of the agent was decided by those answers, not by what the model could technically do.
- **Clean interface.** Live agent state streamed to the UI over AG-UI. A rep watches the agent pick a prospect, read context, draft, self-check, present. No dashboards to learn, no traces to decode, no waiting spinner. The reasoning *is* the interface, and each step is a one-line "why" in rep language ("visited pricing 3 times last week"), not model language.
- **Only what the user wants.** Draft-before-send by default, never auto-send. Rep stays in control. Everything the rep doesn't need is hidden.

**Adoption was incredible.** Reps stopped overriding for the sake of overriding. The agent now saves 2 to 3 hours per rep per day, doubles open rates, doubles approved opportunities, and forecasts $1M in quarterly revenue. First production multi-agent system at LumApps, now the reference other teams build on. Reporting goes straight to C-level.

The through-line for me: **I build everything with user experience in mind, from discovery to testing to production.** UX is not a paint job at the end. It shapes what I ship, what I cut, and what I instrument.
