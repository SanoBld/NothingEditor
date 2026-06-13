/* ============================================================
   Nothing Editor - main script
   Handles: language, theme, sidebar, ribbon actions,
   colors, font size, custom fonts, word count,
   markdown shortcuts, export (PNG / Markdown), watermark.
   ============================================================ */

/* ---------- Translations ---------- */
const I18N = {
  en: {
    menu: "Toggle sidebar",
    newNote: "New note",
    capture: "Capture & download (PNG)",
    captureLabel: "Capture",

    bold: "Bold (Ctrl+B)",
    italic: "Italic (Ctrl+I)",
    underline: "Underline (Ctrl+U)",
    strike: "Strikethrough (Ctrl+Shift+S)",
    code: "Inline code (Ctrl+E)",
    highlight: "Highlight selection",

    groupText: "Text",
    groupColors: "Colors",
    groupStructure: "Structure",
    groupFontSize: "Font size",

    underlineColor: "Underline",
    highlightColor: "Highlight",
    quoteColor: "Quote",

    h1: "Heading 1 (Ctrl+Shift+1 or '# ')",
    h2: "Heading 2 (Ctrl+Shift+2 or '## ')",
    h3: "Heading 3 (Ctrl+Shift+3 or '### ')",
    quote: "Quote (Ctrl+Shift+9 or '> ')",
    ul: "Bullet list (Ctrl+Shift+8 or '- ')",
    ol: "Numbered list (Ctrl+Shift+7 or '1. ')",
    pre: "Code block (or ``` + Enter)",
    divider: "Divider (or --- + Enter)",

    formatTitle: "Format & theme",
    formatSelect: "Card aspect ratio",
    formatAuto: "Format: Automatic",
    formatStory: "Format: IG Story (9:16)",
    formatPost: "Format: Square post (1:1)",
    formatPostTall: "Format: Portrait post (4:5)",

    themeToggle: "Toggle light / dark mode",
    themeAuto: "Theme: Auto (system)",
    themeLight: "Theme: Light",
    themeDark: "Theme: Dark",

    fontTitle: "Custom font",
    fontSelect: "Choose editor font",
    fontDefault: "NothingCustom (default)",
    loadFonts: "Load font files...",
    fontFolderHint: "Or put font files (.ttf / .otf) inside a \"fonts\" folder and list them in fonts/fonts.json",

    exportTitle: "Export",
    qualitySelect: "Image resolution",
    qualityStd: "Quality: Standard (2x)",
    qualityHigh: "Quality: High (3x)",
    qualityUltra: "Quality: Ultra (4x)",

    watermarkTitle: "Add a small 'Nothing' tag (links to the editor site)",
    watermarkOff: "Nothing watermark: Off",
    watermarkOn: "Nothing watermark: On",
    watermarkBrand: "Made with Nothing Editor",

    exportMdTitle: "Download note as a .md file",
    exportMd: "Export as Markdown (.md)",

    langTitle: "Language",

    scratchTitle: "Scratchpad",
    scratchPh: "Write your side notes here...",

    editorPh: "Write your text here...",

    wordCount: "{w} words \u00B7 {c} characters",
    newNoteConfirm: "Clear the editor and start a new note?"
  },

  fr: {
    menu: "Afficher / masquer le panneau",
    newNote: "Nouvelle note",
    capture: "Capturer et télécharger (PNG)",
    captureLabel: "Capture",

    bold: "Gras (Ctrl+B)",
    italic: "Italique (Ctrl+I)",
    underline: "Souligné (Ctrl+U)",
    strike: "Barré (Ctrl+Shift+S)",
    code: "Code en ligne (Ctrl+E)",
    highlight: "Surligner la sélection",

    groupText: "Texte",
    groupColors: "Couleurs",
    groupStructure: "Structure",
    groupFontSize: "Taille de police",

    underlineColor: "Soulignage",
    highlightColor: "Surlignage",
    quoteColor: "Citation",

    h1: "Titre 1 (Ctrl+Shift+1 ou '# ')",
    h2: "Titre 2 (Ctrl+Shift+2 ou '## ')",
    h3: "Titre 3 (Ctrl+Shift+3 ou '### ')",
    quote: "Citation (Ctrl+Shift+9 ou '> ')",
    ul: "Liste à puces (Ctrl+Shift+8 ou '- ')",
    ol: "Liste numérotée (Ctrl+Shift+7 ou '1. ')",
    pre: "Bloc de code (ou ``` + Entrée)",
    divider: "Séparateur (ou --- + Entrée)",

    formatTitle: "Format et thème",
    formatSelect: "Ratio de la carte",
    formatAuto: "Format : Automatique",
    formatStory: "Format : Story IG (9:16)",
    formatPost: "Format : Post carré (1:1)",
    formatPostTall: "Format : Post portrait (4:5)",

    themeToggle: "Basculer mode clair / sombre",
    themeAuto: "Thème : Auto (système)",
    themeLight: "Thème : Clair",
    themeDark: "Thème : Sombre",

    fontTitle: "Police personnalisée",
    fontSelect: "Choisir la police de l'éditeur",
    fontDefault: "NothingCustom (par défaut)",
    loadFonts: "Charger des fichiers de police...",
    fontFolderHint: "Ou placez vos polices (.ttf / .otf) dans un dossier \"fonts\" et listez-les dans fonts/fonts.json",

    exportTitle: "Export",
    qualitySelect: "Résolution de l'image",
    qualityStd: "Qualité : Standard (2x)",
    qualityHigh: "Qualité : Haute (3x)",
    qualityUltra: "Qualité : Ultra (4x)",

    watermarkTitle: "Ajouter un petit tag 'Nothing' (renvoie vers le site de l'éditeur)",
    watermarkOff: "Filigrane Nothing : Désactivé",
    watermarkOn: "Filigrane Nothing : Activé",
    watermarkBrand: "Fait avec Nothing Editor",

    exportMdTitle: "Télécharger la note en fichier .md",
    exportMd: "Exporter en Markdown (.md)",

    langTitle: "Langue",

    scratchTitle: "Bloc-notes",
    scratchPh: "Écrivez vos notes ici...",

    editorPh: "Écrivez votre texte ici...",

    wordCount: "{w} mots \u00B7 {c} caractères",
    newNoteConfirm: "Vider l'éditeur et commencer une nouvelle note ?"
  }
};

