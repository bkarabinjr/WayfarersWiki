---
title: "Getting Started"
category: Overview
status: solid
tags:
  - status/solid
  - meta
  - start-here
---
A step-by-step guide for new contributors. You don't need to know how to code. You'll install three free programs once, then follow the same short routine every time you make a change.

> [!note] Short version
> **Get the latest → make a branch → edit (in Obsidian or with Claude) → commit → push → open a pull request.** Someone reviews it, merges it, and the website updates by itself.

## Words you'll see

| Word | What it means |
|---|---|
| **Repository** (repo) | The wiki's folder, stored on GitHub. Ours is `bkarabinjr/WayfarersWiki`. |
| **Clone** | Download your own copy of the repository to your computer (once). |
| **Branch** | Your own scratch copy of the wiki for one change. Nothing you do on a branch affects anyone else until it's merged. |
| **main** | The official branch. The website is built from it. Never edit on `main` directly. |
| **Commit** | Save a snapshot of your changes, with a short note. |
| **Push** | Upload your commits to GitHub. |
| **Pull** | Download other people's changes to your computer. |
| **Pull request** (PR) | A request to add your branch's changes to `main`. It's where people review and comment. |
| **Merge** | Accept a pull request. The changes go into `main` and onto the website. |

---

## Part 1: One-time setup

Plan on about 30 minutes. You only do this once per computer.

### Step 1: Get a GitHub account and accept the invite

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Send your GitHub username to the wiki owner so they can invite you.
3. You'll get an email titled *"invited you to collaborate on bkarabinjr/WayfarersWiki"*. Click **View invitation → Accept invitation**. (You can also accept at [github.com/bkarabinjr/WayfarersWiki/invitations](https://github.com/bkarabinjr/WayfarersWiki/invitations).)

### Step 2: Install GitHub Desktop

GitHub Desktop is a free app that does all the Git work with buttons instead of commands.

