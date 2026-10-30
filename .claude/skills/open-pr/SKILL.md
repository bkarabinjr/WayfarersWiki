---
name: open-pr
description: Open a pull request for Wayfarers wiki changes, sort it as a content or structural change, get the right reviewers on it, and post a logic review of content changes. Use when someone asks to open, create, submit or send a pull request (PR), or to "send this for review".
---

# Open a pull request

Read `CLAUDE.md` first. Explain each step in plain words; the person may not know Git.

## 1. Get the branch ready

- Run `python3 scripts/wiki.py all` and fix everything it reports. Never commit the two generated pages.
- If the changes are on `main`, move them to a new branch first (`git switch -c <short-topic-name>`).
- Commit, then push: `git push -u origin HEAD`.

## 2. Sort the change

List the changed files with `git diff --name-only origin/main...HEAD`.

| Kind | Files | Reviewers |
|---|---|---|
| **Content** | only `content/` and `sources/` | Corey Stafford (`ccoreystafford`) |
| **Structural** | anything else: `scripts/`, `site/`, `.github/`, `.claude/`, `CLAUDE.md`, `README.md` | Brian Karabin (`bkarabinjr`) |

If a branch has both kinds, suggest splitting it into two pull requests. If the person wants one, it gets both reviewers and both reviews.

`.github/CODEOWNERS` requests these reviewers automatically, including on pull requests opened from GitHub Desktop. GitHub never asks the author to review their own pull request, so when Brian opens a structural one, nobody is requested; that's expected.

## 3. Review it before anyone else does

Read the full diff (`git diff origin/main...HEAD`) and every page it links to that the rule depends on.

**Content: check the logic.** Look for:

- **Contradictions**: a rule that conflicts with another page, another tier, or itself. Search the wiki for every term the change uses (`grep -ri "<term>" content/`).
- **Circular rules**: A depends on B, B depends on A, with no way in.
- **Undefined terms**: a rule that uses a word, stat or condition no page defines.
- **Math that doesn't hold**: totals, costs (`[1AP]`, `[2AP]`), ranges or progressions that don't add up or skip a step.
- **Unhandled cases**: two rules that both apply with no order given, or a rule that breaks at 0, at the cap, or when a target is immune.
- **Fallacies in design reasoning** (in `[!question]`, `[!idea]` and rationale text): false choices that leave out an obvious option, conclusions that don't follow from the reasons given, slippery-slope or appeal-to-tradition arguments, and question boxes that misstate what a source said.
- **Silently resolved conflicts or deleted content** (`CLAUDE.md` rules 1 and 2).

**Structural: check that it works.** Does the site still build (`scripts/build-site.sh` if Node 22+ is installed)? Do the scripts still run? Could the change break the deploy workflow or the page format other pages rely on?

Report problems; don't fix them. Mechanics are the designer's call. If you find a real bug in the person's own change, tell them before opening the pull request and let them decide.

## 4. Open the pull request

Fill in `.github/pull_request_template.md` for the body. End it with:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

With the GitHub CLI (`gh`):

```
gh pr create --base main --title "<title>" --body-file <body file>
gh pr comment <number> --body-file <review file>
gh pr view <number> --json reviewRequests
```

The comment is the step 3 review: a short list of findings, each with the page and line and why it's a problem, or "No logic problems found" with a line on what you checked. Start it with `**Claude review (content)**` or `**Claude review (structural)**`.

Never add Copilot as a reviewer. Copilot reviews are billed to the account that opens the pull request, and the owner doesn't want that. The step 3 review replaces it.

If `reviewRequests` is missing someone from step 2 (and they aren't the author), add them: `gh pr edit <number> --add-reviewer <login>`. If that fails, the person probably isn't a collaborator on the repository yet; tell the user to invite them under **Settings → Collaborators**.

Without `gh` (setup is Step 6 of `content/Overview/Getting Started.md`): give the person the link `https://github.com/bkarabinjr/WayfarersWiki/compare/main...<branch>?expand=1`, the body text to paste, and the review to paste as the first comment.

## 5. Tell the person

The pull request link, who was asked to review, and the review findings in a sentence or two.
