# Sanskrit Studio V11 — Fixed Keyboard Edition

V11 keeps the complete V10 writing environment, but rebuilds the Sanskrit keyboard as a stable bottom dock.

## Put these files together in one folder

- `index.html`
- `styles.css`
- `app.js`
- `dictionary.json`
- `FSL_logo.png` ← add your official logo
- `README.md`
- `DICTIONARY_SETUP.md`

## V11 keyboard behavior

- Fixed to the bottom of the screen
- Never draggable
- Never changes position accidentally
- Full Sanskrit keyboard
- Vowels
- Consonants
- Mātrās and signs
- Common conjuncts
- Sanskrit numerals
- No Recent row
- Minimize button
- Close button
- Header button reopens it
- Ctrl/Cmd+K toggles it
- Open/closed state is remembered
- Minimized state is remembered
- Editor/page automatically gets bottom spacing so the keyboard does not cover content
- On phones/tablets it becomes a full-width bottom dock

## Full feature set retained

### Write
- Multiple document tabs
- Double-click tab name to rename
- Rich-text editing
- Bold
- Italic
- Underline
- Highlight
- Alignment
- Bullet lists
- Numbered lists
- Text sizing
- Clear formatting

### Sanskrit input
- Direct Devanāgarī
- Roman/IAST → Devanāgarī composer
- Easy Roman aliases
- Live Devanāgarī → IAST panel

### Saving
- IndexedDB
- Autosave
- Saving / Saved locally indicator
- Reload persistence
- Hard reload persistence
- Browser restart persistence
- Device restart persistence on the same browser/device

### History
- Current document is saved before History opens
- Fresh snapshot created when History opens
- Automatic snapshots while writing
- Restore old versions
- Current version protected before restore
- Up to 30 snapshots per document

### Trash
- Closing a document moves it to Recently Deleted
- Restore documents
- Permanently delete documents

### Dictionary
- Devanāgarī search
- IAST search
- Right-click selected word → Dictionary
- Toolbar lookup
- Dictionary → Editor insertion
- Local `dictionary.json`

### Workspace
- Export Workspace
- Import Workspace
- Settings modal
- Searchable Help drawer
- Dark / Light / Paper themes
- Consistent SVG icons
- Rounded FSL logo in header and footer
- No Focus mode
- No Recent-character row

## GitHub Pages

If all files live in the repository root:

1. Repository → Settings
2. Pages
3. Deploy from a branch
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

Add your official logo as `FSL_logo.png`.


## Full Monier-Williams dictionary included

Converted from the supplied Cologne `mw.xml` dataset.

- 193,907 unique searchable headwords
- 47 on-demand JSON chunks
- Devanāgarī, IAST, and original SLP1 headwords
- multiple senses preserved
- grammar labels where available
- source attribution retained

The app loads `dictionary_manifest.json` on startup and downloads only the relevant `dict_*.json` chunk during a search. All dictionary files stay in the same folder as `index.html`.
