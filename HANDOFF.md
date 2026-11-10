# HANDOFF — EnrootGrp1

_Last updated: 2026-11-10 · by: Claude (Sonnet 5.5)_

## Update 2026-11-10
- Registration was frontend-only (nothing saved). Now `POST /api/submit` forwards to a Google Form (responses land in its linked Sheet). To go live: create the form(s), copy `.env.example` to `.env.local`, fill URL + `entry.N` ids, restart dev. Without env the forms show an error (503).
- Fonts: every `font-size` <=20px in globals.css scaled 1.2x.
- Not verified: live Google submission, visual check of fonts, `next build`.

## Status in one paragraph
Current state per last recorded session: see 'Verified / Not verified' and B&A.md. Baseline before Claude work: Existing Christmas event site.

## How to run / build / test
Next.js app (`app/`); `npm install && npm run dev`. **Verify against package.json.**

## Where things are
- Root: `C:\Users\Amir Rahman\Documents\GitHub\EnrootGrp1`
- Top level: `.gitignore`, `.npm-cache/`, `README.md`, `app/`, `next-env.d.ts`, `next.config.ts`, `package-lock.json`, `package.json`, `public/`, `tsconfig.json`
- Manifests: package.json
- Git: branch `main`, 2 commits; latest: 2026-10-12 a204dbb updated site design and added features; uncommitted entries: 0

## Decisions in force
- Enhance, don't replace (user)

## Known problems & mistakes to avoid
_none recorded_

## Verified / Not verified
**Not verified:**
- Build/lint after the changes (unknown)

## Open questions
- Confirm the reconstructed MVP with the user.

## Next actions (ordered)
1. Confirm the event details in the pasted brief are reflected

## Read first
- `MVP.md`, `B&A.md`
- Memory record: `Claude Vault\Memory\Log - Software and Data Projects.md` (see the project record)
- `Claude Vault\Agent Harness\README.md` (skills), `Claude Vault\Memory\README.md`
