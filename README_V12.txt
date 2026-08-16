# Sanskrit Studio V12 — Dictionary Patch

Replace ONLY these files in your existing Sanskrit Studio repository:

- `index.html`
- `app.js`
- `styles.css`

Do **not** replace or re-upload:

- `dictionary_manifest.json`
- any `dict_*.json` files
- `FSL_logo.png`

Your existing 193,907-entry Monier-Williams dictionary stays exactly where it is.

## What V12 changes

- Exact dictionary match is forced to the top.
- Exact Devanāgarī match > exact IAST match > starts-with > contains.
- Shorter compounds rank before longer compounds when relevance is equal.
- 20 results are shown initially.
- `Load more` shows the next 20.
- Main dictionary definition is now a clean concise meaning.
- Common Sanskrit words have curated concise definitions.
- Other words get an automatically cleaned concise definition from Monier-Williams senses.
- Original Monier-Williams senses remain available under `Full Monier-Williams entry`.
- Grammar labels are cleaned where possible.
- Exact matches receive a visual badge.
- Copy Entry copies the concise definition rather than the raw MW line.

## Suggested tests

Search:

- `guru`
- `गुरु`
- `dharma`
- `धर्म`
- `kṛṣṇa`
- `कृष्ण`
- `jñāna`
- `ज्ञान`
- `ātman`
- `आत्मन्`

Expected behavior for `guru`:

1. `गुरु` is result #1.
2. Main meaning:
   `Teacher, mentor, or spiritual guide; also heavy, weighty, important, or venerable.`
3. Compounds such as `गुरुत्व` appear later.
4. Full original MW senses remain expandable.