let currentLang = "en";

/* Apply translations to every element with data-i18n* attributes */
function applyTranslations() {
  const dict = I18N[currentLang] || I18N.en;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key] !== undefined) el.title = dict[key];
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  // Watermark button label depends on current state
  updateWatermarkLabel();
  updateThemeLabel();
  updateWordCount();
}

function setLanguage(lang) {
  if (lang === "auto") {
    const browserLang = (navigator.language || "en").slice(0, 2);
    currentLang = I18N[browserLang] ? browserLang : "en";
  } else {
    currentLang = I18N[lang] ? lang : "en";
  }
  document.documentElement.lang = currentLang;
  applyTranslations();
}

/* ============================================================
   Element references
   ============================================================ */
const body = document.body;

const menuToggle   = document.getElementById("menu-toggle");
const newBtn       = document.getElementById("new-btn");
const captureBtn   = document.getElementById("capture-btn");

const ribbon       = document.getElementById("ribbon");

const underlineColorInput = document.getElementById("underline-color");
const highlightColorInput = document.getElementById("highlight-color");
const quoteColorInput     = document.getElementById("quote-color-input");

const fontSizeDec     = document.getElementById("font-size-dec");
const fontSizeInc     = document.getElementById("font-size-inc");
const fontSizeDisplay = document.getElementById("font-size-display");

const formatSelect  = document.getElementById("format-select");
const themeToggle   = document.getElementById("theme-toggle");

const fontSelect    = document.getElementById("font-select");
const fontUpload    = document.getElementById("font-upload");
const fontUploadBtn = document.getElementById("font-upload-btn");

const qualitySelect  = document.getElementById("quality-select");
const watermarkBtn   = document.getElementById("watermark-btn");
const exportMdBtn    = document.getElementById("export-md-btn");

const langSelect = document.getElementById("lang-select");
const sideNotes  = document.getElementById("side-notes");
const wordCounter = document.getElementById("word-counter");

const exportCard = document.getElementById("export-card");
const editor     = document.getElementById("main-editor");

/* ============================================================
   Sidebar toggle
   ============================================================ */
function toggleSidebar() {
  body.classList.toggle("sidebar-hidden");
}
menuToggle.addEventListener("click", toggleSidebar);

// Start collapsed on small screens
if (window.innerWidth <= 768) {
  body.classList.add("sidebar-hidden");
}

/* ============================================================
   New note
   ============================================================ */
newBtn.addEventListener("click", () => {
  const dict = I18N[currentLang] || I18N.en;
  if (confirm(dict.newNoteConfirm)) {
    editor.innerHTML = "";
    updateWordCount();
  }
});

