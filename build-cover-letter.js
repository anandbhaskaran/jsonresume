/**
 * Render a cover-letter markdown file to a clean A4 PDF using Puppeteer.
 * Usage: node build-cover-letter.js ./generated/{Company}/cover-letter.md
 *
 * Minimal markdown support (enough for cover letters):
 *   # H1, ## H2, --- horizontal rule, **bold**, blank-line-separated paragraphs.
 *   Single newlines inside a block become <br> (keeps the contact block intact).
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s) {
  return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function mdToHtml(md) {
  const blocks = md.replace(/\r\n/g, "\n").split(/\n{2,}/);
  const parts = [];
  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;
    if (block === "---") {
      parts.push("<hr>");
    } else if (block.startsWith("# ")) {
      parts.push(`<h1>${inline(block.slice(2))}</h1>`);
    } else if (block.startsWith("## ")) {
      parts.push(`<h2>${inline(block.slice(3))}</h2>`);
    } else {
      const lines = block.split("\n").map((l) => inline(l.trim()));
      parts.push(`<p>${lines.join("<br>")}</p>`);
    }
  }
  return parts.join("\n");
}

async function main() {
  const mdPath = process.argv[2];
  if (!mdPath) {
    console.error("Usage: node build-cover-letter.js <path-to-cover-letter.md>");
    process.exit(1);
  }
  const md = fs.readFileSync(mdPath, "utf8");
  const body = mdToHtml(md);
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    @page { size: A4; margin: 22mm 20mm; }
    body { font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1a1a1a; font-size: 11.5pt; line-height: 1.55; }
    h1 { font-size: 15pt; margin: 0 0 2pt; }
    h2 { font-size: 12pt; margin: 16pt 0 4pt; }
    hr { border: none; border-top: 1px solid #ccc; margin: 12pt 0; }
    p { margin: 0 0 10pt; }
    strong { color: #000; }
    a { color: inherit; text-decoration: none; }
  </style></head><body>${body}</body></html>`;

  const outPath = mdPath.replace(/\.md$/i, ".pdf");
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({ path: outPath, format: "A4", printBackground: true });
  await browser.close();
  console.log(`PDF generated: ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
