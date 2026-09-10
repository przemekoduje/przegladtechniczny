const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_FILE = path.join(ROOT_DIR, "FULL_CODEBASE.md");

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  ".firebase",
  "dist",
  "build",
  ".system_generated"
]);

const IGNORED_FILES = new Set([
  ".DS_Store",
  "package-lock.json",
  "firebase-debug.log",
  "FULL_CODEBASE.md"
]);

const BINARY_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".ico", ".webp",
  ".ttf", ".otf", ".woff", ".woff2", ".eot",
  ".mp4", ".mov", ".webm", ".avi",
  ".pdf", ".zip", ".tar", ".gz",
  ".svg", ".xml"
]);

// Special handling for large binary or pseudo-text files
const OMIT_OR_SUMMARIZE_FILES = {
  "src/assets/silesia2.json": "Plik GeoJSON z poligonami granic województwa śląskiego (rozmiar ~8.1 MB, współrzędne geograficzne pominięte w celu oszczędności kontekstu).",
  "src/assets/silesia1.json": "Plik GeoJSON z punktami węzłowymi gmin/miast (rozmiar ~43 KB, dane współrzędnych geograficznych pominięte dla zwięzłości)."
};

function getLanguage(ext) {
  switch (ext) {
    case ".js":
    case ".mjs":
    case ".cjs":
      return "javascript";
    case ".jsx":
      return "jsx";
    case ".ts":
      return "typescript";
    case ".tsx":
      return "tsx";
    case ".json":
      return "json";
    case ".scss":
      return "scss";
    case ".css":
      return "css";
    case ".html":
      return "html";
    case ".md":
      return "markdown";
    case ".txt":
    default:
      return "text";
  }
}

function getSafeFence(content, lang) {
  let count = 3;
  while (content.includes("`".repeat(count))) {
    count++;
  }
  return "`".repeat(count) + lang;
}

function scanDir(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    if (IGNORED_FILES.has(entry.name)) continue;
    if (entry.name.startsWith("build_") && entry.name.endsWith(".txt")) continue;

    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath);

    if (entry.isDirectory()) {
      results = results.concat(scanDir(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (BINARY_EXTENSIONS.has(ext)) continue;
      results.push(relPath);
    }
  }
  return results;
}

function categorize(filePath) {
  if (filePath.startsWith("functions/")) {
    return "02_Backend_Cloud_Functions";
  }
  if (
    filePath === "package.json" ||
    filePath === "firebase.json" ||
    filePath === "jsconfig.json" ||
    filePath === "README.md" ||
    filePath === ".firebaserc" ||
    filePath === ".gitignore"
  ) {
    return "01_Configuration_and_Config";
  }
  if (
    filePath.startsWith("public/") ||
    filePath === "src/index.js" ||
    filePath === "src/App.js" ||
    filePath === "src/firebase.js" ||
    filePath === "src/setupProxy.js" ||
    filePath.startsWith("src/contexts/") ||
    filePath.startsWith("src/styles/") ||
    filePath.startsWith("src/utils/")
  ) {
    return "03_Frontend_Core_and_Config";
  }
  if (
    filePath.startsWith("src/layouts/") ||
    filePath.startsWith("src/routes/") ||
    filePath.startsWith("src/pages/")
  ) {
    return "04_Frontend_Routes_Pages_and_Layouts";
  }
  if (filePath.startsWith("src/sections/")) {
    return "05_Frontend_Sections";
  }
  if (filePath.startsWith("src/components/")) {
    return "06_Frontend_Components";
  }
  if (filePath.startsWith("src/helpers/") || filePath.startsWith("src/data/") || filePath.startsWith("src/assets/")) {
    return "07_Frontend_Data_and_Helpers";
  }
  return "08_Scripts_and_Tools";
}

const CATEGORY_NAMES = {
  "01_Configuration_and_Config": "1. Konfiguracja projektu i środowiska",
  "02_Backend_Cloud_Functions": "2. Backend – Firebase Cloud Functions & Automations",
  "03_Frontend_Core_and_Config": "3. Frontend – Rdzeń aplikacji React, Style & Konteksty",
  "04_Frontend_Routes_Pages_and_Layouts": "4. Frontend – Widoki, Podstrony (Routes), Strony miast i Układy",
  "05_Frontend_Sections": "5. Frontend – Sekcje strony głównej i landing page",
  "06_Frontend_Components": "6. Frontend – Komponenty interfejsu (UI Components)",
  "07_Frontend_Data_and_Helpers": "7. Frontend – Dane statyczne, Baza wpisów i Pomocniki (Helpers)",
  "08_Scripts_and_Tools": "8. Skrypty pomocnicze i Narzędzia"
};

