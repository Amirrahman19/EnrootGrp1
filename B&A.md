# B&A — Before and After — EnrootGrp1

> Append-only. Backfilled 2026-10-28: the entries below are **reconstructed** (curated from Claude Vault Memory logs + live files). New entries go at the bottom using the template in `Claude Vault\Agent Harness\Skills\Project Control Files (MVP, HANDOFF, B&A).md`.

## Baseline (reconstructed)
- **Before Claude-assisted work:** Existing Christmas event site.
- **MVP alignment:** see MVP.md.

## Entries from Claude sessions (reconstructed from Memory logs)

### 2026-10-12 — Event brief update
- **Before:** Existing site
- **Change (what/how):** Added animated stockings/tree, #visit section (map, directions, Telegram), Register banner and /register page
- **Why:** User pasted updated event details
- **MVP alignment:** Keeps existing content
- **Verified / Not verified:** Not recorded

## Git timeline (auto-extracted, newest first; 2 commits total)
| Date | Commit | Message |
|---|---|---|
| 2026-10-12 | `a204dbb` | updated site design and added features |
| 2026-10-02 | `003348f` | initial christmas theme website commit |

## New entries below this line

### 2026-11-10 — Registration backend check, Google Form hookup, bigger fonts
- **Before:** Both forms (home RSVP popup, /register) only set a client-side "submitted" flag; no backend, nothing saved, no spreadsheet. Fonts 7–20px in many places.
- **Change (what/how):** Added `app/api/submit/route.ts` (server-side POST to a Google Form `formResponse` URL; IDs from env), `.env.example`, wired both forms (named inputs, fetch, sending/error states). Scaled every `font-size` <=20px in `globals.css` by 1.2x (37 values).
- **Why:** User asked whether the backend works / is connected to a sheet, offered a Google Form, and asked for slightly bigger fonts.
- **MVP alignment:** Additive; register page and content kept.
- **Verified / Not verified:** `tsc --noEmit` clean. NOT verified: real submission to Google (needs user's form URL + entry IDs in `.env.local`), visual check of larger fonts, `next build`.
