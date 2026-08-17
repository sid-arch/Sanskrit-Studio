
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  // -------------------------
  // ICON SYSTEM
  // -------------------------
  const ICONS = {
    "keyboard": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h.01M11 9h.01M15 9h.01M19 9h.01M7 13h.01M11 13h.01M15 13h.01M19 13h.01M8 17h8"/>',
    "settings": '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1V21H9.6v-.08a1.7 1.7 0 0 0-.4-1 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 3.8 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4H2V9.6h.08a1.7 1.7 0 0 0 1-.4 1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 8 3.8a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1V2h4v.08a1.7 1.7 0 0 0 .4 1 1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 8a1.7 1.7 0 0 0 .6 1 1.7 1.7 0 0 0 1 .4H21v4h-.08a1.7 1.7 0 0 0-1 .4 1.7 1.7 0 0 0-.52 1.2z"/>',
    "help": '<circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.4 2.4 0 1 1 3.65 2.04C12.55 11.55 12 12.1 12 13"/><path d="M12 17h.01"/>',
    "plus": '<path d="M12 5v14M5 12h14"/>',
    "history": '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>',
    "trash": '<path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/>',
    "align-left": '<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>',
    "align-center": '<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>',
    "align-right": '<path d="M4 6h16M10 10h10M4 14h16M10 18h10"/>',
    "list": '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    "list-ordered": '<path d="M10 6h10M10 12h10M10 18h10M4 5h1v3M4 11h2l-2 3h2M4 17h2v3H4"/>',
    "type": '<path d="M4 6V4h16v2M9 20h6M12 4v16"/>',
    "languages": '<path d="M5 8h8M9 4v4M6 12c2-2 3-4 3-4s1 2 3 4M14 20l4-9 4 9M16 16h4"/>',
    "book-open": '<path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v16H5.5A2.5 2.5 0 0 0 3 21.5zM21 5.5A2.5 2.5 0 0 0 18.5 3H13v16h5.5A2.5 2.5 0 0 1 21 21.5z"/>',
    "download": '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    "corner-down-left": '<path d="M9 10l-5 5 5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>',
    "copy": '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    "search": '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    "rotate-ccw": '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    "minus": '<path d="M5 12h14"/>',
    "x": '<path d="M6 6l12 12M18 6 6 18"/>',
    "package-down": '<path d="M12 22V12M8 16l4 4 4-4"/><path d="M21 16V8l-9-5-9 5v8"/><path d="M3.3 7.5 12 12l8.7-4.5"/>',
    "package-up": '<path d="M12 12V22M8 16l4-4 4 4"/><path d="M21 8l-9-5-9 5v8"/><path d="M3.3 7.5 12 12l8.7-4.5"/>',
    "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16h16V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    "code": '<path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/>',
    "file": '<path d="M14 2H6a2 2 0 0 0-2 2v16h16V8z"/><path d="M14 2v6h6"/>',
    "printer": '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>'
  };

  function renderIcons() {
    document.querySelectorAll("[data-icon]").forEach(el => {
      const body = ICONS[el.dataset.icon];
      if (!body) return;
      el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
    });
  }

  // -------------------------
  // CONSTANTS / STATE
  // -------------------------
  const DB_NAME = "SanskritStudio";
  const DB_VERSION = 14;
  const SNAPSHOT_MIN_INTERVAL = 45_000;
  const MAX_HISTORY_PER_DOCUMENT = 30;
  const SAVE_DELAY = 350;

  let db = null;
  let documents = [];
  let activeDocumentId = null;
  let dictionaryEntries = []; // starter fallback only
  let dictionaryManifest = null;
  const dictionaryChunkCache = new Map();
  let englishDictionaryManifest = null;
  const englishDictionaryChunkCache = new Map();

  // V12 dictionary result state
  let dictionarySearchResults = [];
  let dictionarySearchQuery = "";
  let dictionaryVisibleCount = 20;
  const DICTIONARY_PAGE_SIZE = 20;
  let lastEditorRange = null;
  let saveTimer = null;
  let lastSnapshotTime = 0;

  const defaultSettings = {
    theme: "dark",
    defaultInput: "direct",
    fontStyle: "sans",
    showIast: true,
    keyboardStartup: true,
    keyboard: {
      minimized: false,
      visible: true
    }
  };

  let settings = structuredClone(defaultSettings);

  const keyboardSets = {
    vowels: ["अ","आ","इ","ई","उ","ऊ","ऋ","ॠ","ऌ","ॡ","ए","ऐ","ओ","औ"],
    consonants: ["क","ख","ग","घ","ङ","च","छ","ज","झ","ञ","ट","ठ","ड","ढ","ण","त","थ","द","ध","न","प","फ","ब","भ","म","य","र","ल","व","श","ष","स","ह"],
    signs: ["ा","ि","ी","ु","ू","ृ","ॄ","ॢ","ॣ","े","ै","ो","ौ","्","ं","ः","ँ","ऽ","ॐ","।","॥"],
    conjuncts: ["क्ष","त्र","ज्ञ","श्र","द्य","द्व","त्व","स्त","स्व","ह्य","प्र","ग्र","क्र","ब्र","भ्र"],
    numbers: ["०","१","२","३","४","५","६","७","८","९"]
  };

  const devaToIastMap = {
    "अ":"a","आ":"ā","इ":"i","ई":"ī","उ":"u","ऊ":"ū","ऋ":"ṛ","ॠ":"ṝ","ऌ":"ḷ","ॡ":"ḹ","ए":"e","ऐ":"ai","ओ":"o","औ":"au",
    "क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"ṅ","च":"c","छ":"ch","ज":"j","झ":"jh","ञ":"ñ",
    "ट":"ṭ","ठ":"ṭh","ड":"ḍ","ढ":"ḍh","ण":"ṇ","त":"t","थ":"th","द":"d","ध":"dh","न":"n",
    "प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"ś","ष":"ṣ","स":"s","ह":"h",
    "ा":"ā","ि":"i","ी":"ī","ु":"u","ू":"ū","ृ":"ṛ","ॄ":"ṝ","ॢ":"ḷ","ॣ":"ḹ","े":"e","ै":"ai","ो":"o","ौ":"au",
    "ं":"ṃ","ः":"ḥ","ँ":"m̐","ऽ":"'","।":" |","॥":" ||",
    "०":"0","१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9"
  };

  const devanagariConsonants = new Set(keyboardSets.consonants);
  const independentVowels = {"a":"अ","ā":"आ","i":"इ","ī":"ई","u":"उ","ū":"ऊ","ṛ":"ऋ","ṝ":"ॠ","ḷ":"ऌ","ḹ":"ॡ","e":"ए","ai":"ऐ","o":"ओ","au":"औ"};
  const matras = {"a":"","ā":"ा","i":"ि","ī":"ी","u":"ु","ū":"ू","ṛ":"ृ","ṝ":"ॄ","ḷ":"ॢ","ḹ":"ॣ","e":"े","ai":"ै","o":"ो","au":"ौ"};
  const romanConsonants = {
    "k":"क","kh":"ख","g":"ग","gh":"घ","ṅ":"ङ",
    "c":"च","ch":"छ","j":"ज","jh":"झ","ñ":"ञ",
    "ṭ":"ट","ṭh":"ठ","ḍ":"ड","ḍh":"ढ","ṇ":"ण",
    "t":"त","th":"थ","d":"द","dh":"ध","n":"न",
    "p":"प","ph":"फ","b":"ब","bh":"भ","m":"म",
    "y":"य","r":"र","l":"ल","v":"व","ś":"श","ṣ":"ष","s":"स","h":"ह"
  };
  const romanSpecials = {"ṃ":"ं","ṁ":"ं","ḥ":"ः","m̐":"ँ","'":"ऽ","|":"।","||":"॥"};

  // -------------------------
  // DB HELPERS
  // -------------------------
  function reqPromise(req) {
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function txPromise(tx) {
    return new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }

  async function openDatabase() {
    db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const database = request.result;

        if (!database.objectStoreNames.contains("documents")) {
          database.createObjectStore("documents", { keyPath: "id" });
        }

        if (!database.objectStoreNames.contains("trash")) {
          database.createObjectStore("trash", { keyPath: "id" });
        }

        if (!database.objectStoreNames.contains("history")) {
          const history = database.createObjectStore("history", { keyPath: "id" });
          history.createIndex("documentId", "documentId", { unique: false });
        }

        if (!database.objectStoreNames.contains("meta")) {
          database.createObjectStore("meta", { keyPath: "key" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function getAll(storeName) {
    const tx = db.transaction(storeName, "readonly");
    return reqPromise(tx.objectStore(storeName).getAll());
  }

  async function put(storeName, value) {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(value);
    await txPromise(tx);
  }

  async function remove(storeName, key) {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).delete(key);
    await txPromise(tx);
  }

  async function getMeta(key) {
    const tx = db.transaction("meta", "readonly");
    return reqPromise(tx.objectStore("meta").get(key));
  }

  async function setMeta(key, value) {
    await put("meta", { key, value });
  }

  // -------------------------
  // UTILITIES
  // -------------------------
  function uid(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso || "";
    }
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function safeFileName(name) {
    return (name || "Sanskrit Document").replace(/[\\/:*?"<>|]/g, "-");
  }

  function htmlToText(html) {
    const box = document.createElement("div");
    box.innerHTML = html || "";
    return (box.innerText || box.textContent || "").replace(/\u00a0/g, " ");
  }

  function activeDocument() {
    return documents.find(doc => doc.id === activeDocumentId) || null;
  }

  function selectionText() {
    const selection = window.getSelection();
    return cleanDictionaryQuery(selection ? selection.toString() : "");
  }

  function downloadBlob(name, blob) {
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = name;
    document.body.appendChild(anchor);
    anchor.click();

    window.setTimeout(() => {
      URL.revokeObjectURL(anchor.href);
      anchor.remove();
    }, 800);
  }

  // -------------------------
  // SETTINGS
  // -------------------------
  async function loadSettings() {
    const record = await getMeta("settings");
    if (record?.value) {
      settings = {
        ...structuredClone(defaultSettings),
        ...record.value,
        keyboard: {
          ...structuredClone(defaultSettings.keyboard),
          ...(record.value.keyboard || {})
        }
      };
    }
  }

  async function saveSettings() {
    await setMeta("settings", settings);
  }

  function applySettings() {
    document.documentElement.dataset.theme = settings.theme || "dark";

    document.documentElement.style.setProperty(
      "--editor-font",
      settings.fontStyle === "serif"
        ? '"Noto Serif Devanagari","Devanagari Sangam MN",serif'
        : '"Noto Sans Devanagari","Kohinoor Devanagari","Devanagari Sangam MN",sans-serif'
    );

    $("themeSetting").value = settings.theme || "dark";
    $("defaultInputSetting").value = settings.defaultInput || "direct";
    $("fontStyleSetting").value = settings.fontStyle || "sans";
    $("showIastSetting").checked = settings.showIast !== false;
    $("keyboardStartupSetting").checked = settings.keyboardStartup !== false;

    $("iastPanel").classList.toggle("hidden", settings.showIast === false);
    $("inputModeSelect").value = settings.defaultInput || "direct";
    toggleRomanComposer();

    const shouldShowKeyboard = settings.keyboardStartup !== false && settings.keyboard.visible !== false;
    setKeyboardVisible(shouldShowKeyboard, { save: false });

    $("floatingKeyboard").classList.toggle("minimized", !!settings.keyboard.minimized);
    updateKeyboardOffset();
  }

  // -------------------------
  // DOCUMENTS
  // -------------------------
  async function loadDocuments() {
    documents = (await getAll("documents")).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (!documents.length) {
      await createDocument("Untitled 1", false);
      return;
    }

    const activeRecord = await getMeta("activeDocumentId");
    activeDocumentId = (
      activeRecord?.value &&
      documents.some(doc => doc.id === activeRecord.value)
    ) ? activeRecord.value : documents[0].id;

    renderDocumentTabs();
    loadActiveDocumentIntoEditor();
  }

  async function createDocument(title = null, focus = true) {
    const documentRecord = {
      id: uid("doc"),
      title: title || `Untitled ${documents.length + 1}`,
      html: "",
      createdAt: nowISO(),
      updatedAt: nowISO(),
      order: documents.length
    };

    documents.push(documentRecord);
    activeDocumentId = documentRecord.id;

    await put("documents", documentRecord);
    await setMeta("activeDocumentId", activeDocumentId);

    renderDocumentTabs();
    loadActiveDocumentIntoEditor();

    if (focus) $("editor").focus();
  }

  async function switchDocument(id) {
    if (id === activeDocumentId) return;

    await saveActiveDocumentNow();
    activeDocumentId = id;
    await setMeta("activeDocumentId", activeDocumentId);

    renderDocumentTabs();
    loadActiveDocumentIntoEditor();
  }

  async function renameDocument(id) {
    const doc = documents.find(item => item.id === id);
    if (!doc) return;

    const nextName = window.prompt("Rename document:", doc.title);
    if (nextName === null) return;

    const clean = nextName.trim();
    if (!clean) return;

    doc.title = clean;
    doc.updatedAt = nowISO();

    await put("documents", doc);
    renderDocumentTabs();
  }

  async function moveDocumentToTrash(id) {
    const doc = documents.find(item => item.id === id);
    if (!doc) return;

    if (id === activeDocumentId) {
      await saveActiveDocumentNow();
    }

    await put("trash", {
      ...doc,
      deletedAt: nowISO()
    });

    await remove("documents", id);

    documents = documents.filter(item => item.id !== id);

    if (!documents.length) {
      await createDocument("Untitled 1");
      return;
    }

    if (activeDocumentId === id) {
      activeDocumentId = documents[0].id;
      await setMeta("activeDocumentId", activeDocumentId);
    }

    renderDocumentTabs();
    loadActiveDocumentIntoEditor();
  }

  function renderDocumentTabs() {
    const container = $("documentTabs");
    container.innerHTML = "";

    documents.forEach(doc => {
      const tab = document.createElement("div");
      tab.className = `document-tab${doc.id === activeDocumentId ? " active" : ""}`;
      tab.dataset.id = doc.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", doc.id === activeDocumentId ? "true" : "false");

      const title = document.createElement("span");
      title.className = "document-tab-title";
      title.textContent = doc.title;
      title.title = "Double-click to rename";

      title.addEventListener("dblclick", (event) => {
        event.stopPropagation();
        renameDocument(doc.id);
      });

      const close = document.createElement("button");
      close.className = "document-tab-close";
      close.type = "button";
      close.title = "Move to Trash";
      close.innerHTML = "×";

      close.addEventListener("click", (event) => {
        event.stopPropagation();
        moveDocumentToTrash(doc.id);
      });

      tab.addEventListener("click", () => switchDocument(doc.id));

      tab.append(title, close);
      container.appendChild(tab);
    });
  }

  function loadActiveDocumentIntoEditor() {
    const doc = activeDocument();
    if (!doc) return;

    $("editor").innerHTML = doc.html || "";
    $("documentUpdated").textContent = doc.updatedAt
      ? `Last saved ${formatDate(doc.updatedAt)}`
      : "Autosaves locally";

    updateDerivedViews();
    captureEditorRange();
  }

  // -------------------------
  // SAVE / AUTOSAVE
  // -------------------------
  function setSaveIndicator(mode) {
    const indicator = $("saveIndicator");
    const text = $("saveIndicatorText");

    indicator.classList.remove("saving", "saved");

    if (mode === "saving") {
      indicator.classList.add("saving");
      text.textContent = "Saving…";
    } else {
      indicator.classList.add("saved");
      text.textContent = "Saved locally";
    }
  }

  function scheduleSave() {
    setSaveIndicator("saving");

    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(async () => {
      await saveActiveDocumentNow();
      maybeCreateAutomaticSnapshot();
    }, SAVE_DELAY);
  }

  async function saveActiveDocumentNow() {
    const doc = activeDocument();
    if (!doc) return;

    doc.html = $("editor").innerHTML;
    doc.updatedAt = nowISO();

    await put("documents", doc);

    $("documentUpdated").textContent = `Last saved ${formatDate(doc.updatedAt)}`;
    setSaveIndicator("saved");
  }

  // -------------------------
  // HISTORY
  // -------------------------
  async function createSnapshot({ force = false } = {}) {
    const doc = activeDocument();
    if (!doc) return;

    const html = $("editor").innerHTML;
    const snapshots = (await getAll("history"))
      .filter(item => item.documentId === doc.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (!force && snapshots[0]?.html === html) {
      return;
    }

    const snapshot = {
      id: uid("history"),
      documentId: doc.id,
      title: doc.title,
      html,
      createdAt: nowISO()
    };

    await put("history", snapshot);

    const refreshed = (await getAll("history"))
      .filter(item => item.documentId === doc.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    for (const extra of refreshed.slice(MAX_HISTORY_PER_DOCUMENT)) {
      await remove("history", extra.id);
    }

    lastSnapshotTime = Date.now();
  }

  async function maybeCreateAutomaticSnapshot() {
    if (Date.now() - lastSnapshotTime < SNAPSHOT_MIN_INTERVAL) return;
    await createSnapshot({ force: false });
  }

  async function openHistory() {
    // History was explicitly rebuilt in V10.
    await saveActiveDocumentNow();
    await createSnapshot({ force: true });
    await renderHistoryList();
    openModal("historyModal");
  }

  async function renderHistoryList() {
    const doc = activeDocument();
    const list = $("historyList");

    if (!doc) {
      list.innerHTML = `<div class="stack-empty">No active document.</div>`;
      return;
    }

    $("historySubtitle").textContent = `Snapshots for “${doc.title}”`;

    const snapshots = (await getAll("history"))
      .filter(item => item.documentId === doc.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    list.innerHTML = "";

    if (!snapshots.length) {
      list.innerHTML = `<div class="stack-empty">No snapshots yet.</div>`;
      return;
    }

    snapshots.forEach(snapshot => {
      const row = document.createElement("div");
      row.className = "stack-item";

      const textPreview = htmlToText(snapshot.html).replace(/\s+/g, " ").trim().slice(0, 115);

      row.innerHTML = `
        <div class="stack-item-main">
          <div class="stack-item-title">${escapeHTML(formatDate(snapshot.createdAt))}</div>
          <div class="stack-item-preview">${escapeHTML(textPreview || "(empty document)")}</div>
        </div>
        <div class="stack-item-actions">
          <button type="button" data-restore>Restore</button>
        </div>
      `;

      row.querySelector("[data-restore]").addEventListener("click", async () => {
        const confirmed = window.confirm(
          "Restore this version? Your current version will be saved to History first."
        );

        if (!confirmed) return;

        await saveActiveDocumentNow();
        await createSnapshot({ force: true });

        $("editor").innerHTML = snapshot.html;
        updateDerivedViews();
        await saveActiveDocumentNow();
        await createSnapshot({ force: true });

        closeAllModals();
      });

      list.appendChild(row);
    });
  }

  // -------------------------
  // TRASH
  // -------------------------
  async function openTrash() {
    await renderTrashList();
    openModal("trashModal");
  }

  async function renderTrashList() {
    const trash = (await getAll("trash"))
      .sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt));

    const list = $("trashList");
    list.innerHTML = "";

    if (!trash.length) {
      list.innerHTML = `<div class="stack-empty">Trash is empty.</div>`;
      return;
    }

    trash.forEach(doc => {
      const row = document.createElement("div");
      row.className = "stack-item";

      row.innerHTML = `
        <div class="stack-item-main">
          <div class="stack-item-title">${escapeHTML(doc.title)}</div>
          <div class="stack-item-preview">Deleted ${escapeHTML(formatDate(doc.deletedAt))}</div>
        </div>
        <div class="stack-item-actions">
          <button type="button" data-restore>Restore</button>
          <button type="button" data-delete class="danger">Delete forever</button>
        </div>
      `;

      row.querySelector("[data-restore]").addEventListener("click", async () => {
        const restored = { ...doc };
        delete restored.deletedAt;
        restored.order = documents.length;
        restored.updatedAt = nowISO();

        await put("documents", restored);
        await remove("trash", doc.id);

        documents.push(restored);
        renderDocumentTabs();
        await renderTrashList();
      });

      row.querySelector("[data-delete]").addEventListener("click", async () => {
        if (!window.confirm(`Permanently delete “${doc.title}”?`)) return;
        await remove("trash", doc.id);
        await renderTrashList();
      });

      list.appendChild(row);
    });
  }

  // -------------------------
  // RICH TEXT
  // -------------------------
  function captureEditorRange() {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    if (!$("editor").contains(selection.anchorNode)) return;

    lastEditorRange = selection.getRangeAt(0).cloneRange();
  }

  function restoreEditorRange() {
    if (!lastEditorRange) {
      $("editor").focus();
      return false;
    }

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(lastEditorRange);

    return true;
  }

  function execCommand(command, value = null) {
    $("editor").focus();
    restoreEditorRange();
    document.execCommand(command, false, value);
    captureEditorRange();
    updateDerivedViews();
    scheduleSave();
  }

  function insertTextAtCursor(text) {
    $("editor").focus();
    restoreEditorRange();

    const selection = window.getSelection();

    if (selection && selection.rangeCount) {
      const range = selection.getRangeAt(0);
      range.deleteContents();

      const node = document.createTextNode(text);
      range.insertNode(node);

      range.setStartAfter(node);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);
      lastEditorRange = range.cloneRange();
    } else {
      $("editor").appendChild(document.createTextNode(text));
    }

    updateDerivedViews();
    scheduleSave();
  }

  // -------------------------
  // TRANSLITERATION
  // -------------------------
  function normalizeRoman(text) {
    return String(text || "")
      .normalize("NFC")
      .replace(/aa/g, "ā")
      .replace(/ii/g, "ī")
      .replace(/uu/g, "ū")
      .replace(/\.R/g, "ṝ")
      .replace(/\.r/g, "ṛ")
      .replace(/\.l/g, "ḷ")
      .replace(/~n/g, "ñ")
      .replace(/"n/g, "ṅ")
      .replace(/\.n/g, "ṇ")
      .replace(/\.s/g, "ṣ")
      .replace(/sh/g, "ś")
      .replace(/\.m/g, "ṃ")
      .replace(/\.h/g, "ḥ");
  }

  function romanToDevanagari(text) {
    text = normalizeRoman(text);

    const vowels = ["ai","au","ā","ī","ū","ṝ","ḹ","ṛ","ḷ","e","o","a","i","u"];
    const consonantTokens = [
      "kh","gh","ch","jh","ṭh","ḍh","th","dh","ph","bh",
      "ṅ","ñ","ṭ","ḍ","ṇ","ś","ṣ",
      "k","g","c","j","t","d","n","p","b","m","y","r","l","v","s","h"
    ];

    let out = "";
    let index = 0;
    let pendingConsonant = false;

    const findToken = (tokens) => tokens.find(token => text.startsWith(token, index));

    while (index < text.length) {
      const char = text[index];

      if (/\s/.test(char)) {
        pendingConsonant = false;
        out += char;
        index += 1;
        continue;
      }

      if (text.startsWith("||", index)) {
        out += "॥";
        index += 2;
        pendingConsonant = false;
        continue;
      }

      if (text.startsWith("|", index)) {
        out += "।";
        index += 1;
        pendingConsonant = false;
        continue;
      }

      const consonant = findToken(consonantTokens);

      if (consonant) {
        if (pendingConsonant) out += "्";
        out += romanConsonants[consonant];
        index += consonant.length;
        pendingConsonant = true;
        continue;
      }

      const vowel = findToken(vowels);

      if (vowel) {
        out += pendingConsonant
          ? (matras[vowel] ?? "")
          : (independentVowels[vowel] ?? vowel);

        index += vowel.length;
        pendingConsonant = false;
        continue;
      }

      const specialToken = Object.keys(romanSpecials)
        .sort((a, b) => b.length - a.length)
        .find(token => text.startsWith(token, index));

      if (specialToken) {
        out += romanSpecials[specialToken];
        index += specialToken.length;
        pendingConsonant = false;
        continue;
      }

      pendingConsonant = false;
      out += char;
      index += 1;
    }

    return out;
  }

  function devanagariToIast(text) {
    const chars = Array.from(text || "");
    let out = "";

    for (let index = 0; index < chars.length; index += 1) {
      const char = chars[index];

      if (devanagariConsonants.has(char)) {
        const next = chars[index + 1];

        if (next === "्") {
          out += devaToIastMap[char] || char;
          index += 1;
          continue;
        }

        if (next && ["ा","ि","ी","ु","ू","ृ","ॄ","ॢ","ॣ","े","ै","ो","ौ"].includes(next)) {
          out += (devaToIastMap[char] || char) + (devaToIastMap[next] || "");
          index += 1;
          continue;
        }

        out += (devaToIastMap[char] || char) + "a";
        continue;
      }

      if (char === "्") continue;

      out += Object.prototype.hasOwnProperty.call(devaToIastMap, char)
        ? devaToIastMap[char]
        : char;
    }

    return out;
  }

  function updateRomanPreview() {
    const source = $("romanInput").value.trim();
    $("romanPreview").textContent = source
      ? romanToDevanagari(source)
      : "Preview appears here…";
  }

  function toggleRomanComposer() {
    $("romanComposer").classList.toggle(
      "hidden",
      $("inputModeSelect").value !== "roman"
    );
  }

  // -------------------------
  // DERIVED VIEWS
  // -------------------------
  function updateDerivedViews() {
    const text = $("editor").innerText || "";
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = Array.from(text).length;

    $("documentStats").textContent = `${words} words • ${characters} characters`;
    $("iastOutput").value = devanagariToIast(text);
  }

  // -------------------------
  // FLOATING KEYBOARD
  // -------------------------
  function renderKeyboard() {
    const renderSet = (elementId, keys) => {
      const container = $(elementId);
      container.innerHTML = "";

      keys.forEach(key => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "sanskrit-key";
        button.textContent = key;
        button.title = key;

        button.addEventListener("click", () => {
          insertTextAtCursor(key);
        });

        container.appendChild(button);
      });
    };

    renderSet("keyboardVowels", keyboardSets.vowels);
    renderSet("keyboardConsonants", keyboardSets.consonants);
    renderSet("keyboardSigns", keyboardSets.signs);
    renderSet("keyboardConjuncts", keyboardSets.conjuncts);
    renderSet("keyboardNumbers", keyboardSets.numbers);
  }

  function updateKeyboardOffset() {
    const keyboard = $("floatingKeyboard");

    if (!keyboard || keyboard.classList.contains("hidden")) {
      document.documentElement.style.setProperty("--keyboard-offset", "0px");
      return;
    }

    requestAnimationFrame(() => {
      const height = keyboard.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--keyboard-offset",
        `${Math.ceil(height + (window.innerWidth <= 760 ? 0 : 12))}px`
      );
    });
  }

  async function setKeyboardVisible(visible, { save = true } = {}) {
    const keyboard = $("floatingKeyboard");
    keyboard.classList.toggle("hidden", !visible);

    settings.keyboard.visible = visible;

    if (save) {
      await saveSettings();
    }

    updateKeyboardOffset();
  }

  // -------------------------
  // DICTIONARY
  // -------------------------
  async function loadEnglishDictionaryManifest() {
    try {
      const r = await fetch("english_manifest.json", {cache:"no-store"});
      if (!r.ok) throw new Error(`english_manifest.json returned ${r.status}`);
      englishDictionaryManifest = await r.json();
    } catch (e) {
      console.warn("English dictionary unavailable:", e);
      englishDictionaryManifest = null;
    }
  }

  async function loadEnglishDictionaryChunk(bucket) {
    if (!englishDictionaryManifest) return [];
    const info = englishDictionaryManifest.chunks?.[bucket];
    if (!info?.file) return [];
    if (englishDictionaryChunkCache.has(bucket)) return englishDictionaryChunkCache.get(bucket);
    const r = await fetch(info.file, {cache:"force-cache"});
    if (!r.ok) throw new Error(`${info.file} returned ${r.status}`);
    const p = await r.json(), es = Array.isArray(p) ? p : (p.entries || []);
    englishDictionaryChunkCache.set(bucket, es);
    return es;
  }

  async function loadDictionary() {
    try {
      const manifestResponse = await fetch("dictionary_manifest.json", { cache: "no-store" });
      if (!manifestResponse.ok) throw new Error(`dictionary_manifest.json returned ${manifestResponse.status}`);
      dictionaryManifest = await manifestResponse.json();
      if (!dictionaryManifest?.chunks || !dictionaryManifest?.totalEntries) throw new Error("Invalid dictionary manifest");
      dictionaryEntries = [];
      $("dictionaryCount").textContent = `${Number(dictionaryManifest.totalEntries).toLocaleString()} Monier-Williams entries`;
      return;
    } catch (manifestError) {
      console.warn("Full dictionary manifest unavailable; falling back to dictionary.json:", manifestError);
    }

    try {
      const response = await fetch("dictionary.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`dictionary.json returned ${response.status}`);
      const payload = await response.json();
      dictionaryEntries = Array.isArray(payload) ? payload : (payload.entries || []);
      $("dictionaryCount").textContent = `${dictionaryEntries.length.toLocaleString()} starter entries`;
    } catch (error) {
      console.warn("Dictionary load failed:", error);
      dictionaryEntries = [];
      $("dictionaryCount").textContent = "Dictionary unavailable";
    }
  }

  function dictionaryBucketForQuery(query) {
    const raw = cleanDictionaryQuery(query);
    if (!raw) return "other";
    let devanagari;
    if (/^[\u0900-\u097F]/.test(raw)) devanagari = raw;
    else devanagari = romanToDevanagari(normalizeRoman(raw.toLowerCase()));
    const first = Array.from(devanagari || "")[0];
    if (!first || first < "\u0900" || first > "\u097F") return "other";
    return `u${first.codePointAt(0).toString(16).padStart(4, "0")}`;
  }

  async function loadDictionaryChunk(bucket) {
    if (!dictionaryManifest) return dictionaryEntries;
    if (dictionaryChunkCache.has(bucket)) return dictionaryChunkCache.get(bucket);
    const info = dictionaryManifest.chunks?.[bucket];
    if (!info?.file) {
      dictionaryChunkCache.set(bucket, []);
      return [];
    }
    const response = await fetch(info.file, { cache: "force-cache" });
    if (!response.ok) throw new Error(`${info.file} returned ${response.status}`);
    const entries = await response.json();
    dictionaryChunkCache.set(bucket, entries);
    return entries;
  }

  function cleanDictionaryQuery(query) {
    return String(query || "")
      .trim()
      .replace(/[।॥,.;:!?'"“”‘’()[\]{}]/g, "");
  }

  // V12: common-word overrides provide a clean learner-friendly
  // definition while the full Monier-Williams senses remain available below.
  const COMMON_ROMAN_ALIASES = {
    "namaste": {word:"नमस्ते", iast:"namaste", concise:"A respectful greeting or salutation; an expression of reverence or bowing."},
    "namaskar": {word:"नमस्कार", iast:"namaskāra", concise:"Salutation, greeting, reverence, or respectful homage."},
    "namaskara": {word:"नमस्कार", iast:"namaskāra", concise:"Salutation, greeting, reverence, or respectful homage."},
    "karuna": {word:"करुणा", iast:"karuṇā", concise:"Compassion, pity, tenderness, or sympathy."},
    "prema": {word:"प्रेम", iast:"prema", concise:"Love, affection, fondness, or deep attachment."}
  };

  const COMMON_CONCISE_DEFINITIONS = {
    "गुरु": "Teacher, mentor, or spiritual guide; also heavy, weighty, important, or venerable.",
    "धर्म": "Duty, law, right conduct, moral order, or an essential principle.",
    "कर्म": "Action, deed, or work; also the result or consequence of an action.",
    "कर्मन्": "Action, deed, work, or activity; also the result or consequence of action.",
    "विद्या": "Knowledge, learning, study, or a branch of knowledge.",
    "ज्ञान": "Knowledge, understanding, awareness, or insight.",
    "योग": "Union, joining, discipline, or a spiritual practice aimed at integration and realization.",
    "शान्ति": "Peace, calm, tranquility, or freedom from disturbance.",
    "सुख": "Happiness, ease, comfort, pleasure, or well-being.",
    "दुःख": "Suffering, pain, difficulty, sorrow, or unhappiness.",
    "राम": "Pleasing or charming; also the proper name Rāma.",
    "कृष्ण": "Dark or black; also the proper name Kṛṣṇa.",
    "अग्नि": "Fire; especially the sacred fire and the Vedic deity Agni.",
    "आत्मन्": "Self, soul, individual essence, or inner principle.",
    "ब्रह्मन्": "The Absolute or ultimate reality; also sacred formulation, prayer, or spiritual power depending on context.",
    "नमः": "Salutation, reverence, homage, or an expression of bowing.",
    "संस्कृत": "Refined, perfected, or prepared; also referring to the Sanskrit language.",
    "संस्कृतम्": "Sanskrit; literally refined, perfected, or prepared.",
    "शिष्य": "Student, pupil, or disciple.",
    "पुस्तक": "Book or written volume."
  };

  function normalizeDictionaryRoman(value) {
    return normalizeRoman(String(value || "").toLowerCase())
      .replace(/\s+/g, " ")
      .trim();
  }

  function dictionaryExactForms(query) {
    const raw = cleanDictionaryQuery(query);
    const roman = normalizeDictionaryRoman(raw);
    const deva = /[\u0900-\u097F]/.test(raw)
      ? raw
      : romanToDevanagari(roman);

    return { raw, roman, deva };
  }

  function isCrossReferenceSense(text) {
    const value = String(text || "").trim();
    return /^(?:see\b|cf\.\b|q\.v\.\b|id\.\b|for\b|the same as\b|=+\s*[-A-Za-zāīūṛṝḷḹṅñṭḍṇśṣṃḥ])/i.test(value);
  }

  function stripOuterQuotes(value) {
    return String(value || "")
      .trim()
      .replace(/^[‘’'“"]+\s*/u, "")
      .replace(/\s*[‘’'”"]+$/u, "")
      .trim();
  }

  function cleanCitationTail(value) {
    let text = String(value || "").trim();

    // Cross-reference tails: "= -devata; iic, 12; VarYogay. v, 1."
    text = text.replace(
      /\s*[;,]?\s*=\s*[-A-Za-zāīūṛṝḷḹṅñṭḍṇśṣṃḥ0-9°'’—.–]+\b.*$/u,
      ""
    );

    // MW technical abbreviations after the semantic definition.
    text = text.replace(
      /\s*[;,]\s*(?:iic|ifc|ib|id|q\.v|cf|opp|compar|superl|du|pl|sg|nom|acc|instr|dat|abl|gen|loc|voc|cl|P|Ā|Pass|Caus|Desid|Intens)\.?\b.*$/iu,
      ""
    );

    // Common source abbreviations / text citations.
    text = text.replace(
      /\s*[;,]\s*(?:RV|AV|VS|TS|ŚBr|Br|Up|Mn|MBh|R|BhP|Yājñ|Suśr|Pāṇ|Pañcat|Kathās|Ragh|Megh|VarYogay|VarBṛS|Jyot|Śiś|Hit|Vikr|MaitrUp|ĀpŚr|Kauś|Nir|Bhaṭṭ|HPar|TāṇḍyaBr|Bhpr|RTL|Gmn|VBr|L|T)\b.*$/u,
      ""
    );

    // Generic citation-like tails: "Author. v, 1" / "Work. 205".
    text = text.replace(
      /\s*[;,]\s*[A-ZĀĪŪṚṜḶḸŚṢṄÑṬḌṆ][A-Za-zĀĪŪṚṜḶḸŚṢṄÑṬḌṆāīūṛṝḷḹśṣṅñṭḍṇ]+\.?\s+(?:[ivxlcdm]+|\d+)(?:\s*,\s*\d+(?:-\d+)?)?.*$/u,
      ""
    );

    // Trailing numeric references.
    text = text.replace(/\s*[;,]\s*\d+(?:\s*[-–]\s*\d+)?\s*\.?$/u, "");

    return text.trim();
  }

  function cleanMWSense(text) {
    let value = String(text || "")
      .replace(/\s+/g, " ")
      .replace(/\u00a0/g, " ")
      .trim();

    if (!value) return "";

    // Remove leading headword-compound echo.
    value = value.replace(
      /^[A-Za-zāīūṛṝḷḹṅñṭḍṇśṣṃḥ'°—\-\/\s]+—[A-Za-zāīūṛṝḷḹṅñṭḍṇśṣṃḥ'°—\-\/\s]+\s+/u,
      ""
    );

    // Remove leading scholarly parentheticals.
    for (let i = 0; i < 3; i++) {
      const next = value.replace(/^\([^)]{1,220}\)\s*/u, "").trim();
      if (next == value) break;
      value = next;
    }

    // Remove trailing etymology block.
    value = value.replace(/\s*\[[^\]]{1,700}\]\s*$/u, "").trim();

    value = cleanCitationTail(value);
    value = stripOuterQuotes(value);

    value = value
      .replace(/^[,;:=\s]+/u, "")
      .replace(/[\s,;:=]+$/u, "")
      .trim();

    if (/^(?:iic|ifc|ib|id|cf|q\.v|L|T)\.?$/i.test(value)) return "";

    return value;
  }

  function sentenceCaseMeaning(value) {
    let text = stripOuterQuotes(String(value || "").trim());
    if (!text) return "";

    if (/^[a-z]/.test(text)) {
      text = text[0].toUpperCase() + text.slice(1);
    }

    if (!/[.!?…]$/.test(text)) text += ".";
    return text;
  }

  function readableGrammar(grammar) {
    const raw = String(grammar || "").trim();
    if (!raw) return "";

    const labels = [];

    if (/\bind\./i.test(raw)) labels.push("indeclinable");
    if (/\bmfn\./i.test(raw) || /\bmf\([^)]*\)n\./i.test(raw)) labels.push("adjective");
    if (/(^|[;\s])m\./i.test(raw) && !labels.includes("adjective")) labels.push("masculine noun");
    if (/(^|[;\s])f\./i.test(raw) && !labels.includes("adjective")) labels.push("feminine noun");
    if (/(^|[;\s])n\./i.test(raw) && !labels.includes("adjective")) labels.push("neuter noun");
    if (/\bverb\b/i.test(raw)) labels.push("verb");

    const unique = [...new Set(labels)];

    if (unique.length) return unique.slice(0, 2).join(" · ");

    // MW grammar is sometimes highly technical. Show a short cleaned fallback.
    return raw
      .replace(/\binh\b;?/gi, "")
      .replace(/\s*;\s*/g, " · ")
      .replace(/\s+/g, " ")
      .replace(/^[·\s]+|[·\s]+$/g, "")
      .slice(0, 90);
  }

  function conciseMeaningForEntry(entry) {
    const word = String(entry.word || "").trim();

    if (COMMON_CONCISE_DEFINITIONS[word]) {
      return COMMON_CONCISE_DEFINITIONS[word];
    }

    const sourceSenses = Array.isArray(entry.senses) && entry.senses.length
      ? entry.senses
      : [entry.meaning];

    const cleaned = sourceSenses
      .map(cleanMWSense)
      .filter(Boolean)
      .filter(value => !isCrossReferenceSense(value))
      .filter(value => !/^N\.\s+of\b/i.test(value))
      .filter(value => !/^\[?cf\./i.test(value));

    const fallback = sourceSenses.map(cleanMWSense).filter(Boolean);
    const candidates = cleaned.length ? cleaned : fallback;

    if (!candidates.length) {
      return "See the full Monier-Williams entry below.";
    }

    const scored = candidates.map((value, index) => {
      let score = 120 - index * 2;
      const len = value.length;

      if (len >= 8 && len <= 90) score += 45;
      else if (len <= 140) score += 30;
      else if (len <= 210) score += 12;
      else if (len > 300) score -= 45;

      if (/^(?:a |an |the |to |one who |having |free from |teacher|knowledge|action|peace|fire|self|soul|heavy|venerable|name of|constellation)/i.test(value)) {
        score += 12;
      }

      if (/\b(?:RV|AV|MBh|Pāṇ|ŚBr|Suśr|Yājñ|VarYogay|Pañcat|Ragh)\b/u.test(value)) score -= 35;
      if (/=\s*[-A-Za-z]/u.test(value)) score -= 60;
      if (/\biic\b|\bifc\b|\bq\.v\b/i.test(value)) score -= 60;

      return { value, score };
    }).sort((a, b) => b.score - a.score);

    let result = scored[0]?.value || "";

    if (result.length > 170) {
      const boundaries = [
        result.indexOf("; ", 70),
        result.indexOf(", also ", 70),
        result.indexOf(", especially ", 70),
        result.indexOf(" (", 70)
      ].filter(i => i > 70);

      if (boundaries.length) result = result.slice(0, Math.min(...boundaries));
    }

    if (result.length > 190) {
      const clipped = result.slice(0, 187);
      const lastSpace = clipped.lastIndexOf(" ");
      result = `${clipped.slice(0, Math.max(90, lastSpace))}…`;
    }

    return sentenceCaseMeaning(result);
  }

  function scoreDictionaryEntry(entry, query) {
    const { raw, roman, deva } = dictionaryExactForms(query);
    if (!raw) return 0;

    const word = String(entry.word || "").trim();
    const iast = normalizeDictionaryRoman(entry.iast || devanagariToIast(word));
    const slp1 = String(entry.slp1 || "").toLowerCase();

    // Exact matches are intentionally separated by thousands of points.
    // A compound can never outrank the actual searched headword.
    if (word === deva) return 10000;
    if (iast === roman) return 9900;
    if (slp1 && slp1 === raw.toLowerCase()) return 9800;

    if (word.startsWith(deva) && deva) {
      return 6000 - Math.min(500, Array.from(word).length - Array.from(deva).length);
    }

    if (iast.startsWith(roman) && roman) {
      return 5800 - Math.min(500, iast.length - roman.length);
    }

    if (word.includes(deva) && deva) {
      return 3000 - Math.min(400, Array.from(word).length - Array.from(deva).length);
    }

    if (iast.includes(roman) && roman) {
      return 2800 - Math.min(400, iast.length - roman.length);
    }

    if (!dictionaryManifest) {
      const meaning = String(entry.meaning || "").toLowerCase();
      if (meaning.includes(raw.toLowerCase())) return 500;
    }

    return 0;
  }

  function dictionaryTieBreak(a, b, query) {
    if (b.score !== a.score) return b.score - a.score;

    const forms = dictionaryExactForms(query);
    const aWord = String(a.entry.word || "");
    const bWord = String(b.entry.word || "");

    // For exact duplicate/homonym records, richer definitions come first.
    const aExact = aWord === forms.deva || normalizeDictionaryRoman(a.entry.iast) === forms.roman;
    const bExact = bWord === forms.deva || normalizeDictionaryRoman(b.entry.iast) === forms.roman;

    if (aExact !== bExact) return aExact ? -1 : 1;

    const aCross = isCrossReferenceSense(a.entry.meaning);
    const bCross = isCrossReferenceSense(b.entry.meaning);

    if (aCross !== bCross) return aCross ? 1 : -1;

    const aRichness =
      (Array.isArray(a.entry.senses) ? a.entry.senses.length : 0) * 20 +
      String(a.entry.meaning || "").length;

    const bRichness =
      (Array.isArray(b.entry.senses) ? b.entry.senses.length : 0) * 20 +
      String(b.entry.meaning || "").length;

    if (bRichness !== aRichness) return bRichness - aRichness;

    // Then shorter headwords first: guru before gurutva before guruśiṣya...
    return Array.from(aWord).length - Array.from(bWord).length;
  }

  function englishBucketForQuery(q) {
    const c=String(q||"").trim().toLowerCase(), f=c[0]||"";
    return /^[a-z]$/.test(f)?f:"other";
  }
  function scoreEnglishEntry(entry,q) {
    const k=String(entry.key||"").toLowerCase(), x=String(q||"").toLowerCase().trim();
    if(k===x)return 9600;
    if(k.startsWith(x))return 5400-Math.min(400,k.length-x.length);
    if(k.includes(x))return 2200-Math.min(300,k.length-x.length);
    return 0;
  }
  async function searchDictionary(query) {
    const clean=cleanDictionaryQuery(query);
    if(!clean){dictionarySearchResults=[];dictionarySearchQuery="";dictionaryVisibleCount=DICTIONARY_PAGE_SIZE;renderDictionaryResults([],"");return;}
    const merged=[];
    const alias=COMMON_ROMAN_ALIASES[String(clean).toLowerCase().trim()];
    if(alias) merged.push({kind:"alias",score:11000,entry:{word:alias.word,iast:alias.iast,meaning:alias.concise,senses:[alias.concise],source:"Sanskrit Studio common usage"}});
    try{
      const bucket=dictionaryBucketForQuery(clean);
      const es=dictionaryManifest?await loadDictionaryChunk(bucket):dictionaryEntries;
      for(const entry of es){const score=scoreDictionaryEntry(entry,clean);if(score>0)merged.push({kind:"sanskrit",score,entry});}
    }catch(err){console.warn("Sanskrit lookup failed",err);}
    if(/^[A-Za-z][A-Za-z0-9' -]*$/.test(clean)&&englishDictionaryManifest){
      try{
        const es=await loadEnglishDictionaryChunk(englishBucketForQuery(clean));
        for(const entry of es){const score=scoreEnglishEntry(entry,clean);if(score>0)merged.push({kind:"english",score,entry});}
      }catch(err){console.warn("English lookup failed",err);}
    }
    merged.sort((a,b)=>b.score-a.score || (a.kind==="english"?String(a.entry.key).length:String(a.entry.word||"").length)-(b.kind==="english"?String(b.entry.key).length:String(b.entry.word||"").length));
    const seen=new Set(),ded=[];
    for(const it of merged){const id=it.kind==="english"?"e:"+it.entry.key:"s:"+it.entry.word+":"+it.entry.iast;if(seen.has(id))continue;seen.add(id);ded.push(it);}
    dictionarySearchResults=ded;dictionarySearchQuery=clean;dictionaryVisibleCount=DICTIONARY_PAGE_SIZE;
    renderDictionaryResults(ded.slice(0,dictionaryVisibleCount),clean);
  }

  function renderEnglishDictionaryCard(item) {
    const entry=item.entry, card=document.createElement("article");
    card.className="dictionary-card dictionary-card-english";
    const exact=String(entry.key||"").toLowerCase()===String(dictionarySearchQuery||"").toLowerCase();
    if(exact)card.classList.add("dictionary-card-exact");
    const eqs=Array.isArray(entry.sanskrit)?entry.sanskrit:[], vis=eqs.slice(0,14);
    card.innerHTML=`
      <div class="dictionary-card-head"><div class="dictionary-heading-copy">
        <div class="dictionary-word-row"><div class="dictionary-english-word">${escapeHTML(entry.key||"")}</div>${exact?'<span class="exact-match-badge">Exact English match</span>':""}</div>
        <div class="dictionary-direction-label">English → Sanskrit</div>
      </div></div>
      <div class="dictionary-concise-label">Sanskrit equivalents</div>
      <div class="english-sanskrit-equivalents">${vis.map((x,i)=>`<button class="sanskrit-equivalent" type="button" data-eq="${i}"><span class="equivalent-deva">${escapeHTML(x.word||"")}</span><span class="equivalent-iast">${escapeHTML(x.iast||"")}</span></button>`).join("")}</div>
      ${entry.details?.length?`<details class="dictionary-full-entry"><summary>Full English → Sanskrit source entries · ${entry.details.length} source${entry.details.length===1?"":"s"}</summary>${entry.details.map(d=>`<div class="english-source-detail"><strong>${escapeHTML(d.source||"")}</strong><p>${escapeHTML(d.body||"")}</p></div>`).join("")}</details>`:""}
      <div class="dictionary-source">${escapeHTML((entry.sources||[]).join(" • "))}</div>`;
    card.querySelectorAll("[data-eq]").forEach(b=>b.onclick=()=>{const x=vis[Number(b.dataset.eq)];if(x?.word){showView("write");insertTextAtCursor(x.word);}});
    return card;
  }

  function renderDictionaryResults(results, query) {
    const c=$("dictionaryResults"); c.innerHTML="";
    if(!query){c.innerHTML='<div class="dictionary-card dictionary-message-card"><div class="dictionary-meaning">Search Sanskrit, romanized Sanskrit, or English. Try <strong>गुरु</strong>, <strong>guru</strong>, <strong>love</strong>, or <strong>compassion</strong>.</div></div>';return;}
    if(!dictionarySearchResults.length){c.innerHTML=`<div class="dictionary-card dictionary-message-card"><div class="dictionary-meaning">No dictionary matches for <strong>${escapeHTML(query)}</strong>.</div></div>`;return;}
    const forms=dictionaryExactForms(query);
    results.forEach(item=>{
      if(item.kind==="english"){c.appendChild(renderEnglishDictionaryCard(item));return;}
      const entry=item.entry,card=document.createElement("article");card.className="dictionary-card";
      const word=entry.word||"",ia=entry.iast||devanagariToIast(word),grammar=readableGrammar(entry.grammar),concise=conciseMeaningForEntry(entry);
      const exact=item.kind==="alias"||word===forms.deva||normalizeDictionaryRoman(ia)===forms.roman;if(exact)card.classList.add("dictionary-card-exact");
      const senses=Array.isArray(entry.senses)&&entry.senses.length?entry.senses:(entry.meaning?[entry.meaning]:[]);
      card.innerHTML=`<div class="dictionary-card-head"><div class="dictionary-heading-copy"><div class="dictionary-word-row"><div class="dictionary-word">${escapeHTML(word)}</div>${exact?`<span class="exact-match-badge">${item.kind==="alias"?"Common form":"Exact match"}</span>`:""}</div><div class="dictionary-iast">${escapeHTML(ia)}</div>${grammar?`<div class="dictionary-grammar-clean">${escapeHTML(grammar)}</div>`:""}</div></div>
      <div class="dictionary-concise-label">Meaning</div><div class="dictionary-concise">${escapeHTML(concise)}</div>
      ${senses.length?`<details class="dictionary-full-entry"><summary>${item.kind==="alias"?"More information":`Full Monier-Williams entry${senses.length>1?` · ${senses.length} senses`:""}`}</summary><ol>${senses.map(x=>`<li>${escapeHTML(x)}</li>`).join("")}</ol></details>`:""}
      <div class="dictionary-source">${escapeHTML(entry.source||"Local dictionary")}</div><div class="dictionary-actions"><button class="primary-btn" data-ins>Insert into document</button><button class="secondary-btn" data-copy>Copy entry</button></div>`;
      card.querySelector("[data-ins]").onclick=()=>{showView("write");insertTextAtCursor(word)};card.querySelector("[data-copy]").onclick=()=>navigator.clipboard.writeText(`${word} (${ia}) — ${concise}`);c.appendChild(card);
    });
    if(dictionaryVisibleCount<dictionarySearchResults.length){const r=dictionarySearchResults.length-dictionaryVisibleCount,w=document.createElement("div");w.className="dictionary-load-more-wrap";const b=document.createElement("button");b.className="secondary-btn dictionary-load-more";b.textContent=`Load more (${Math.min(DICTIONARY_PAGE_SIZE,r)} of ${r} remaining)`;b.onclick=()=>{dictionaryVisibleCount=Math.min(dictionaryVisibleCount+DICTIONARY_PAGE_SIZE,dictionarySearchResults.length);renderDictionaryResults(dictionarySearchResults.slice(0,dictionaryVisibleCount),dictionarySearchQuery)};w.appendChild(b);c.appendChild(w);}
    const sm=document.createElement("div");sm.className="dictionary-result-summary";sm.textContent=`${dictionarySearchResults.length.toLocaleString()} matches · showing ${Math.min(dictionaryVisibleCount,dictionarySearchResults.length).toLocaleString()}`;c.prepend(sm);
  }

  function lookupSelectedWord() {
    const word = selectionText();

    if (!word) {
      window.alert("Select a Sanskrit word first.");
      return;
    }

    $("dictionarySearchInput").value = word;
    showView("dictionary");
    searchDictionary(word);
  }

  // -------------------------
  // VIEW / MODAL HELPERS
  // -------------------------
  function showView(view) {
    const isWrite = view === "write";

    $("writeView").classList.toggle("active", isWrite);
    $("dictionaryView").classList.toggle("active", !isWrite);

    $("navWrite").classList.toggle("active", isWrite);
    $("navDictionary").classList.toggle("active", !isWrite);

    if (!isWrite) {
      window.setTimeout(() => $("dictionarySearchInput").focus(), 0);
    }
  }

  function openModal(id) {
    $("modalBackdrop").classList.remove("hidden");
    $(id).classList.remove("hidden");
  }

  function closeAllModals() {
    $("modalBackdrop").classList.add("hidden");
    document.querySelectorAll(".modal").forEach(modal => modal.classList.add("hidden"));
  }

  // -------------------------
  // WORKSPACE BACKUP
  // -------------------------
  async function exportWorkspace() {
    await saveActiveDocumentNow();
    await createSnapshot({ force: true });

    const payload = {
      format: "SanskritStudioV10",
      exportedAt: nowISO(),
      documents: await getAll("documents"),
      trash: await getAll("trash"),
      history: await getAll("history"),
      settings
    };

    downloadBlob(
      `sanskrit-studio-v10-workspace-${new Date().toISOString().slice(0,10)}.json`,
      new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    );
  }

  async function importWorkspace(file) {
    let payload;

    try {
      payload = JSON.parse(await file.text());
    } catch {
      window.alert("That file is not valid JSON.");
      return;
    }

    if (!["SanskritStudioV10", "SanskritStudioV9"].includes(payload.format)) {
      window.alert("This does not look like a Sanskrit Studio V9/V10 workspace backup.");
      return;
    }

    if (!Array.isArray(payload.documents)) {
      window.alert("Workspace backup has no document list.");
      return;
    }

    if (!window.confirm("Import this workspace? Existing items remain unless their IDs overlap.")) {
      return;
    }

    for (const doc of payload.documents || []) await put("documents", doc);
    for (const doc of payload.trash || []) await put("trash", doc);
    for (const snapshot of payload.history || []) {
      const converted = {
        ...snapshot,
        documentId: snapshot.documentId || snapshot.docId
      };
      delete converted.docId;
      await put("history", converted);
    }

    if (payload.settings) {
      settings = {
        ...structuredClone(defaultSettings),
        ...payload.settings,
        keyboard: {
          ...structuredClone(defaultSettings.keyboard),
          ...(payload.settings.keyboard || {})
        }
      };
      await saveSettings();
    }

    documents = (await getAll("documents")).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    activeDocumentId = documents[0]?.id || null;

    if (!activeDocumentId) {
      await createDocument("Untitled 1");
    } else {
      await setMeta("activeDocumentId", activeDocumentId);
      renderDocumentTabs();
      loadActiveDocumentIntoEditor();
    }

    applySettings();
    window.alert("Workspace imported.");
  }

  // -------------------------
  // EXPORT CURRENT DOCUMENT
  // -------------------------
  function exportCurrentDocument(type) {
    const doc = activeDocument();
    if (!doc) return;

    const html = $("editor").innerHTML;
    const text = $("editor").innerText || "";
    const fileName = safeFileName(doc.title);

    if (type === "txt") {
      downloadBlob(
        `${fileName}.txt`,
        new Blob([text], { type: "text/plain;charset=utf-8" })
      );
    }

    if (type === "html") {
      downloadBlob(
        `${fileName}.html`,
        new Blob(
          [
            `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHTML(doc.title)}</title></head><body>${html}</body></html>`
          ],
          { type: "text/html;charset=utf-8" }
        )
      );
    }

    if (type === "doc") {
      const body = `
        <!doctype html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family:'Noto Sans Devanagari','Devanagari Sangam MN',serif;font-size:18pt;line-height:1.65">
          ${html}
        </body>
        </html>
      `;

      downloadBlob(
        `${fileName}.doc`,
        new Blob([body], { type: "application/msword" })
      );
    }

    if (type === "pdf") {
      const popup = window.open("", "_blank");

      if (!popup) {
        window.alert("Allow pop-ups, then try Print / PDF again.");
        return;
      }

      popup.document.write(`
        <!doctype html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${escapeHTML(doc.title)}</title>
          <style>
            body {
              font-family: "Noto Sans Devanagari","Devanagari Sangam MN",serif;
              font-size: 20px;
              line-height: 1.7;
              padding: 40px;
              color: #111;
              background: #fff;
            }
          </style>
        </head>
        <body>${html}</body>
        </html>
      `);

      popup.document.close();
      popup.focus();
      window.setTimeout(() => popup.print(), 250);
    }

    closeAllModals();
  }

  // -------------------------
  // EVENT BINDING
  // -------------------------
  function bindEvents() {
    // Navigation
    $("navWrite").addEventListener("click", () => showView("write"));
    $("navDictionary").addEventListener("click", () => showView("dictionary"));

    // Documents
    $("newDocumentBtn").addEventListener("click", () => createDocument());
    $("openHistoryBtn").addEventListener("click", openHistory);
    $("openTrashBtn").addEventListener("click", openTrash);

    // Editor / selection
    $("editor").addEventListener("input", () => {
      updateDerivedViews();
      captureEditorRange();
      scheduleSave();
    });

    ["keyup", "mouseup", "focus"].forEach(eventName => {
      $("editor").addEventListener(eventName, captureEditorRange);
    });

    $("editor").addEventListener("contextmenu", (event) => {
      const selected = selectionText();
      if (!selected) return;

      event.preventDefault();
      captureEditorRange();

      const menu = $("selectionMenu");
      menu.style.left = `${Math.min(event.clientX, window.innerWidth - 225)}px`;
      menu.style.top = `${Math.min(event.clientY, window.innerHeight - 95)}px`;
      menu.classList.remove("hidden");
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest("#selectionMenu")) {
        $("selectionMenu").classList.add("hidden");
      }
    });

    // Rich formatting
    document.querySelectorAll("[data-command]").forEach(button => {
      button.addEventListener("click", () => execCommand(button.dataset.command));
    });

    $("highlightBtn").addEventListener("click", () => execCommand("hiliteColor", "#fff08b"));
    $("clearFormattingBtn").addEventListener("click", () => execCommand("removeFormat"));
    $("fontSizeSelect").addEventListener("change", event => execCommand("fontSize", event.target.value));

    // Roman composer
    $("inputModeSelect").addEventListener("change", toggleRomanComposer);
    $("romanInput").addEventListener("input", updateRomanPreview);
    $("romanInsertBtn").addEventListener("click", () => {
      const value = romanToDevanagari($("romanInput").value);
      if (value) insertTextAtCursor(value);
    });

    $("romanReplaceBtn").addEventListener("click", () => {
      const value = romanToDevanagari($("romanInput").value);
      if (!value) return;

      $("editor").focus();
      restoreEditorRange();
      document.execCommand("insertText", false, value);

      updateDerivedViews();
      scheduleSave();
      captureEditorRange();
    });

    $("romanClearBtn").addEventListener("click", () => {
      $("romanInput").value = "";
      updateRomanPreview();
      $("romanInput").focus();
    });

    $("romanComposerHelpBtn").addEventListener("click", () => {
      $("helpDrawer").classList.add("open");
      $("helpSearchInput").value = "Roman";
      filterHelp("Roman");
    });

    // IAST
    $("copyIastBtn").addEventListener("click", async () => {
      await navigator.clipboard.writeText($("iastOutput").value);
    });

    // Lookup
    $("lookupSelectionBtn").addEventListener("click", lookupSelectedWord);
    $("contextLookupBtn").addEventListener("click", lookupSelectedWord);
    $("contextCopyBtn").addEventListener("click", async () => {
      await navigator.clipboard.writeText(selectionText());
      $("selectionMenu").classList.add("hidden");
    });

    // Dictionary
    $("dictionarySearchBtn").addEventListener("click", () => {
      searchDictionary($("dictionarySearchInput").value);
    });

    $("dictionarySearchInput").addEventListener("keydown", event => {
      if (event.key === "Enter") {
        searchDictionary(event.target.value);
      }
    });

    // Keyboard
    $("toggleKeyboardBtn").addEventListener("click", () => {
      setKeyboardVisible($("floatingKeyboard").classList.contains("hidden"));
    });

    $("keyboardCloseBtn").addEventListener("click", () => setKeyboardVisible(false));

    $("keyboardMinimizeBtn").addEventListener("click", async () => {
      const keyboard = $("floatingKeyboard");
      keyboard.classList.toggle("minimized");
      settings.keyboard.minimized = keyboard.classList.contains("minimized");
      await saveSettings();
      updateKeyboardOffset();
    });

    // Settings
    $("openSettingsBtn").addEventListener("click", () => openModal("settingsModal"));

    $("themeSetting").addEventListener("change", async event => {
      settings.theme = event.target.value;
      await saveSettings();
      applySettings();
    });

    $("defaultInputSetting").addEventListener("change", async event => {
      settings.defaultInput = event.target.value;
      await saveSettings();
    });

    $("fontStyleSetting").addEventListener("change", async event => {
      settings.fontStyle = event.target.value;
      await saveSettings();
      applySettings();
    });

    $("showIastSetting").addEventListener("change", async event => {
      settings.showIast = event.target.checked;
      await saveSettings();
      applySettings();
    });

    $("keyboardStartupSetting").addEventListener("change", async event => {
      settings.keyboardStartup = event.target.checked;
      await saveSettings();
    });

    $("exportWorkspaceBtn").addEventListener("click", exportWorkspace);

    $("importWorkspaceInput").addEventListener("change", async event => {
      const file = event.target.files?.[0];
      if (file) await importWorkspace(file);
      event.target.value = "";
    });

    // Export
    $("openExportBtn").addEventListener("click", () => openModal("exportModal"));

    document.querySelectorAll("[data-export]").forEach(button => {
      button.addEventListener("click", () => exportCurrentDocument(button.dataset.export));
    });

    // Help
    $("openHelpBtn").addEventListener("click", () => {
      $("helpDrawer").classList.add("open");
    });

    $("closeHelpBtn").addEventListener("click", () => {
      $("helpDrawer").classList.remove("open");
    });

    $("helpSearchInput").addEventListener("input", event => {
      filterHelp(event.target.value);
    });

    // Modals
    $("modalBackdrop").addEventListener("click", closeAllModals);

    document.querySelectorAll("[data-close-modal]").forEach(button => {
      button.addEventListener("click", closeAllModals);
    });

    // Shortcuts
    window.addEventListener("keydown", async event => {
      const mod = event.metaKey || event.ctrlKey;
      const key = event.key.toLowerCase();

      if (mod && key === "s") {
        event.preventDefault();
        await saveActiveDocumentNow();
      }

      if (mod && key === "n") {
        event.preventDefault();
        await createDocument();
      }

      if (mod && key === "k") {
        event.preventDefault();
        setKeyboardVisible($("floatingKeyboard").classList.contains("hidden"));
      }

      if (mod && event.shiftKey && key === "d") {
        event.preventDefault();
        lookupSelectedWord();
      }
    });

    window.addEventListener("resize", updateKeyboardOffset);

    // Last-chance local save
    window.addEventListener("pagehide", () => {
      const doc = activeDocument();
      if (!doc || !db) return;

      doc.html = $("editor").innerHTML;
      doc.updatedAt = nowISO();

      try {
        const tx = db.transaction("documents", "readwrite");
        tx.objectStore("documents").put(doc);
      } catch {}
    });
  }

  function filterHelp(query) {
    const lower = String(query || "").trim().toLowerCase();

    document.querySelectorAll("#helpContent article").forEach(article => {
      const searchable = `${article.innerText} ${article.dataset.help || ""}`.toLowerCase();
      article.classList.toggle("hidden", !!lower && !searchable.includes(lower));
    });
  }

  // -------------------------
  // STARTUP
  // -------------------------
  async function start() {
    renderIcons();
    renderKeyboard();

    await openDatabase();
    await loadSettings();
    await loadDictionary();
    await loadEnglishDictionaryManifest();
    await loadDocuments();

    bindEvents();
    applySettings();
    updateKeyboardOffset();

    renderDictionaryResults([], "");
    updateDerivedViews();
    setSaveIndicator("saved");
  }

  start().catch(error => {
    console.error("Sanskrit Studio failed to initialize:", error);
    window.alert(
      "Sanskrit Studio could not initialize local storage. Open the browser console for details."
    );
  });
})();