function main() {
  console.log("Skanowanie plików projektu...");
  const allFiles = scanDir(ROOT_DIR);
  allFiles.sort();

  const categories = {};
  Object.keys(CATEGORY_NAMES).forEach(cat => {
    categories[cat] = [];
  });

  allFiles.forEach(f => {
    const cat = categorize(f);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(f);
  });

  let totalLines = 0;
  let totalBytes = 0;
  const validFiles = [];

  allFiles.forEach(f => {
    if (OMIT_OR_SUMMARIZE_FILES[f]) return;
    try {
      const content = fs.readFileSync(path.join(ROOT_DIR, f), "utf8");
      totalLines += content.split("\n").length;
      totalBytes += Buffer.byteLength(content, "utf8");
      validFiles.push(f);
    } catch (e) {
      console.warn("Błąd odczytu pliku:", f, e.message);
    }
  });

  console.log(`Znaleziono ${allFiles.length} istotnych plików kodu (${totalLines} linii kodu, ${(totalBytes / 1024).toFixed(1)} KB tekstu).`);

  let out = "";
  out += `# Pełny Kod Projektu: Przeglądy Techniczne Budynków (przegladtechniczny)\n\n`;
  out += `> Wygenerowano: ${new Date().toISOString()}\n`;
  out += `> Łączna liczba plików kodu: **${allFiles.length}**\n`;
  out += `> Łączna liczba linii kodu: **${totalLines}**\n`;
  out += `> Przybliżony rozmiar tekstu źródłowego: **${(totalBytes / 1024).toFixed(1)} KB**\n\n`;

  out += `## Architektura i Stos Technologiczny\n\n`;
  out += `- **Frontend**: React 18, React Router v6, SCSS (Sass), Material-UI v6, Lucide React, Leaflet / MapLibre GL, Quill (Rich Text Editor)\n`;
  out += `- **Backend**: Firebase Cloud Functions (Node.js 20), Firestore, Firebase Authentication, Google Calendar API (OAuth2/Service Account), OpenAI API (gpt-4o/mini)\n`;
  out += `- **Automatyzacje**: Generator postów blogowych z AI (\`blogAutomator.js\`), Asystent umawiania wizyt ze skończonym automatem stanów (\`stateMachine.js\`, \`calendarManager.js\`), Integracja z mediami społecznościowymi (\`facebookService.js\`)\n`;
  out += `- **Pominięte pliki systemowe/binarne**: \`node_modules/\`, \`.git/\`, \`.firebase/\`, grafiki/video (\`*.png\`, \`*.jpg\`, \`*.mp4\`), fonty (\`*.ttf\`), logi kompilacji oraz ciężkie zbiory punktów poligonowych GeoJSON.\n\n`;

  out += `## Spis Treści (Struktura Plików)\n\n`;

  for (const [catKey, catName] of Object.entries(CATEGORY_NAMES)) {
    const filesInCat = categories[catKey] || [];
    if (filesInCat.length === 0) continue;
    out += `### ${catName}\n\n`;
    filesInCat.forEach(f => {
      const anchor = f.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
      out += `- [\`${f}\`](#file-${anchor})\n`;
    });
    out += `\n`;
  }

  out += `---\n\n`;
  out += `## Zawartość Plików Kodu Źródłowego\n\n`;

  for (const [catKey, catName] of Object.entries(CATEGORY_NAMES)) {
    const filesInCat = categories[catKey] || [];
    if (filesInCat.length === 0) continue;

    out += `\n# ================================================================================\n`;
    out += `# ${catName.toUpperCase()}\n`;
    out += `# ================================================================================\n\n`;

    for (const f of filesInCat) {
      const anchor = f.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
      out += `## File: \`${f}\` <a id="file-${anchor}"></a>\n\n`;

      if (OMIT_OR_SUMMARIZE_FILES[f]) {
        out += `> [!NOTE]\n> ${OMIT_OR_SUMMARIZE_FILES[f]}\n\n`;
        continue;
      }

      try {
        const content = fs.readFileSync(path.join(ROOT_DIR, f), "utf8");
        const ext = path.extname(f).toLowerCase();
        const lang = getLanguage(ext);
        const fenceOpen = getSafeFence(content, lang);
        const fenceClose = "`".repeat(fenceOpen.length - lang.length);

        out += `${fenceOpen}\n`;
        out += content;
        if (!content.endsWith("\n")) out += "\n";
        out += `${fenceClose}\n\n`;
      } catch (err) {
        out += `*Błąd odczytu pliku: ${err.message}*\n\n`;
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, out, "utf8");
  console.log(`Wygenerowano pomyślnie: ${OUTPUT_FILE}`);
  console.log(`Rozmiar wyjściowego pliku: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1)} KB`);
}

main();
