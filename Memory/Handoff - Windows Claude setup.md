# Handoff: Windows Claude Code setup (2026-10-13)

Goal: get the same tools as WSL (mattpocock-skills, caveman, rtk) working on the Windows side.
Windows and WSL are separate installs (`C:\Users\paica\.claude` vs `/home/pai/.claude`).

## Done on Windows
- CLI: `C:\Users\paica\.local\bin\claude.exe` (2.1.296), on PATH.
- Marketplaces added: `claude-plugins-official` (anthropics/claude-plugins-official), `caveman` (JuliusBrussee/caveman).
- Plugins installed (user scope): `mattpocock-skills@claude-plugins-official` 1.2.3, `caveman@caveman`.
- RTK 0.51.0: `C:\Users\paica\.local\bin\rtk.exe` (rtk-ai/rtk release, SHA-256 verified).
- `rtk init -g --auto-patch` run: `RTK.md` created, `@RTK.md` added to `~\.claude\CLAUDE.md`,
  PreToolUse Bash hook `rtk hook claude` added to `~\.claude\settings.json` (backup: `settings.json.bak`).
- RTK telemetry: enabled (anonymous; disable with `rtk telemetry disable`).

## To test in the next session (restart Claude Code first)
1. `claude plugin list` -> shows mattpocock-skills and caveman enabled.
2. Skills visible: `mattpocock-skills:tdd`, `mattpocock-skills:grilling`, `caveman:caveman`, etc.
3. RTK hook: ask Claude to run `git status` in a repo; it should be rewritten to `rtk git status`.
   Then `rtk gain` should show tracked savings.
4. Obsidian memory still loads: `@D:/ObsidianVault/Memory/Memory.md` in `~\.claude\CLAUDE.md`.
5. Check the hook works with both PowerShell and Bash tool (hook matcher is `Bash` only).

## Known gaps / open items
- Not copied from WSL: `code-review`, `commit-commands`, `context7`, `feature-dev`, `frontend-design`,
  `github`, `playwright` (all `@claude-plugins-official`), `flightdeck@claude-flightdeck`.
- WSL also runs the `@caveman-ai/cli` hook + statusline; not replicated on Windows.
- RTK hook matcher is `Bash`; PowerShell tool commands may not be rewritten.
- If rtk misbehaves: `rtk init -g --uninstall`, or restore `settings.json.bak`.
- Leftover download folder: `%TEMP%\rtk-dl` (safe to delete).
