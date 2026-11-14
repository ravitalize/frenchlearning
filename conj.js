/* Conjugations page: every verb from class with all present-tense forms,
   plus optional pronunciation help in English, Hindi or Telugu script. */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const P = window.Phonetics;
  const SUBJ = ["je", "tu", "il / elle", "nous", "vous", "ils / elles"];
  const GROUPS = {
    irregular: "Irregular",
    er: "-ER regular",
    "er-spelling": "-ER spelling change",
    reflexive: "Reflexive",
    ir: "-IR (finir)",
    "ir-partir": "-IR (partir)",
    "ir-ouvrir": "-IR (ouvrir)",
    re: "-RE regular"
  };
  const FILTERS = [
    ["all", "All"], ["irregular", "Irregular"], ["er", "-ER"], ["er-spelling", "-ER spelling change"],
    ["reflexive", "Reflexive"], ["ir*", "-IR"], ["re", "-RE"]
  ];
  const LANGS = [["off", "Off"], ["en", "English"], ["hi", "हिंदी"], ["te", "తెలుగు"]];

  const store = {
    get(k, d) { try { const v = localStorage.getItem("cahier:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("cahier:" + k, JSON.stringify(v)); } catch (e) { /* storage off */ } }
  };

  /* ---------- build the verb list ---------- */
  const startsWithVowel = (ipa) => {
    const t = P.tokenize(ipa)[0];
    return !!t && /^[aɑeɛəioɔuyøœ]/.test(t[0]);
  };
  const glide = (ipa) => ipa.replace(/i$/, "j").replace(/u$/, "w").replace(/y$/, "ɥ");

  function regularEr([inf, en, s]) {
    const w = inf.slice(0, -2);
    const v = startsWithVowel(s);
    const g = glide(s);
    return {
      inf, en, week: 3, group: "er", elide: /^[aeiouyhéèêâîô]/i.test(inf), regular: true,
      forms: [w + "e", w + "es", w + "e", w + "ons", w + "ez", w + "ent"],
      ipa: [g + "e", v ? "ʒ" + s : "ʒə " + s, "ty " + s, v ? "il" + s : "il " + s,
        v ? "nuz" + g + "ɔ̃" : "nu " + g + "ɔ̃", v ? "vuz" + g + "e" : "vu " + g + "e", v ? "ilz" + s : "il " + s]
    };
  }
  function regularIr([inf, en, s]) {
    const w = inf.slice(0, -2);
    const v = startsWithVowel(s);
    return {
      inf, en, week: 6, group: "ir", elide: /^[aeiouyhéèêâîô]/i.test(inf), regular: true,
      forms: [w + "is", w + "is", w + "it", w + "issons", w + "issez", w + "issent"],
      ipa: [s + "iʁ", v ? "ʒ" + s + "i" : "ʒə " + s + "i", "ty " + s + "i", v ? "il" + s + "i" : "il " + s + "i",
        v ? "nuz" + s + "isɔ̃" : "nu " + s + "isɔ̃", v ? "vuz" + s + "ise" : "vu " + s + "ise", v ? "ilz" + s + "is" : "il " + s + "is"]
    };
  }

  function regularRe([inf, en, s, l]) {
    const w = inf.slice(0, -2);
    const v = startsWithVowel(s);
    return {
      inf, en, week: 7, group: "re", elide: /^[aeiouyhéèêâîô]/i.test(inf), regular: true,
      forms: [w + "s", w + "s", w, w + "ons", w + "ez", w + "ent"],
      ipa: [l + "ʁ", v ? "ʒ" + s : "ʒə " + s, "ty " + s, v ? "il" + s : "il " + s,
        v ? "nuz" + l + "ɔ̃" : "nu " + l + "ɔ̃", v ? "vuz" + l + "e" : "vu " + l + "e", v ? "ilz" + l : "il " + l]
    };
  }

  const taught = new Set((window.VERBS || []).map((v) => v.inf));
  const ALL = [
    ...(window.VERBS || []),
    ...((window.REGULAR_VERBS || {}).er || []).map(regularEr),
    ...((window.REGULAR_VERBS || {}).ir || []).map(regularIr),
    ...((window.REGULAR_VERBS || {}).re || []).map(regularRe)
  ].filter((v, i, arr) => arr.findIndex((x) => x.inf === v.inf) === i);
  const sortKey = (inf) => inf.replace(/^s'|^se /, "").normalize("NFD").replace(/[̀-ͯ]/g, "");
  ALL.sort((a, b) => sortKey(a.inf).localeCompare(sortKey(b.inf)));

  /* ---------- state ---------- */
  const state = { q: "", filter: "all", lang: store.get("pronLang", "off") };
  if (!LANGS.some(([k]) => k === state.lang)) state.lang = "off";

  /* ---------- rendering ---------- */
  function pron(ipa) {
    if (state.lang === "off" || !ipa) return "";
    const items = (P.LEGEND[state.lang] || {}).items || {};
    return `<span class="pron pron-${state.lang}" lang="${state.lang === "en" ? "en" : state.lang}">` +
      P.pronounce(ipa, state.lang).map((u) => {
        if (!u.special || !items[u.special]) return esc(u.text);
        return `<span class="sp" title="${esc(items[u.special][1])}">${esc(u.text)}</span>`;
      }).join("") + "</span>";
  }
  const subjectFor = (v, i) => (i === 0 && v.elide ? "j'" : SUBJ[i] + " ");
  const written = (v, i) => v.forms[i].split("|").map((f) => subjectFor(v, i) + f).join(" / ");

  function card(v) {
    const on = state.lang !== "off";
    const rows = v.forms.map((_, i) =>
      `<tr><td class="fr">${esc(written(v, i))}</td>${on ? `<td>${pron(v.ipa && v.ipa[i + 1])}</td>` : ""}</tr>`).join("");
    return `<article class="vcard">
      <header>
        <h3>${esc(v.inf)}</h3>
        <span class="en">${esc(v.en)}</span>
      </header>
      ${on ? `<p class="inf-pron">${pron(v.ipa && v.ipa[0])}</p>` : ""}
      <p class="tags"><span class="badge g-${esc(v.group)}">${esc(GROUPS[v.group] || v.group)}</span><span class="badge wk">Week ${v.week}</span>${taught.has(v.inf) ? "" : '<span class="badge list">from the verb list</span>'}</p>
      <div class="tablewrap"><table><tbody>${rows}</tbody></table></div>
    </article>`;
  }

  function legend() {
    if (state.lang === "off") return "";
    const L = P.LEGEND[state.lang];
    return `<details class="legend" ${store.get("legendClosed", false) ? "" : "open"}>
      <summary><h3>${esc(L.title)}</h3></summary>
      <p>${esc(L.intro)}</p>
      <ul>${Object.values(L.items).map(([sym, tip]) => `<li><span class="sp sym">${esc(sym)}</span> ${esc(tip)}</li>`).join("")}</ul>
      <p class="muted">Silent endings: -e, -es and -ent are not pronounced, so je parle, tu parles and ils parlent sound the same. In liaison (nous avons = noo-za-vohⁿ) the s is said as z and joins the next word. This is a guide, not a perfect match: listen to your teacher and native speakers too.</p>
    </details>`;
  }

  function matches(v) {
    if (state.filter !== "all") {
      if (state.filter === "ir*" ? !(v.group === "ir" || v.group.startsWith("ir-")) : v.group !== state.filter) return false;
    }
    if (!state.q) return true;
    const n = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const q = n(state.q);
    return n(v.inf).includes(q) || n(v.en).includes(q) || v.forms.some((f) => n(f).includes(q));
  }

  function render() {
    const list = ALL.filter(matches);
    $("conj-legend").innerHTML = legend();
    $("conj-count").textContent = `${list.length} verb${list.length === 1 ? "" : "s"}`;
    $("conj-grid").innerHTML = list.length ? list.map(card).join("") : '<p class="muted">No verb matches. Try another spelling.</p>';
    document.querySelectorAll("#conj-filters button").forEach((b) => b.classList.toggle("on", b.dataset.f === state.filter));
    document.querySelectorAll("#conj-lang button").forEach((b) => b.classList.toggle("on", b.dataset.l === state.lang));
  }

  /* ---------- controls ---------- */
  $("conj-filters").innerHTML = FILTERS.map(([k, label]) => `<button type="button" data-f="${k}">${esc(label)}</button>`).join("");
  $("conj-lang").innerHTML = LANGS.map(([k, label]) => `<button type="button" data-l="${k}">${esc(label)}</button>`).join("");
  $("conj-filters").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { state.filter = b.dataset.f; render(); } });
  $("conj-lang").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    state.lang = b.dataset.l;
    store.set("pronLang", state.lang);
    render();
  });
  let t;
  $("conj-search").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 120); });

  $("conj-legend").addEventListener("toggle", (e) => store.set("legendClosed", !e.target.open), true);

  render();
})();
