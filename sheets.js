/* Cheatsheets page: a gallery of one-page summaries, each opened as a
   multi-column sheet of coloured boxes that can be printed or saved as PDF. */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const SHEETS = window.CHEATSHEETS || [];
  const md = window.renderMarkdown;

  function gallery() {
    $("sheet-view").hidden = true;
    $("sheet-gallery").hidden = false;
    $("sheet-gallery").innerHTML = SHEETS.map((s) => `
      <button class="sheet-tile c-${esc(s.color)}" data-id="${esc(s.id)}">
        <span class="bar"></span>
        <span class="t">${esc(s.title)}</span>
        <span class="s">${esc(s.subtitle)}</span>
        <span class="m">${s.boxes.length} boxes · weeks ${s.weeks.join(", ")}</span>
      </button>`).join("");
  }

  function open(id) {
    const s = SHEETS.find((x) => x.id === id);
    if (!s) return gallery();
    $("sheet-gallery").hidden = true;
    $("sheet-view").hidden = false;
    $("sheet-view").className = "sheet c-" + s.color;
    $("sheet-view").innerHTML = `
      <div class="sheet-actions">
        <button class="btn ghost" id="sheet-back">← All cheatsheets</button>
        <button class="btn primary" id="sheet-print">Print / save as PDF</button>
      </div>
      <header class="sheet-head">
        <h2>${esc(s.title)}</h2>
        <p>${esc(s.subtitle)}</p>
      </header>
      <div class="sheet-cols">
        ${s.boxes.map((b) => `<section class="sbox"><h4>${esc(b.title)}</h4><div class="sbody">${md(b.md)}</div></section>`).join("")}
      </div>
      <p class="sheet-foot">Notre cahier de français · from weekend class notes (weeks ${s.weeks.join(", ")})</p>`;
    $("sheet-back").addEventListener("click", () => { history.replaceState(null, "", "#sheets"); gallery(); window.scrollTo({ top: 0 }); });
    $("sheet-print").addEventListener("click", () => window.print());
    history.replaceState(null, "", "#sheets/" + s.id);
    window.scrollTo({ top: 0 });
  }

  $("sheet-gallery").addEventListener("click", (e) => {
    const b = e.target.closest(".sheet-tile");
    if (b) open(b.dataset.id);
  });

  gallery();
  const m = location.hash.match(/^#sheets\/(.+)$/);
  if (m) open(decodeURIComponent(m[1]));
})();
