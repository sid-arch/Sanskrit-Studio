
(() => {
  const $ = id => document.getElementById(id);
  const editor = $("editor");
  const iastView = $("iastView");
  const inputMode = $("inputMode");
  const speechSupport = $("speechSupport");
  const micBtn = $("micBtn");
  const stopBtn = $("stopBtn");
  const interimText = $("interimText");
  const themeBtn = $("themeBtn");
  const fontSize = $("fontSize");

  let recognition = null;
  let listening = false;
  let history = [""];
  let historyIndex = 0;
  let iastBuffer = "";

  const groups = {
    vowels: ["अ","आ","इ","ई","उ","ऊ","ऋ","ॠ","ऌ","ॡ","ए","ऐ","ओ","औ"],
    consonants: [
      "क","ख","ग","घ","ङ","च","छ","ज","झ","ञ","ट","ठ","ड","ढ","ण",
      "त","थ","द","ध","न","प","फ","ब","भ","म","य","र","ल","व","श","ष","स","ह"
    ],
    signs: ["ा","ि","ी","ु","ू","ृ","ॄ","ॢ","ॣ","े","ै","ो","ौ","्","ं","ः","ँ","़","ऽ","ॐ"],
    conjuncts: ["क्ष","त्र","ज्ञ","श्र","द्य","द्व","त्व","स्त","स्व","ह्य","द्य","प्र","ग्र","क्र","ब्र","भ्र"],
    numbers: ["०","१","२","३","४","५","६","७","८","९","।","॥","॰","ॱ"]
  };

  const independentVowels = {
    "a":"अ","ā":"आ","i":"इ","ī":"ई","u":"उ","ū":"ऊ","ṛ":"ऋ","ṝ":"ॠ","ḷ":"ऌ",
    "e":"ए","ai":"ऐ","o":"ओ","au":"औ"
  };
  const matras = {
    "a":"","ā":"ा","i":"ि","ī":"ी","u":"ु","ū":"ू","ṛ":"ृ","ṝ":"ॄ","ḷ":"ॢ",
    "e":"े","ai":"ै","o":"ो","au":"ौ"
  };
  const consonantMap = {
    "k":"क","kh":"ख","g":"ग","gh":"घ","ṅ":"ङ",
    "c":"च","ch":"छ","j":"ज","jh":"झ","ñ":"ञ",
    "ṭ":"ट","ṭh":"ठ","ḍ":"ड","ḍh":"ढ","ṇ":"ण",
    "t":"त","th":"थ","d":"द","dh":"ध","n":"न",
    "p":"प","ph":"फ","b":"ब","bh":"भ","m":"म",
    "y":"य","r":"र","l":"ल","v":"व","ś":"श","ṣ":"ष","s":"स","h":"ह"
  };
  const specials = {"ṃ":"ं","ṁ":"ं","ḥ":"ः","m̐":"ँ","'":"ऽ","|":"।","||":"॥"};

  const devaToIast = {
    "अ":"a","आ":"ā","इ":"i","ई":"ī","उ":"u","ऊ":"ū","ऋ":"ṛ","ॠ":"ṝ","ऌ":"ḷ","ॡ":"ḹ","ए":"e","ऐ":"ai","ओ":"o","औ":"au",
    "क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"ṅ","च":"c","छ":"ch","ज":"j","झ":"jh","ञ":"ñ",
    "ट":"ṭ","ठ":"ṭh","ड":"ḍ","ढ":"ḍh","ण":"ṇ","त":"t","थ":"th","द":"d","ध":"dh","न":"n",
    "प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"ś","ष":"ṣ","स":"s","ह":"h",
    "ा":"ā","ि":"i","ी":"ī","ु":"u","ू":"ū","ृ":"ṛ","ॄ":"ṝ","ॢ":"ḷ","ॣ":"ḹ","े":"e","ै":"ai","ो":"o","ौ":"au",
    "ं":"ṃ","ः":"ḥ","ँ":"m̐","ऽ":"'","।":" |","॥":" ||","०":"0","१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9"
  };
  const consonantsSet = new Set(Object.values(consonantMap));

  function renderKeyboard() {
    Object.entries(groups).forEach(([id, arr]) => {
      const box = $(id);
      arr.forEach(ch => {
        const b = document.createElement("button");
        b.className = "key";
        b.textContent = ch;
        b.title = ch;
        b.addEventListener("click", () => insertAtCursor(ch));
        box.appendChild(b);
      });
    });
  }

  function insertAtCursor(text) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.setRangeText(text, start, end, "end");
    editor.focus();
    sync(true);
  }

  function pushHistory(value) {
    if (history[historyIndex] === value) return;
    history = history.slice(0, historyIndex + 1);
    history.push(value);
    if (history.length > 100) history.shift();
    historyIndex = history.length - 1;
  }

  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      editor.value = history[historyIndex];
      sync(false);
    }
  }
  function redo() {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      editor.value = history[historyIndex];
      sync(false);
    }
  }

  function devanagariToIAST(text) {
    let out = "";
    const chars = Array.from(text);
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (consonantsSet.has(ch)) {
        const next = chars[i+1];
        if (next === "्") {
          out += devaToIast[ch] || ch;
          i++;
        } else if (next && ["ा","ि","ी","ु","ू","ृ","ॄ","ॢ","ॣ","े","ै","ो","ौ"].includes(next)) {
          out += (devaToIast[ch] || ch) + (devaToIast[next] || "");
          i++;
        } else {
          out += (devaToIast[ch] || ch) + "a";
        }
      } else if (ch === "्") {
        continue;
      } else {
        out += devaToIast[ch] ?? ch;
      }
    }
    return out.replace(/\s+\|/g, " |");
  }

  function normalizeIAST(s) {
    return s
      .replace(/aa/g,"ā").replace(/ii/g,"ī").replace(/uu/g,"ū")
      .replace(/\.r/g,"ṛ").replace(/\.n/g,"ṇ").replace(/~n/g,"ñ")
      .replace(/"n/g,"ṅ").replace(/sh/g,"ś").replace(/\.s/g,"ṣ")
      .replace(/\.m/g,"ṃ").replace(/\.h/g,"ḥ");
  }

  function iastToDevanagari(text) {
    text = normalizeIAST(text.normalize("NFC"));
    const vowels = ["ai","au","ā","ī","ū","ṝ","ṛ","ḷ","e","o","a","i","u"];
    const cons = ["kh","gh","ch","jh","ṭh","ḍh","th","dh","ph","bh","ṅ","ñ","ṭ","ḍ","ṇ","ś","ṣ","k","g","c","j","t","d","n","p","b","m","y","r","l","v","s","h"];
    let out = "";
    let i = 0;
    let pendingConsonant = false;

    const matchFrom = (arr) => arr.find(x => text.startsWith(x, i));

    while (i < text.length) {
      const c = text[i];

      if (/\s/.test(c)) {
        out += c;
        pendingConsonant = false;
        i++;
        continue;
      }

      if (text.startsWith("||", i)) { out += "॥"; i += 2; pendingConsonant = false; continue; }
      if (text.startsWith("|", i)) { out += "।"; i++; pendingConsonant = false; continue; }

      let con = matchFrom(cons);
      if (con) {
        if (pendingConsonant) out += "्";
        out += consonantMap[con];
        i += con.length;
        pendingConsonant = true;
        continue;
      }

      let vow = matchFrom(vowels);
      if (vow) {
        if (pendingConsonant) {
          out += matras[vow] ?? "";
        } else {
          out += independentVowels[vow] ?? vow;
        }
        i += vow.length;
        pendingConsonant = false;
        continue;
      }

      let specialKey = Object.keys(specials).sort((a,b)=>b.length-a.length).find(x => text.startsWith(x, i));
      if (specialKey) {
        out += specials[specialKey];
        i += specialKey.length;
        pendingConsonant = false;
        continue;
      }

      if (pendingConsonant) pendingConsonant = false;
      out += c;
      i++;
    }
    return out;
  }

  function sync(addHistory = true) {
    const text = editor.value;
    iastView.value = devanagariToIAST(text);
    const chars = Array.from(text).length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    $("counts").textContent = `${chars} characters • ${words} words`;
    localStorage.setItem("sanskritStudioV5Text", text);
    if (addHistory) pushHistory(text);
  }

  function setupSpeech() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      speechSupport.textContent = "Live speech unavailable in this browser";
      speechSupport.classList.add("bad");
      micBtn.disabled = true;
      return;
    }

    speechSupport.textContent = "Live speech available • sa-IN";
    recognition = new SR();
    recognition.lang = "sa-IN";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      listening = true;
      micBtn.classList.add("listening");
      micBtn.textContent = "🎙 Listening…";
      micBtn.disabled = true;
      stopBtn.disabled = false;
      interimText.textContent = "Listening…";
    };

    recognition.onresult = (event) => {
      let interim = "";
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += t + " ";
        else interim += t;
      }
      interimText.textContent = interim || "…";
      if (finalText.trim()) {
        const prefix = editor.value && !/\s$/.test(editor.value) ? " " : "";
        editor.value += prefix + finalText.trim();
        editor.selectionStart = editor.selectionEnd = editor.value.length;
        sync(true);
      }
    };

    recognition.onerror = (event) => {
      interimText.textContent = `Speech error: ${event.error}`;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        speechSupport.textContent = "Microphone permission blocked";
        speechSupport.classList.add("bad");
      }
    };

    recognition.onend = () => {
      listening = false;
      micBtn.classList.remove("listening");
      micBtn.textContent = "🎙 Start Live Sanskrit";
      micBtn.disabled = false;
      stopBtn.disabled = true;
      interimText.textContent = "—";
    };
  }

  function startSpeech() {
    if (!recognition || listening) return;
    recognition.lang = "sa-IN";
    try { recognition.start(); }
    catch (e) { interimText.textContent = e.message; }
  }

  function stopSpeech() {
    if (recognition && listening) recognition.stop();
  }

  function downloadBlob(filename, blob) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
  }

  function exportFile(type) {
    const text = editor.value;
    if (type === "txt") {
      downloadBlob("sanskrit-transcript.txt", new Blob([text], {type:"text/plain;charset=utf-8"}));
    } else if (type === "csv") {
      const rows = [["Script","Text"],["Devanagari",text],["IAST",iastView.value]];
      const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
      downloadBlob("sanskrit-transcript.csv", new Blob([csv], {type:"text/csv;charset=utf-8"}));
    } else if (type === "srt") {
      const srt = `1\n00:00:00,000 --> 99:59:59,999\n${text}\n`;
      downloadBlob("sanskrit-transcript.srt", new Blob([srt], {type:"application/x-subrip;charset=utf-8"}));
    } else if (type === "vtt") {
      const vtt = `WEBVTT\n\n00:00.000 --> 99:59:59.999\n${text}\n`;
      downloadBlob("sanskrit-transcript.vtt", new Blob([vtt], {type:"text/vtt;charset=utf-8"}));
    } else if (type === "doc") {
      const html = `<!doctype html><html><head><meta charset="utf-8"></head><body><div style="font-family:'Noto Sans Devanagari',serif;font-size:20pt;white-space:pre-wrap">${escapeHtml(text)}</div></body></html>`;
      downloadBlob("sanskrit-transcript.doc", new Blob([html], {type:"application/msword"}));
    } else if (type === "pdf") {
      const w = window.open("", "_blank");
      if (!w) return alert("Pop-up blocked. Allow pop-ups, then try PDF again.");
      w.document.write(`<html><head><title>Sanskrit Transcript</title><meta charset="utf-8"><style>body{font-family:'Noto Sans Devanagari','Devanagari Sangam MN',serif;font-size:22px;line-height:1.7;padding:40px;white-space:pre-wrap}</style></head><body>${escapeHtml(text)}</body></html>`);
      w.document.close();
      w.focus();
      setTimeout(() => w.print(), 250);
    }
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  editor.addEventListener("input", () => {
    if (inputMode.value === "iast") {
      iastBuffer = editor.value;
    }
    sync(true);
  });

  inputMode.addEventListener("change", () => {
    if (inputMode.value === "iast") {
      const roman = prompt("Type or paste IAST Sanskrit:");
      if (roman !== null && roman.trim() !== "") {
        insertAtCursor(iastToDevanagari(roman));
      }
      inputMode.value = "devanagari";
    }
  });

  themeBtn.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme === "dark";
    document.documentElement.dataset.theme = dark ? "light" : "dark";
    localStorage.setItem("sanskritStudioV5Theme", dark ? "light" : "dark");
    themeBtn.textContent = dark ? "☾" : "☀";
  });

  fontSize.addEventListener("change", () => {
    editor.style.fontSize = fontSize.value + "px";
  });

  $("undoBtn").addEventListener("click", undo);
  $("redoBtn").addEventListener("click", redo);
  $("copyBtn").addEventListener("click", async () => {
    await navigator.clipboard.writeText(editor.value);
    $("copyBtn").textContent = "Copied";
    setTimeout(() => $("copyBtn").textContent = "Copy", 900);
  });
  $("clearBtn").addEventListener("click", () => {
    if (editor.value && !confirm("Clear the editor?")) return;
    editor.value = "";
    sync(true);
  });

  $("findBtn").addEventListener("click", () => $("findBar").classList.toggle("hidden"));
  $("closeFindBtn").addEventListener("click", () => $("findBar").classList.add("hidden"));
  $("replaceBtn").addEventListener("click", () => {
    const find = $("findInput").value;
    if (!find) return;
    editor.value = editor.value.replace(find, $("replaceInput").value);
    sync(true);
  });
  $("replaceAllBtn").addEventListener("click", () => {
    const find = $("findInput").value;
    if (!find) return;
    editor.value = editor.value.split(find).join($("replaceInput").value);
    sync(true);
  });

  micBtn.addEventListener("click", startSpeech);
  stopBtn.addEventListener("click", stopSpeech);

  $("audioInput").addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const player = $("audioPlayer");
    player.src = URL.createObjectURL(file);
    $("audioName").textContent = `${file.name} • ${(file.size/1024/1024).toFixed(2)} MB`;
    $("audioWrap").classList.remove("hidden");
  });

  document.querySelectorAll("[data-export]").forEach(btn => {
    btn.addEventListener("click", () => exportFile(btn.dataset.export));
  });

  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      e.shiftKey ? redo() : undo();
    }
  });

  renderKeyboard();
  setupSpeech();

  const savedTheme = localStorage.getItem("sanskritStudioV5Theme") || "dark";
  document.documentElement.dataset.theme = savedTheme;
  themeBtn.textContent = savedTheme === "dark" ? "☀" : "☾";

  editor.value = localStorage.getItem("sanskritStudioV5Text") || "";
  editor.style.fontSize = fontSize.value + "px";
  history = [editor.value];
  historyIndex = 0;
  sync(false);
})();
