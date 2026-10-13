# Setup on a new machine

Handoff for connecting another computer to my Obsidian vault and Claude memory.
Repo: https://github.com/paicaloid/obsidian-backup (private). Written 2026-10-13.

## 0. Prerequisites
- [ ] Git installed (`git --version`)
- [ ] Obsidian installed
- [ ] Claude Code installed (desktop app or CLI)
- [ ] Signed in to GitHub as `paicaloid` (Git Credential Manager opens a browser on first use)

## 1. Clone the vault
Pick a path with **no spaces**.

Windows:
```bash
git clone https://github.com/paicaloid/obsidian-backup.git D:\ObsidianVault
git -C D:\ObsidianVault config core.autocrlf false
```

macOS / Linux:
```bash
git clone https://github.com/paicaloid/obsidian-backup.git ~/ObsidianVault
git -C ~/ObsidianVault config core.autocrlf false
```

Never clone from the old `obsidian-sync` repo; it was deleted because it exposed a secret.

## 2. Open it in Obsidian
1. Obsidian -> "Open folder as vault" -> choose the cloned folder.
2. When asked, **Trust author and enable plugins** (plugins ship in the repo under `.obsidian/plugins`).
3. Settings -> Community plugins -> confirm **Obsidian Git** is enabled.
4. Command palette -> "Obsidian Git: Pull" once to confirm it can reach the remote.

## 3. Connect Claude Code to the memory
Edit the global instructions file (create it if missing):
- Windows: `C:\Users\<you>\.claude\CLAUDE.md`
- macOS / Linux: `~/.claude/CLAUDE.md`

Add:
```markdown
## Personal memory (Obsidian vault)
My personal memory lives in an Obsidian vault. Save global 'remember' requests there, not in this file.
@<absolute path to vault>/Memory/Memory.md
```
Examples: `@D:/ObsidianVault/Memory/Memory.md` or `@~/ObsidianVault/Memory/Memory.md`

Use forward slashes and keep the path free of spaces.

## 4. Verify
- [ ] Start a **new** Claude Code session (imports load at session start).
- [ ] Ask: "What do you know about me from my memory?" It should mention the notes in `Memory/`.
- [ ] Say "remember: test entry on <machine name>", then check that a bullet landed in `Memory/Inbox.md` (or a better-fitting note).
- [ ] Let Obsidian Git commit and push, then pull on the first machine and confirm the bullet appears.

## 5. Rules for working across two machines
- Pull before you start (Obsidian Git can do this on open); push when done. Avoid editing the same note on both at once.
- `.obsidian/workspace.json` is git-ignored on purpose; each machine keeps its own window layout.
- Never put passwords, tokens, or DB URIs in notes or Memory. The repo is private but its history is permanent.
- If a secret slips in: rotate it first, then clean up the repo.

## Troubleshooting
| Symptom | Fix |
|---|---|
| `Authentication failed` on clone/push | Sign in to GitHub again; run `git ls-remote <repo url>` and complete the browser prompt |
| Claude doesn't know my memory | Check the `@` path exists, has no spaces, and that you started a new session |
| Every file shows as modified | Line endings: `git config core.autocrlf false`, then `git checkout -- .` (only if you have no real edits) |
| Merge conflict in a note | Keep both versions, edit by hand, then commit |
