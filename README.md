# Wayfarers Design Wiki

The design wiki for **Wayfarers**, a setting-agnostic tabletop RPG. Every rule, lineage, class and idea lives here as a linked Markdown page, and a website is built from it automatically.

- **Read it:** the website (GitHub Pages, link in the repository's About box) or open `content/` in [Obsidian](https://obsidian.md).
- **Start here:** `content/index.md`, then `content/Roadmap/Roadmap.md` for the plan to finish the game.
- **Open design questions:** `content/Open Questions.md`

## Contributing with Claude

The easiest way to contribute is to let Claude do the editing. It reads `CLAUDE.md`, which explains how the wiki is organized.

### Claude Code (terminal or desktop)

```bash
git clone https://github.com/<owner>/wayfarers-wiki.git
cd wayfarers-wiki
claude
```

Then ask, for example:

> Ingest sources/My new notes.pdf into the wiki.

Claude follows the **ingest-source** skill in `.claude/skills/`: it reads the whole document, updates the right pages, flags contradictions as design questions, runs the checks, and summarizes what changed. Ask it to open a pull request when you're happy.

### Claude Cowork (desktop app)

Clone or download the repository to your computer, add the folder in Cowork, and start with:

> Read CLAUDE.md and .claude/skills/ingest-source/SKILL.md, then ingest the attached document into the wiki.

When it's done, commit and push with GitHub Desktop (or ask Claude to).

### Other tools

The files are plain Markdown, so any editor or AI tool works. Point it at `CLAUDE.md` first.

## Contributing by hand

1. Edit the `.md` files in `content/` (Obsidian makes this pleasant: open `content/` as a vault).
2. Run `python3 scripts/wiki.py all` to rebuild the generated pages and check for broken links.
3. Commit on a branch and open a pull request.

Page format and conventions are in `CLAUDE.md` and `content/Overview/How to Contribute.md`.

## Setup (repository owner, once)

1. Create an empty GitHub repository (for example `wayfarers-wiki`) and push this folder to it.
2. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**. The next push to `main` publishes the site.
3. In **Settings → Collaborators**, invite each contributor.
4. Optional: in **Settings → Branches**, protect `main` so changes go through pull requests.

## Previewing the site locally

Needs Node 22+, Git and Python 3.

```bash
scripts/build-site.sh --serve   # http://localhost:8080
```

The first run downloads [Quartz](https://quartz.jzhao.xyz), the site generator, into `.quartz/`.

## Layout

| Path | What it is |
|---|---|
| `content/` | The wiki pages (edit these) |
| `sources/` | Original source documents |
| `scripts/wiki.py` | Link checker and generator for Open Questions and Roadmap Progress |
| `scripts/build-site.sh` | Builds the website |
| `site/` | Website look and layout |
| `.claude/skills/ingest-source/` | How Claude ingests a new document |
| `.github/workflows/site.yml` | Checks every pull request; publishes the site from `main` |
