# Dictionary Setup — Sanskrit Studio V10

V10 reads a local file named:

`dictionary.json`

from the same folder as `index.html`.

A starter dictionary is already included so the Dictionary section works immediately.

## Expected JSON format

```json
[
  {
    "word": "धर्म",
    "iast": "dharma",
    "meaning": "duty, law, right conduct...",
    "grammar": "noun",
    "source": "Monier-Williams"
  }
]
```

### Required
- `word`
- `meaning`

### Recommended
- `iast`
- `grammar`
- `source`

## Full dictionary plan

For the large-dictionary conversion, use an open Sanskrit lexicon source and transform the data into this format.

A strong source is the Cologne Digital Sanskrit Dictionaries project.

Good first dictionaries:
- Monier-Williams Sanskrit-English Dictionary
- Apte Sanskrit-English Dictionary

Do **one dictionary first**. Do not merge dozens of dictionaries on the first pass.

## Conversion workflow

1. Obtain the dictionary source data.
2. Read each Sanskrit headword.
3. Convert its source transliteration (often SLP1) to IAST.
4. Convert the same headword to Devanāgarī.
5. Extract/clean the English definition.
6. Preserve grammar information where available.
7. Preserve the source dictionary name.
8. Build a JSON object for each entry.
9. Save the final array as `dictionary.json`.
10. Replace the starter file.
11. Push to GitHub.
12. Reload Sanskrit Studio.

V10 will automatically report the number of dictionary entries loaded.

## Large-file optimization

A very large dictionary may become slow on phones because the current V10 implementation loads the complete JSON file into memory.

If the full dictionary becomes too large, the next optimization should be a chunked dictionary structure such as:

- `dictionary-a.json`
- `dictionary-k.json`
- `dictionary-g.json`
- etc.

or a compact indexed format.

That optimization can still remain fully browser-only and $0.
