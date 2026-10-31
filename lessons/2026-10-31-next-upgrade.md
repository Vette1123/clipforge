# Next upgrade

## What

Next 16.2.6 to 16.4.3 and every package updated within range. `pnpm audit --prod` went from
33 findings, 5 critical, to 0. `pnpm lint` works again on a native flat ESLint config.

## Mistakes

- **The repo sat on an old Next with no alerts on.** Nothing reported the critical advisories
  until a sweep of other repos named this one.
- **Swapped `next lint` for `eslint .` and assumed that was all.** The old compat config then
  failed to load under ESLint 9, so the config had to change too.

## What worked

Building straight after the upgrade, before touching lint.

## Rules

Dependabot alerts stay on for every repo that deploys.