/* ============================================================
   Theme: auto (follows the system), light, or dark.
   "auto" means no class is set on <body> - the CSS media query
   "prefers-color-scheme" then decides the colors.
   ============================================================ */
const THEME_ORDER = ["auto", "light", "dark"];

function applyThemeMode(mode) {
  body.classList.remove("light", "dark");
  if (mode === "light") body.classList.add("light");
  else if (mode === "dark") body.classList.add("dark");
  // "auto" -> no class, CSS @media (prefers-color-scheme) takes over
}

function updateThemeLabel() {
  const dict = I18N[currentLang] || I18N.en;
  const mode = localStorage.getItem("nothing-theme") || "auto";
  const labels = { auto: dict.themeAuto, light: dict.themeLight, dark: dict.themeDark };
  themeToggle.textContent = labels[mode] || dict.themeAuto;
}

const savedThemeMode = localStorage.getItem("nothing-theme") || "auto";
applyThemeMode(savedThemeMode);

themeToggle.addEventListener("click", () => {
  const current = localStorage.getItem("nothing-theme") || "auto";
  const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
  localStorage.setItem("nothing-theme", next);
  applyThemeMode(next);
  updateThemeLabel();
});

/* ============================================================
   Card format (aspect ratio)
   ============================================================ */
formatSelect.addEventListener("change", () => {
  exportCard.className = "card-preview " + formatSelect.value;
});

/* ============================================================
   Quality select - just remember the chosen scale
   ============================================================ */
let exportScale = parseInt(qualitySelect.value, 10) || 3;
qualitySelect.addEventListener("change", () => {
  exportScale = parseInt(qualitySelect.value, 10) || 3;
});

/* ============================================================
   Watermark toggle
   ============================================================ */
let watermarkOn = false;
function updateWatermarkLabel() {
  const dict = I18N[currentLang] || I18N.en;
  watermarkBtn.textContent = watermarkOn ? dict.watermarkOn : dict.watermarkOff;
  watermarkBtn.classList.toggle("active", watermarkOn);
}
watermarkBtn.addEventListener("click", () => {
  watermarkOn = !watermarkOn;
  updateWatermarkLabel();
});

function buildWatermark() {
  const dict = I18N[currentLang] || I18N.en;
  const a = document.createElement("a");
  a.className = "nothing-watermark";
  a.href = "https://sanobld.github.io/NothingEditor/";
  a.target = "_blank";
  a.rel = "noopener";

  const dot = document.createElement("span");
  dot.className = "wdot";
  a.appendChild(dot);

  const label = document.createElement("span");
  label.textContent = dict.watermarkBrand + " \u2014 sanobld.github.io/NothingEditor";
  a.appendChild(label);

  return a;
}

/* ============================================================
   Capture & download as PNG
   ============================================================ */
captureBtn.addEventListener("click", async () => {
  let watermarkEl = null;
  if (watermarkOn) {
    watermarkEl = buildWatermark();
    exportCard.appendChild(watermarkEl);
  }

  captureBtn.disabled = true;
  captureBtn.classList.add("loading");

  try {
    // Make sure NothingCustom (and any custom font) is fully loaded
    // before drawing the canvas, otherwise the capture can fall back
    // to a generic font even though the page itself looks correct.
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(exportCard, {
      scale: exportScale,
      backgroundColor: getComputedStyle(exportCard).backgroundColor,
      useCORS: true
    });

    const link = document.createElement("a");
    link.download = "nothing-note.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) {
    console.error("Capture failed:", err);
  }

  if (watermarkEl) exportCard.removeChild(watermarkEl);
  captureBtn.disabled = false;
  captureBtn.classList.remove("loading");
});

/* ============================================================
   Export as Markdown
   ============================================================ */
