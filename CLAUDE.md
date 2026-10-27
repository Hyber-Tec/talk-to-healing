# CLAUDE.md: Talk To Heal landing page

Read `README.md` for the stack, builds, and where content lives, and `AGENTS.md` for the Next.js version notes.
The rules below are strict and apply to every developer and every AI session.

## Branches and pull requests

- `main` is reached only through a pull request with CI green.
- A session works on a branch, opens the pull request, and says so.
- It never pushes to `main` and never merges unless the owner asks for exactly that.

## Accounts

- Commit and push with your own personal GitHub account, never a shared or work account.
- If your global git identity is another account, set `user.name` and `user.email` in this repository's `.git/config`.
- Machine-specific setup goes in `CLAUDE.local.md` at the repository root; it is git-ignored.

## UI

- shadcn/ui components, with icons from react-icons only (swap any `lucide-react` import a shadcn component brings in).
- Brand colors are the logo's own: ink `#294B52` and sand `#DBBC90`, on cream. They are defined once in `src/app/globals.css`.
- Never redraw, recolor, or retype the logo. Use the files in `public/brand/`.
- Every animation must respect reduced motion.

## Content and honesty

- Every fact comes from the practice and lives in `src/lib/site.ts`.
- Never invent testimonials, ratings, outcomes, or credentials. Counseling ethics codes restrict soliciting client testimonials.
- Sample data (like the parked portal report) must be labeled as illustrative on screen.
- The booking flow records preferences only. Never show invented availability, and never tell a visitor a request was sent when it was not.
- Keep the crisis lines (988, 911, Georgia Crisis & Access Line) in the footer.

## Secrets and privacy

- Never commit API keys, tokens, passwords, or `.env` files.
- This repository is public. Never commit client-internal details (schedules, money, client information). Public facts from the practice's own website are fine.

## Commits

- Commits carry no attribution trailers: no `Co-authored-by` line, no session line, and no "generated with" footer, in commit messages or pull request bodies.
- Conventional Commits v1.0.0: `<type>[(scope)][!]: <imperative description>`, then a body and footers.
  Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `build`, `ci`, `style`.
- One commit per meaningful, self-contained piece of work. Never commit per file or per review round.
