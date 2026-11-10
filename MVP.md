# MVP — EnrootGrp1

> Backfilled 2026-10-28 (curated from Claude Vault Memory logs + live files). Edit freely; log later changes below. Items marked _(reconstructed)_ come from past sessions, not from a fresh interview.

## Goal
Next.js Christmas student-event site (registration, info, directions) — enhanced from a pasted event brief while keeping all existing content.

## Users and context
Student event attendees.

## Requirements (MUST) _(reconstructed — tick only when verified)_
- [ ] Keep all existing content
- [ ] Info poster feel with date/time/place
- [ ] Visit-us section with map and Telegram contact
- [ ] Register-my-room banner and /register page

## Requirements (SHOULD / later)
_none recorded_

## Out of scope
_none recorded_

## Constraints
- Additive changes only

## Acceptance criteria
- A new model can run the project from HANDOFF.md and each MUST above can be demonstrated. _(Specific acceptance tests: unknown — confirm with the user.)_

## Change requests log
| Date | Requested by | Change | Status |
|---|---|---|---|
| 2026-10-28 | system | Backfilled MVP from history | done |
| 2026-11-10 | user | Check whether registration backend works / is connected to a spreadsheet; user can connect a Google Form (Sheet) | done (found none; added /api/register -> Google Form, needs user's form IDs in .env.local) |
| 2026-11-10 | user | Make fonts slightly bigger | done (px font sizes <=20px scaled ~1.2x) |
