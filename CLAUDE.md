# Wayfarers wiki: notes for Claude

This repository is the design wiki for **Wayfarers**, a setting-agnostic tabletop RPG in development. The wiki is plain Markdown in `content/` (an Obsidian-compatible vault). A GitHub Action builds it into a website with Quartz whenever `main` changes.

The people asking you for help are game designers, not programmers. Explain what you changed in plain words, and never assume they know Git.

## Layout

```
content/            the wiki (one .md file per page, folders = sections)
  index.md          home page
  Open Questions.md generated: every design question box      (don't edit)
  Roadmap/Roadmap Progress.md   generated: checklist progress (don't edit)
sources/            original source documents (PDFs, notes); never edit these
scripts/wiki.py     `check` finds broken links and bad headers; `generate` rebuilds generated pages
scripts/build-site.sh  builds the website locally (`--serve` to preview)
site/               Quartz config for the website
.claude/skills/ingest-source/   the procedure for ingesting a new source document
```

Sections (folders) in order: Overview, Roadmap, Character Creation, Lineages, Classes, Subclasses, Rules, Magic, Equipment, Feats, Running the Game. Add a new folder only when a whole new area appears (for example, Bestiary).

## Page format

Every page starts with frontmatter:

```yaml
---
title: "Stoutfolk"
category: Lineages          # must match the folder name
status: draft               # stub | draft | needs-decision | solid
tags:
  - status/draft            # always exactly one status/ tag, matching status:
  - lineage
aliases:                    # optional: other names people link with
  - "Dwarves"
---
```

- **File name = page title** (`Stoutfolk.md`). Titles can't contain `: / \ ? * " < > |`. Use " - " instead of a colon.
- Page names must be unique across the whole vault, because links resolve by file name.
- **Status:** `stub` = names or headings only; `draft` = real content in progress; `needs-decision` = has open design question boxes; `solid` = ready to playtest. When you add a design question to a page, set it to `needs-decision`. When the last one is resolved, move it back to `draft`.

## Writing conventions

- Link with `[[Page Title]]` or `[[Page Title|display text]]`. In tables, escape the pipe: `[[Page\|text]]`. Link generously: the first mention of another page's topic on a page should be a link.
- Action costs are written `[1AP]`, `[2AP]`, `[Reaction]`.
- Tier sections are `## Tier 1`, `## Tier 2`, and so on.
- Callouts (Obsidian syntax):
  - `> [!question] Short question` + lines explaining the conflicting versions. These feed [[Open Questions]].
  - `> [!idea] Title` for brainstorms and unbuilt ideas.
  - `> [!note] Title` for editorial notes (legacy terms, typos in the source, etc.).
- Checklists on Roadmap pages use `- [ ]` / `- [x]`.
- Keep the designer's wording and intent. Fix obvious typos silently; don't "improve" mechanics.
- Unwritten parts are marked *Not written yet.* Don't invent rules to fill them.
- Plain, direct sentences. No filler.

## Rules that matter most

1. **Never silently resolve a conflict.** If two sources disagree, keep both versions in a `[!question]` box that says which source said what, and let the designer decide. Newer isn't automatically right.
2. **Never delete content** unless asked. Superseded material moves into a question box or a note.
3. **Don't edit `sources/` or the generated pages.**
4. When the designer makes a decision: replace the question box with the final rule, update every page that used the old rule (search for it), and add a row to `content/Roadmap/Decision Log.md`.
5. After any edit, run `python3 scripts/wiki.py all` and fix every problem it reports before you finish.
6. Work on a branch and open a pull request (or, for someone who doesn't use Git, leave the changes uncommitted and summarize them). Don't push to `main` directly unless asked.

## Common requests

- **"Ingest this document"**: follow `.claude/skills/ingest-source/SKILL.md`.
- **"What does the wiki say about X?"**: search `content/` (`grep -ri`) and answer with links to the pages.
- **"We decided X"**: rule 4 above.
- **"Mark this done"** on the roadmap: change `- [ ]` to `- [x]` on the phase page, then run `generate`.
- **"Preview the site"**: `scripts/build-site.sh --serve` (needs Node 22+).
