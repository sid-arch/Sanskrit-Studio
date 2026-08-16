# Sanskrit Studio V10 — Complete Rebuild

V10 is a clean rebuild of Sanskrit Studio as a browser-only Sanskrit writing environment.

## Put these files together in one folder

- `index.html`
- `styles.css`
- `app.js`
- `dictionary.json`
- `FSL_logo.png` ← add your official logo
- `README.md`
- `DICTIONARY_SETUP.md`

There is **no `/docs` folder requirement**. All site files are designed to live together.

## What V10 includes

### Writing
- Multiple document tabs
- Double-click tab names to rename
- Rich text editor
- Bold
- Italic
- Underline
- Highlight
- Alignment
- Bullet and numbered lists
- Clear formatting
- Text sizing
- Undo/redo through browser editing shortcuts

### Saving
- IndexedDB document storage
- Autosave
- Visible `Saving…` → `Saved locally` status
- Reload persistence
- Hard reload persistence
- Browser restart persistence
- Device restart persistence on the same browser/device
- Workspace export/import backup

### History
- Rebuilt History workflow
- Opening History saves the current document first
- Creates a current snapshot before showing the list
- Automatic snapshots while writing
- Restore an older version
- Current version is protected before restore
- Maximum 30 snapshots per document

### Trash
- Closing a document sends it to Recently Deleted
- Restore documents
- Permanently delete documents
- Sanskrit Studio always ensures Write has at least one document

### Sanskrit input
- Direct Devanāgarī typing
- Stable floating Sanskrit keyboard
- Keyboard moves only when dragging the dedicated title bar
- Movement threshold prevents accidental jumps
- Reset-position button
- Minimize
- Close/reopen
- Position remembered
- No Recent row
- Roman / IAST → Devanāgarī composer
- Easy aliases like `aa`, `ii`, `.r`, `.n`, `.s`, `.m`, `.h`
- Live Devanāgarī → IAST view

### Dictionary
- Separate Dictionary section
- Search Devanāgarī
- Search IAST
- Right-click selected Sanskrit word → Lookup
- Toolbar selected-word lookup
- Dictionary result → Insert into current document
- Loads `dictionary.json`

### UI
- Entire V10 UI rebuilt
- Consistent inline SVG icon system
- Dark, Light, Paper themes
- Rounded FSL logo in header
- Rounded FSL logo in footer
- Settings modal
- Detailed searchable Help side drawer
- Responsive phone/tablet layout
- No Focus mode

## GitHub Pages

If all files are in the repository root:

1. GitHub repository → **Settings**
2. **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main**
5. Folder: **/ (root)**
6. Save

Then add your official logo as:

`FSL_logo.png`

## Important storage note

IndexedDB is local to a browser/device.

Your documents survive:
- reloads
- hard reloads
- closing and reopening the browser
- restarting the device

They do **not** automatically appear on another device.

Use **Settings → Export Workspace** to move or back up documents.

## Keyboard shortcuts

- Ctrl/Cmd + B → Bold
- Ctrl/Cmd + I → Italic
- Ctrl/Cmd + U → Underline
- Ctrl/Cmd + Z → Undo
- Ctrl/Cmd + Shift + Z → Redo
- Ctrl/Cmd + S → Save now
- Ctrl/Cmd + N → New document
- Ctrl/Cmd + K → Toggle Sanskrit keyboard
- Ctrl/Cmd + Shift + D → Lookup selected word
