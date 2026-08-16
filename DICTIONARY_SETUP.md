# Dictionary Setup for Sanskrit Studio V9

V9 already includes a starter `dictionary.json`.

## Recommended source
The Cologne Digital Sanskrit Dictionaries (CDSL) provide downloadable Sanskrit dictionary data, including XML files whose headwords are commonly encoded in SLP1.

Start with ONE dictionary, such as Monier-Williams or Apte.

## V9 JSON format
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

`word` and `meaning` are required. `iast`, `grammar`, and `source` are strongly recommended.

## Workflow
1. Download one dictionary dataset from CDSL.
2. Parse the XML entries.
3. Convert each SLP1 headword to IAST.
4. Convert the same headword to Devanāgarī.
5. Convert the definition markup to readable plain text.
6. Output one JSON object per entry using the format above.
7. Save it as `dictionary.json`.
8. Put it beside `index.html`.
9. Commit/push to GitHub.
10. Reload Sanskrit Studio. The Dictionary tab shows the new entry count.

## Size
A large single JSON file can be slow on phones. Start with one dictionary. If it gets huge, split it into indexed chunks in a later version.

Keep source attribution and comply with the data source's license/terms.