function nodeToMarkdown(node) {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const tag = node.tagName.toLowerCase();
  const inner = () => Array.from(node.childNodes).map(nodeToMarkdown).join("");

  switch (tag) {
    case "h1": return "# " + inner() + "\n\n";
    case "h2": return "## " + inner() + "\n\n";
    case "h3": return "### " + inner() + "\n\n";
    case "b": case "strong": return "**" + inner() + "**";
    case "i": case "em": return "*" + inner() + "*";
    case "u": return "_" + inner() + "_";
    case "s": case "strike": case "del": return "~~" + inner() + "~~";
    case "mark": return "==" + inner() + "==";
    case "code": return "`" + inner() + "`";
    case "pre": return "```\n" + node.textContent + "\n```\n\n";
    case "blockquote":
      return inner().trim().split("\n").map(l => "> " + l).join("\n") + "\n\n";
    case "ul":
      return Array.from(node.children).map(li => "- " + nodeToMarkdown(li).trim()).join("\n") + "\n\n";
    case "ol":
      return Array.from(node.children).map((li, i) => (i + 1) + ". " + nodeToMarkdown(li).trim()).join("\n") + "\n\n";
    case "li": return inner();
    case "hr": return "---\n\n";
    case "br": return "\n";
    case "a": return "[" + inner() + "](" + (node.getAttribute("href") || "") + ")";
    case "div": case "p": return inner() + "\n\n";
    default: return inner();
  }
}

exportMdBtn.addEventListener("click", () => {
  let md = Array.from(editor.childNodes).map(nodeToMarkdown).join("");
  // collapse extra blank lines
  md = md.replace(/\n{3,}/g, "\n\n").trim() + "\n";

  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "nothing-note.md";
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
});

/* ============================================================
   Word / character counter
   ============================================================ */
function updateWordCount() {
  const dict = I18N[currentLang] || I18N.en;
  const text = editor.innerText.trim();
  const words = text.length ? text.split(/\s+/).length : 0;
  const chars = text.length;
  wordCounter.textContent = dict.wordCount.replace("{w}", words).replace("{c}", chars);
}
editor.addEventListener("input", updateWordCount);

/* ============================================================
   Font size controls
   ============================================================ */
const FONT_SIZE_MIN = 10;
const FONT_SIZE_MAX = 72;

let fontSize = 22;
function applyFontSize() {
  document.documentElement.style.setProperty("--editor-font-size", fontSize + "px");
  fontSizeDisplay.value = fontSize;
}
fontSizeInc.addEventListener("click", () => {
  fontSize = Math.min(FONT_SIZE_MAX, fontSize + 2);
  applyFontSize();
});
fontSizeDec.addEventListener("click", () => {
  fontSize = Math.max(FONT_SIZE_MIN, fontSize - 2);
  applyFontSize();
});

// Let the user type a custom size directly
fontSizeDisplay.addEventListener("input", () => {
  const value = parseInt(fontSizeDisplay.value, 10);
  if (isNaN(value)) return;
  fontSize = Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, value));
  document.documentElement.style.setProperty("--editor-font-size", fontSize + "px");
});
// Snap back to a valid value once the user leaves the field
fontSizeDisplay.addEventListener("blur", () => applyFontSize());
fontSizeDisplay.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    applyFontSize();
    editor.focus();
  }
});

applyFontSize();

/* ============================================================
   Custom fonts
   ============================================================ */

// File extension -> CSS @font-face format
const FONT_FORMATS = { otf: "opentype", ttf: "truetype", woff: "woff", woff2: "woff2" };

function addFontOption(name) {
  // avoid duplicate options
  if ([...fontSelect.options].some(o => o.value === name)) return;
  const opt = document.createElement("option");
  opt.value = name;
  opt.textContent = name;
  fontSelect.appendChild(opt);
}

function applyFont(name) {
  if (!name) editor.style.removeProperty("--editor-font");
  else editor.style.setProperty("--editor-font", `"${name}", sans-serif`);
}

function registerFont(name, source) {
  try {
    const face = new FontFace(name, source);
    face.load().then(loaded => {
      document.fonts.add(loaded);
      addFontOption(name);
    }).catch(() => {
      // font file could not be loaded, skip it silently
    });
  } catch (err) {
    // ignore invalid fonts
  }
}

// Try to auto-load fonts listed in fonts/fonts.json
// Supports ".ttf" and ".otf" (any case) plus woff/woff2.
async function loadFontsFromFolder() {
  try {
    const res = await fetch("fonts/fonts.json");
    if (!res.ok) return;
    const list = await res.json();

    list.forEach(entry => {
      const file = typeof entry === "string" ? entry : entry.file;
      if (!file) return;

      const ext = file.split(".").pop().toLowerCase();
      const format = FONT_FORMATS[ext];
      if (!format) return; // unsupported file type, skip

      const name = (typeof entry === "object" && entry.name)
        ? entry.name
        : file.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");

      registerFont(name, `url("fonts/${encodeURIComponent(file)}") format("${format}")`);
    });
  } catch (err) {
    // fonts/fonts.json not found - that's fine, nothing to load
  }
}
loadFontsFromFolder();