1. Download it from [desktop.github.com](https://desktop.github.com) and install it.
2. Open it and choose **Sign in to GitHub.com**. Sign in with the account from Step 1.
3. When it asks for your name and email, keep what it suggests. This is how your changes are labeled.

### Step 3: Download (clone) the wiki

1. In GitHub Desktop, choose **File → Clone repository**.
2. On the **GitHub.com** tab, pick **bkarabinjr/WayfarersWiki**.
3. Under **Local path**, choose a folder that is **not** synced by OneDrive, Dropbox, iCloud or Google Drive. Syncing apps fight with Git and cause errors.
   - Windows: `C:\Users\<your name>\GitHub\WayfarersWiki`
   - Mac: `/Users/<your name>/GitHub/WayfarersWiki`
4. Click **Clone**.

You now have a `WayfarersWiki` folder. The wiki pages are in its `content` folder.

### Step 4: Install Obsidian (for editing by hand)

Obsidian is a free note-taking app that understands the wiki's links.

1. Download it from [obsidian.md](https://obsidian.md) and install it.
2. Choose **Open folder as vault** and select the **`content`** folder inside `WayfarersWiki`, not the `WayfarersWiki` folder itself.
3. If Obsidian asks whether to trust the author and turn on plugins, you can say no. The wiki doesn't need any plugins.
4. Check two settings (the gear icon, bottom left):
   - **Files and links → Use `[[Wikilinks]]`**: on.
   - **Files and links → New link format**: *Shortest path when possible*.

You can now browse the whole wiki, click links, and see backlinks and the graph view.

### Step 5: Set up Claude (optional, for asking Claude to make changes)

1. Install the **Claude desktop app** from [claude.com/download](https://claude.com/download) and sign in. Working on folders on your computer needs a paid Claude plan.
2. Use **Cowork** (in the desktop app) and add your `WayfarersWiki` folder when you start a task. Claude can then read and edit the wiki files.
3. People comfortable with a terminal can use **Claude Code** instead: open a terminal in the `WayfarersWiki` folder and run `claude`.

The repository includes instructions for Claude (`CLAUDE.md`), so it already knows how pages are laid out and that it must flag conflicts instead of deleting them.

---

## Part 2: Every time you make a change

### Step A: Get the latest version

In GitHub Desktop:

1. Check that the **Current branch** (top middle) says **main**. If not, click it and pick **main**.
2. Click **Fetch origin** (top right). If it turns into **Pull origin**, click it again.

Now your copy matches everyone else's.

### Step B: Make a branch

1. Click **Current branch → New branch**.
2. Name it `yourname/what-youre-doing`, lowercase with dashes. For example: `sam/stoutfolk-tundra` or `alex/ingest-october-notes`.
3. Leave **main** as the starting point and click **Create branch**.

The top bar now shows your branch name. Every edit you make now belongs to this branch.

> [!note] One change per branch
> Keep each branch to one topic ("finish the Soldier maneuvers", "add the new lineage notes"). Small pull requests get reviewed faster.

### Step C, option 1: Edit in Obsidian

Open Obsidian and edit pages like normal notes. Obsidian saves as you type.

**Editing an existing page:** change the text below the header block. Things to know:

- Link to another page with `[[Page Name]]`. Obsidian suggests names as you type.
- Action costs are written `[1AP]`, `[2AP]`, `[Reaction]`.
- If you find a rule that contradicts another, **don't delete either one**. Add a design question box:
  ```
  > [!question] How many Action Points per turn?
  > Chapter 10 says 3; the design notes say 4.
  ```
- Roadmap checklists: change `- [ ]` to `- [x]`, or click the checkbox in Obsidian's reading view.

**Creating a new page:**

1. Right-click the right folder (for example `Lineages`) and choose **New note**.
2. Name the note exactly what the page should be called, like `Avian`. Don't use `:` `/` `?` `*` or `"` in names.
3. Paste this header at the very top and fill it in:
   ```
   ---
   title: "Avian"
   category: Lineages
   status: draft
   tags:
     - status/draft
     - lineage
   ---
   ```
   `category` must match the folder name. `status` is one of `stub`, `draft`, `needs-decision` or `solid`, and the `status/...` tag must match it.
4. Link to your new page from at least one other page (for example, from [[Lineages]]), so people can find it.

**Don't edit** anything in the `sources` folder, or the pages [[Open Questions]] and [[Roadmap Progress]] (they're rebuilt automatically).

More formatting details: [[How to Contribute]].

### Step C, option 2: Ask Claude to do it

1. In the Claude desktop app, start a Cowork task with your `WayfarersWiki` folder added.
2. Start your request with this line, so Claude reads the wiki's rules first:
   > Read CLAUDE.md in the WayfarersWiki folder before doing anything.
3. Then ask for what you want in plain words. Examples:
   - "Ingest the document I've attached into the wiki. Follow `.claude/skills/ingest-source/SKILL.md`." (Save the document into the `sources` folder first, or attach it.)
   - "Write the Tundra option for Stoutfolk based on the other Stoutfolk options, and mark it as a draft."
   - "We decided characters get 3 Action Points. Update every page and log it in the Decision Log."
   - "What does the wiki say about shields?"
4. Read Claude's summary of what it changed. If something's wrong, tell it.

Claude edits the files in your folder. It doesn't need to know anything about Git: you'll save and share the changes in GitHub Desktop, next.

> [!note] Branch first
> Make your branch (Step B) **before** asking Claude for changes. If you forget, GitHub Desktop will offer to bring your changes onto a new branch when you create one.

### Step D: Review and commit your changes

Go back to GitHub Desktop. The **Changes** tab on the left lists every file you or Claude changed.

1. Click each file to see what changed: red lines were removed, green lines were added. If you see a change you didn't mean to make, right-click the file and choose **Discard changes**.
2. In the box at the bottom left, write a short **Summary**, like `Add Avian lineage` or `Ingest October notes`. The **Description** box is optional.
3. Click **Commit to yourname/your-branch**.

You can commit several times on the same branch. Each commit is a save point.

### Step E: Push your branch

Click **Publish branch** at the top right. (After the first time, the button says **Push origin**.) Your branch is now on GitHub, but not on the website yet.

### Step F: Open a pull request

1. In GitHub Desktop, click **Create Pull Request** (or **Preview Pull Request → Create pull request**). Your web browser opens GitHub.
2. Check that it says **base: main ← compare: yourname/your-branch**.
3. Give it a clear title. Fill in the description form: what changed, and any **new design questions** the designer needs to look at.
4. Click **Create pull request**.

### Step G: Checks and review

- After a minute, GitHub runs an automatic check for broken links and page-header mistakes. A **green check** means it passed.
- A **red X** means something needs fixing. Click **Details** to see the problem (usually a link to a page that doesn't exist, or a status tag that doesn't match). Fix it in Obsidian or ask Claude ("the check says: …, please fix it"), then commit and push again. The pull request updates by itself.
- Reviewers may leave comments. To respond with changes, stay on the same branch, edit, commit and push. There's no need to open a new pull request.

### Step H: After it's merged

Once a reviewer merges your pull request, the website updates within a couple of minutes. Then, in GitHub Desktop:

1. Switch **Current branch** back to **main**.
2. Click **Fetch origin**, then **Pull origin**.
3. Optional: delete your old branch (**Branch → Delete**).

You're ready for the next change. Start again from Step A.

---

## Troubleshooting

**I edited without making a branch first.**
Don't commit yet. Click **Current branch → New branch**, name it, and choose **Bring my changes to [new branch]**.

**I already committed on main.**
GitHub won't let you push to `main` if it's protected, so nothing is broken. Ask the wiki owner for help, or ask Claude Code to "move my last commit from main to a new branch".

**GitHub says "This branch has conflicts".**
Someone else changed the same lines. Ask the wiki owner, or ask Claude Code to "merge main into my branch and resolve the conflicts, keeping both versions where they disagree".

**Obsidian made a page called "Untitled".**
You clicked a link to a page that doesn't exist yet, or pressed New note. Rename it or delete it before committing.

**I want to throw away everything since my last commit.**
In GitHub Desktop, right-click in the Changes list and choose **Discard all changes**.

**The website didn't change after my pull request was merged.**
Wait two or three minutes and refresh. If it still hasn't changed, check the **Actions** tab on GitHub for a red X and tell the wiki owner.

**Where's the website?**
[bkarabinjr.github.io/WayfarersWiki](https://bkarabinjr.github.io/WayfarersWiki/)

---

## For reviewers

1. Open the pull request on GitHub and click **Files changed** to see every edit.
2. Comment on specific lines by clicking the **+** next to a line.
3. When you're happy and the check is green, click **Squash and merge → Confirm**, then **Delete branch**.
4. If the pull request adds design questions, answer them in a follow-up change: replace the question box with the final rule and add a row to the [[Decision Log]].
