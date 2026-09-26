---
title: "How to Contribute"
category: Overview
status: solid
tags:
  - status/solid
  - meta
---
The wiki is a folder of Markdown files in a Git repository. The website is built from those files automatically every time a change lands on `main`. There are three ways to contribute, from easiest to most hands-on.

## 1. Ask Claude to do it

Open the repository folder in **Claude Code** or **Claude Cowork** and ask in plain words:

- "Ingest `sources/My new notes.pdf` into the wiki."
- "Write the Tundra option for Stoutfolk."
- "Resolve the Action Points question: we're going with 3 AP."
- "What does the wiki say about shields?"

Claude reads `CLAUDE.md` at the top of the repository, which explains how pages are organized. For new documents it follows the **ingest-source** skill: it reads the whole document, merges new material into the right pages, adds *Design question* boxes where the new document contradicts the wiki, and gives you a summary to review before you commit.

## 2. Edit the files yourself

Any text editor works. [Obsidian](https://obsidian.md) is the nicest option: open the `content` folder as a vault and you get clickable links, backlinks, a graph view and clickable checkboxes.

## 3. Review a pull request

Changes go through pull requests on GitHub so the designer can review them before they land. Comment on the changes you disagree with, like any code review.

## Page format

Every page starts with a small header (frontmatter):

```
---
title: "Stoutfolk"
category: Lineages
status: draft
tags:
  - status/draft
  - lineage
---
```

**Status** is one of `stub`, `draft`, `needs-decision` or `solid`. Keep the `status/...` tag the same as the `status:` line, because the site uses the tag to list pages by status.

In the page text:

| You type | You get |
|---|---|
| `[[Berserker]]` | A link to the Berserker page |
| `[[Berserker\|the rage class]]` | The same link with different text |
| `[1AP]`, `[2AP]`, `[Reaction]` | An action cost (shown as written) |
| `> [!question] Title` | A **Design question** box, listed on [[Open Questions]] |
| `> [!idea] Title` | An idea or brainstorm box |
| `> [!note] Title` | A note box |
| `- [ ] Task` | A checklist item, counted on [[Roadmap Progress]] |

## Design questions

When a rule contradicts another, don't delete either version. Add a design question box so the designer can decide:

```
> [!question] How many Action Points per turn?
> Chapter 10 says 3; the design notes say 4.
```

Once it's decided, replace the box with the final rule and add a row to the [[Decision Log]].

## Source documents

Put new source documents (PDF, DOCX, Google Doc exports, notes) in the `sources` folder so there's a record of where content came from.
