# Build notes for the AWS Student Builder Challenge

## Creative feature

The portfolio's interactive terminal (`help`, `about`, `projects`, `skills`, `lessons`, `ideas`, `observatory`, `fun`, `credits`, `agent`, `contact`, `clear`) unlocks the Idea Observatory and communicates the builder's personality: curious, honest about project status, and comfortable acknowledging AI assistance.

Discoverability is intentionally built into the interface rather than left as an easter egg: a prominent “Try the interactive terminal” button appears in the hero; the site navigation says “Terminal”; the Idea Observatory has a “YOU FOUND THE USP” hint; the terminal panel announces that it is interactive; and click-to-run command chips let judges try it without knowing terminal syntax.

## AI-assisted development transparency

The site states: “AI helped with the code. The foundation is mine.” This is intended to distinguish AI-assisted implementation from the human's ideas, priorities, taste, final decisions, review, and ownership of the result. Update this note if the development workflow changes materially.

## AWS coding-agent requirement

The coding agent connection is performed locally using Kiro and the AWS Agent Toolkit for AWS. See `AWS_AGENT_WORKFLOW.md`. This is a development workflow and does not expose AWS access to the visitor-facing website. The connection must be verified in Kiro before the submission claims it is complete.

## AWS usage

Planned hosting: AWS Amplify Hosting for the static website, connected to the GitHub repository for deployment. Mark deployment and source-control integration as completed only after the public URL and repository workflow have been tested.

## Screenshot placeholders / evidence to capture

- [ ] Desktop home page
- [ ] Mobile page
- [ ] Interactive terminal responding to `credits` and `observatory`
- [ ] Idea Observatory open
- [ ] Kiro confirms AWS MCP Server connection and correct Region
- [ ] AWS Amplify deployment succeeded and public URL loads
- [ ] GitHub repository shows site source files

## Reflection prompts

Fill these after actual testing: What did the coding agent help with? What decisions did I make or review? What was the hardest bug or design trade-off? What changed after testing on mobile? What deployment issue did I encounter and how did I resolve it?