fontSelect.addEventListener("change", () => applyFont(fontSelect.value));

fontUploadBtn.addEventListener("click", () => fontUpload.click());

fontUpload.addEventListener("change", () => {
  Array.from(fontUpload.files).forEach(file => {
    const ext = file.name.split(".").pop().toLowerCase();
    const format = FONT_FORMATS[ext];
    if (!format) return;

    const name = file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");

    const reader = new FileReader();
    reader.onload = () => {
      const face = new FontFace(name, reader.result);
      face.load().then(loaded => {
        document.fonts.add(loaded);
        addFontOption(name);
        fontSelect.value = name;
        applyFont(name);
      }).catch(() => {});
    };
    reader.readAsArrayBuffer(file);
  });
});

/* ============================================================
   Color pickers (used when applying underline / highlight / quote)
   ============================================================ */
let underlineColor = underlineColorInput.value;
let highlightColor = highlightColorInput.value;

underlineColorInput.addEventListener("input", () => {
  underlineColor = underlineColorInput.value;
});
highlightColorInput.addEventListener("input", () => {
  highlightColor = highlightColorInput.value;
});
quoteColorInput.addEventListener("input", () => {
  document.documentElement.style.setProperty("--quote-color", quoteColorInput.value);
});

/* ============================================================
   Formatting helpers
   ============================================================ */

// Find the closest ancestor of the selection with the given tag,
// stopping the search at the editor element.
function findAncestor(tagName) {
  const sel = window.getSelection();
  if (!sel.rangeCount) return null;
  let node = sel.getRangeAt(0).startContainer;
  while (node && node !== editor) {
    if (node.nodeType === 1 && node.tagName === tagName) return node;
    node = node.parentNode;
  }
  return null;
}

// Remove a wrapper element but keep its content
function unwrap(el) {
  const parent = el.parentNode;
  while (el.firstChild) parent.insertBefore(el.firstChild, el);
  parent.removeChild(el);
}

// Wrap the current selection in a new element with optional inline styles.
// If the selection is already wrapped in that tag, unwrap it instead (toggle).
function toggleWrap(tagName, styles) {
  editor.focus();
  const existing = findAncestor(tagName);
  if (existing) {
    unwrap(existing);
    return;
  }

  const sel = window.getSelection();
  if (!sel.rangeCount || sel.isCollapsed) return;
  const range = sel.getRangeAt(0);

  const el = document.createElement(tagName.toLowerCase());
  if (styles) Object.assign(el.style, styles);

  try {
    range.surroundContents(el);
  } catch (err) {
    const content = range.extractContents();
    el.appendChild(content);
    range.insertNode(el);
  }

  sel.removeAllRanges();
  const newRange = document.createRange();
  newRange.selectNodeContents(el);
  sel.addRange(newRange);
}

// Toggle a block-level format (h1, h2, h3, blockquote, pre)
function setBlock(tag) {
  editor.focus();
  const current = (document.queryCommandValue("formatBlock") || "").toUpperCase();
  if (current === tag) {
    document.execCommand("formatBlock", false, "P");
  } else {
    document.execCommand("formatBlock", false, tag);
  }
}

/* ============================================================
   Ribbon button actions
   ============================================================ */
ribbon.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;

  switch (action) {
    case "bold":      editor.focus(); document.execCommand("bold"); break;
    case "italic":    editor.focus(); document.execCommand("italic"); break;
    case "strike":    editor.focus(); document.execCommand("strikeThrough"); break;

    case "underline":
      toggleWrap("U", { borderBottomColor: underlineColor });
      break;

    case "highlight":
      toggleWrap("MARK", { backgroundColor: highlightColor });
      break;

    case "code":
      toggleWrap("CODE", null);
      break;

    case "h1": setBlock("H1"); break;
    case "h2": setBlock("H2"); break;
    case "h3": setBlock("H3"); break;
    case "blockquote": setBlock("BLOCKQUOTE"); break;
    case "pre": setBlock("PRE"); break;

    case "ul": editor.focus(); document.execCommand("insertUnorderedList"); break;
    case "ol": editor.focus(); document.execCommand("insertOrderedList"); break;
    case "hr": editor.focus(); document.execCommand("insertHorizontalRule"); break;
  }

  updateToolbarState();
  updateWordCount();
});

