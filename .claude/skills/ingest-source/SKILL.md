---
name: ingest-source
description: Ingest a new Wayfarers source document (PDF, Word, Google Doc export, pasted notes) into the wiki in content/, merging new material into the right pages and flagging conflicts as design questions. Use when someone asks to ingest, import, add, or merge a document or notes into the wiki.
---

# Ingest a source document into the Wayfarers wiki

Read `CLAUDE.md` first for page format and conventions. The goal is that nothing in the source is lost, nothing already in the wiki is silently overwritten, and the designer can review every change.

## 1. Get the source into the repo

- If the document isn't already in `sources/`, copy it there with a clear name (for example `sources/Wayfarers additional info.pdf`). Pasted text goes in `sources/<short name> (<date>).md`.
- Extract the text. For PDFs, prefer `pdftotext -layout file.pdf -`; if that's unavailable, use Python (`pypdf`) or read the pages directly. For two-column pages, look at the page image to get the reading order right. For .docx, use `pandoc` or `python-docx`.
- Read **all** of it before changing anything.

## 2. Make an inventory

List every distinct item in the source: each rule, option, number, name, list, idea and fragment, even one-word headings. For each item, search the wiki (`grep -ri "<keyword>" content/`) and classify it:

| Kind | What to do |
|---|---|
| **Already in the wiki, same meaning** | Skip. |
| **New detail for an existing page** | Add it to that page in the matching section. |
| **Fills a blank** (*Not written yet*, `?`, placeholder) | Fill it in, and remove the placeholder. |
| **Contradicts the wiki** | Keep both versions in a `> [!question]` box naming each source ("Master Document V01 says…; Additional Info says…"). Set the page to `needs-decision`. |
| **Answers an existing design question** | Don't close it yourself. Add the new source's position to the existing box. |
| **Unbuilt idea or one-liner** | Put it in a `> [!idea]` box on the most relevant page. |
| **New topic with enough substance** | Create a new page (correct folder, frontmatter, status) and link it from its section's overview page. |
| **New topic with only a name** | Add it to the relevant list or ideas page instead of making an empty page. |

## 3. Edit

- Match the existing style: keep the designer's wording, fix obvious typos, use `[[links]]`, `[1AP]` costs and `## Tier N` headings.
- Link every new page from at least one existing page.
- Update related tracking pages when relevant: `Lineage Ideas`, `Subclasses`, `Class Completion Tracker`, the roadmap phase pages (tick nothing off; add new tasks only if the source creates new work).

## 4. Check

```
python3 scripts/wiki.py all
```

Fix every problem it reports. Then reread each changed page once for broken formatting (unclosed callouts, tables missing their header row).

## 5. Report

Finish with a short summary for the designer:

- The pages you changed, and the pages you created (with one line each on what changed).
- **New design questions**, listed one per line, since these need the designer's attention.
- Anything in the source you couldn't place or didn't understand.

If you're using Git: commit on a new branch named `ingest/<short-source-name>`, with this summary as the commit message body, then open a pull request (or tell the person how to).
