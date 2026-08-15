# Sanskrit Studio V5

A browser-only Sanskrit typing and live transcription workspace designed for GitHub Pages.

## What V5 includes

- Direct Devanāgarī typing
- Full on-screen Sanskrit keyboard with all core letters visible at once
- Vowels, consonants, mātrās, signs, punctuation, numbers, and common conjuncts
- Live Sanskrit microphone transcription using the browser Web Speech API with `sa-IN`
- Chrome-first compatibility note
- Dark/light mode
- Devanāgarī → IAST live view
- Optional IAST → Devanāgarī conversion
- Undo/redo
- Find/replace
- Autosave in browser localStorage
- Copy
- Character/word counts
- Audio file upload and playback for common formats
- TXT, Word-compatible DOC, PDF via browser print, SRT, VTT, and CSV export
- No Python backend
- No Hugging Face
- No RunPod
- No API keys

## Important limitation

The browser Web Speech API can transcribe microphone input live, but it does **not** provide a standard way to pass an uploaded MP3/WAV file into SpeechRecognition.

Therefore V5 supports uploaded audio playback, but automatic uploaded-file transcription is intentionally not faked. That feature would require either:
1. a separate speech-recognition API/backend, or
2. a browser-side speech model.

## Deploy to GitHub Pages

1. Create or open your GitHub repository.
2. Upload the contents of this project.
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/docs**.
6. Save.
7. Open the GitHub Pages URL GitHub gives you.

The site requires HTTPS for microphone access. GitHub Pages provides HTTPS automatically.

## Best browser

Google Chrome / Chromium-based browsers are the primary target for live speech recognition.

Typing/editor features work independently of speech support.