/* Highlight active buttons depending on the current selection */
function updateToolbarState() {
  const states = {
    bold: document.queryCommandState("bold"),
    italic: document.queryCommandState("italic"),
    strike: document.queryCommandState("strikethrough"),
    underline: !!findAncestor("U"),
    highlight: !!findAncestor("MARK"),
    code: !!findAncestor("CODE"),
    ul: document.queryCommandState("insertunorderedlist"),
    ol: document.queryCommandState("insertorderedlist")
  };

  const block = (document.queryCommandValue("formatBlock") || "").toUpperCase();
  states.h1 = block === "H1";
  states.h2 = block === "H2";
  states.h3 = block === "H3";
  states.blockquote = block === "BLOCKQUOTE";
  states.pre = block === "PRE";

  ribbon.querySelectorAll("[data-action]").forEach(btn => {
    const action = btn.dataset.action;
    if (states[action] !== undefined) {
      btn.classList.toggle("active", states[action]);
    }
  });
}

document.addEventListener("selectionchange", () => {
  if (document.activeElement === editor || editor.contains(document.activeElement)) {
    updateToolbarState();
  }
});

/* ============================================================
   Keyboard shortcuts
   ============================================================ */
editor.addEventListener("keydown", (e) => {
  const ctrl = e.ctrlKey || e.metaKey;
  if (!ctrl) {
    handleMarkdownShortcut(e);
    return;
  }

  // Ctrl + Shift combos
  if (e.shiftKey) {
    switch (e.code) {
      case "Digit1": e.preventDefault(); setBlock("H1"); break;
      case "Digit2": e.preventDefault(); setBlock("H2"); break;
      case "Digit3": e.preventDefault(); setBlock("H3"); break;
      case "Digit9": e.preventDefault(); setBlock("BLOCKQUOTE"); break;
      case "Digit8": e.preventDefault(); document.execCommand("insertUnorderedList"); break;
      case "Digit7": e.preventDefault(); document.execCommand("insertOrderedList"); break;
      case "KeyS":   e.preventDefault(); document.execCommand("strikeThrough"); break;
      default: return;
    }
    updateToolbarState();
    return;
  }

  // Ctrl combos
  switch (e.code) {
    case "KeyE":
      e.preventDefault();
      toggleWrap("CODE", null);
      updateToolbarState();
      break;
    // Bold / Italic / Underline are handled natively by the browser,
    // but we still refresh the toolbar state afterwards.
    case "KeyB":
    case "KeyI":
    case "KeyU":
      setTimeout(updateToolbarState, 0);
      break;
  }
});

/* ============================================================
   Markdown shortcuts while typing
   (# heading, > quote, - list, 1. list, ``` code block, --- divider)
   ============================================================ */
function handleMarkdownShortcut(e) {
  if (e.key !== " " && e.key !== "Enter") return;

  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return;

  const textBefore = node.textContent.slice(0, range.startOffset);

  if (e.key === " ") {
    let match;

    if ((match = textBefore.match(/^(#{1,3})$/))) {
      e.preventDefault();
      clearLineStart(node, match[0].length);
      setBlock("H" + match[1].length);
      return;
    }

    if (textBefore === ">") {
      e.preventDefault();
      clearLineStart(node, 1);
      setBlock("BLOCKQUOTE");
      return;
    }

    if (textBefore === "-" || textBefore === "*") {
      e.preventDefault();
      clearLineStart(node, 1);
      document.execCommand("insertUnorderedList");
      return;
    }

    if ((match = textBefore.match(/^(\d+)\.$/))) {
      e.preventDefault();
      clearLineStart(node, match[0].length);
      document.execCommand("insertOrderedList");
      return;
    }
  }

  if (e.key === "Enter") {
    const trimmed = textBefore.trim();

    if (trimmed === "```") {
      e.preventDefault();
      clearLineStart(node, textBefore.length);
      setBlock("PRE");
      return;
    }

    if (trimmed === "---") {
      e.preventDefault();
      clearLineStart(node, textBefore.length);
      document.execCommand("insertHorizontalRule");
      return;
    }
  }
}

// Remove the first "len" characters of a text node and place the
// caret at its new start (used to delete the markdown trigger text).
function clearLineStart(node, len) {
  node.textContent = node.textContent.slice(len);
  const range = document.createRange();
  range.setStart(node, 0);
  range.collapse(true);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

/* ============================================================
   Language selector
   ============================================================ */
langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  localStorage.setItem("nothing-lang", lang);
  setLanguage(lang);
});

/* ============================================================
   Init
   ============================================================ */
const savedLang = localStorage.getItem("nothing-lang") || "auto";
langSelect.value = savedLang;
setLanguage(savedLang);
updateToolbarState();
