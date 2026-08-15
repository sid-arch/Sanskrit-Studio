# Sanskrit Studio V6

A browser-only Sanskrit typing and live transcription workspace designed for GitHub Pages.

## What V6 includes

- Direct Devanāgarī typing
- Full on-screen Sanskrit keyboard with all core letters visible at once
- Vowels, consonants, mātrās, signs, punctuation, numbers, and common conjuncts
- Live Sanskrit microphone transcription using the browser Web Speech API with `sa-IN`
- Small Chrome compatibility note in the UI
- Dark/light mode
- Devanāgarī → IAST live view
- Optional IAST → Devanāgarī conversion
- Undo/redo
- Find/replace
- Autosave in browser localStorage
- Copy
- Character/word counts
- TXT, Word-compatible DOC, PDF via browser print, SRT, VTT, and CSV export
- No audio upload
- No Python backend
- No Hugging Face
- No RunPod
- No API keys

## Deploy to GitHub Pages

1. Upload the project to your GitHub repository.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose branch **main** and folder **/docs**.
5. Save.
6. Open the GitHub Pages URL GitHub gives you.

GitHub Pages provides HTTPS automatically, which is required for microphone access.

## Best browser

Google Chrome / Chromium-based browsers are the primary target for live speech recognition.

Typing/editor features work independently of speech support.
