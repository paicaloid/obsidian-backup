<%*
const title = await tp.system.prompt("Bug title")
const severity = await tp.system.suggester(
  ["🔴 critical", "🟠 high", "🟡 medium", "🟢 low"],
  ["critical", "high", "medium", "low"],
  false,
  "Severity?"
)
const project = await tp.system.prompt("Project note name (for wikilink)")
const assignee = await tp.system.prompt("Assignee (leave blank if unassigned)", "")
await tp.file.rename(`BUG - ${title}`)
-%>
---
title: <% title %>
status: open
severity: <% severity %>
project: "[[<% project %>]]"
reported_date: <% tp.date.now("YYYY-MM-DD") %>
reporter: <% tp.user.name ?? "" %>
assignee: <% assignee %>
tags:
  - bug
---

# Bug Report: <% title %>

## Summary
> One-sentence description of the bug.

## Environment
| Field | Value |
|-------|-------|
| OS / Platform | |
| App Version | |
| Browser / Runtime | |
| Affected Component | |

## Steps to Reproduce
1. 
2. 
3. 

## Expected Behavior


## Actual Behavior


## Evidence
> Screenshots, logs, error messages, stack traces.

```
paste logs here
```

## Root Cause Investigation

### Hypothesis


### Files / Areas Investigated
- [ ] 

### Finding


## Fix

### Approach


### Changes Made
- [ ] 

### Tests Added / Updated
- [ ] 

## Verification
- [ ] Bug no longer reproducible after fix
- [ ] Regression tests pass
- [ ] Reviewed by

## Related
- Linked project: [[<% project %>]]
- Related notes: 
- PR / Commit: 
