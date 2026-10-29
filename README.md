# Adarsh Ram K — Portfolio

A responsive, static portfolio with a midnight-indigo / cobalt / lavender / ivory / coral palette. It includes About, Projects, Skills, Contact, a playful AI-build note, and a working client-side terminal that unlocks the Idea Observatory.

The terminal is deliberately easy to discover: the hero has a prominent “Try the interactive terminal” CTA, the navigation includes “Terminal”, the terminal panel has a visible feature banner, and click-to-run command chips are provided for visitors who don't want to type. The terminal includes `credits`, `agent`, and `contact` commands so the build process and the person behind it are easy to discover.

## Run locally

No build step is required. Open `index.html` in a browser, or serve the directory with a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with AWS Amplify Hosting

1. Create a new GitHub repository for this portfolio.
2. Commit and push `index.html`, `styles.css`, `script.js`, and `README.md` to the repository root.
3. In the AWS Console, open AWS Amplify and choose to host a web app from GitHub.
4. Authorize GitHub access and select this repository and branch.
5. For this static site, no build command is required. If Amplify asks for an output directory, use the repository root (`/`) or the platform's equivalent root setting.
6. Deploy and wait for Amplify to report a successful deployment. Test the generated public URL on desktop and mobile.
7. Keep the deployment active and verify the URL again before submitting the challenge.

AWS Console labels may change. Do not publish credentials, access keys, or private configuration in this repository.

## Connect the coding agent to AWS

The challenge's coding-agent requirement is a **development workflow**, not a browser-side feature. Visitors must never receive AWS credentials or access to your AWS account through the site.

For the official setup flow, follow [`AWS_AGENT_WORKFLOW.md`](AWS_AGENT_WORKFLOW.md). It uses Kiro and the AWS Agent Toolkit for AWS to connect the local coding agent to the signed-in AWS account through the AWS MCP Server and project-specific rules. The setup prompt is generated in your own AWS Console, so it uses your region and account context.

Do not say that this connection is complete in the hackathon write-up until the verification prompt succeeds. Keep screenshots of the successful connection and the agent reviewing AWS documentation or deployment settings, but never capture credentials, session tokens, or secret values.

## Challenge submission checklist

- [ ] Public Amplify URL loads without authentication.
- [ ] About Me, Skills, and Projects are present.
- [ ] Interactive terminal works (`help`, `about`, `projects`, `skills`, `lessons`, `ideas`, `observatory`, `fun`, `clear`).
- [ ] Visible hero CTA, navigation link, hint card, and command chips make the terminal discoverable.
- [ ] Project details and contribution claims are verified.
- [ ] GitHub repository URL is included in the challenge submission.
- [ ] Capture screenshots of the site and AWS Amplify setup.
- [ ] Document Amplify Hosting, GitHub integration, the creative feature, lessons learned, and deployment challenges.

## Before publishing

- Confirm the exact project technology stacks and feature lists.
- Confirm the current status of PrepMate and the dementia screening project.
- Add only an email address that you explicitly choose to make public.
- Consider adding verified project repository/demo links after checking that each is safe to share.
- If the IIT Bombay mentor's name or affiliation is to be published, confirm the wording is accurate and appropriate.

## Accuracy notes

The traffic challan project is described as a basic Django backend; future ideas are not represented as implemented functionality. The student project management system is labelled approximately 60% complete. The dementia project is not described as clinically validated. The Thirukkural RAG work is identified as collaborative internship work, with the stated contribution focused on data collection and refinement.
