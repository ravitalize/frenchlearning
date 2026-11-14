/* Notre cahier de français: notes, quiz and verb drill. No build step and no dependencies. */
(function () {
  "use strict";

  const WEEKS = (window.NOTES || []).slice().sort((a, b) => a.id - b.id);
  const VERBS = window.VERBS || [];
  const $ = (id) => document.getElementById(id);

  /* ---------- small helpers ---------- */
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("cahier:" + key); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("cahier:" + key, JSON.stringify(value)); } catch (e) { /* storage off */ }
    }
  };
  const splitTitle = (title) => {
    const i = title.indexOf(":");
    return i === -1 ? { label: title, topics: "" } : { label: title.slice(0, i).trim(), topics: title.slice(i + 1).trim() };
  };

  /* ---------- tiny markdown renderer (headings, boxes, tables, lists, paragraphs) ---------- */
  function renderMarkdown(md) {
    const lines = md.replace(/\r/g, "").split("\n");
    let html = "";
    let i = 0;
    const isTableRow = (l) => /^\s*\|/.test(l);
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      let m;
      if ((m = line.match(/^(#{1,3})\s+(.*)$/))) {
        const lvl = m[1].length;
        html += `<h${lvl}>${inline(m[2])}</h${lvl}>`;
        i++; continue;
      }
      if (line.startsWith(">")) {
        const buf = [];
        while (i < lines.length && lines[i].startsWith(">")) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
        let text = buf.join(" ").trim();
        let cls = "box", tag = "";
        const t = text.match(/^\*\*(RULE|WATCH OUT)\*\*\s*/i);
        if (t) {
          text = text.slice(t[0].length);
          if (/watch/i.test(t[1])) { cls += " watch"; tag = "Watch out"; } else { tag = "Rule"; }
        }
        html += `<div class="${cls}">${tag ? `<span class="tag">${tag}</span>` : ""}${inline(text)}</div>`;
        continue;
      }
      if (isTableRow(line)) {
        const rows = [];
        while (i < lines.length && isTableRow(lines[i])) { rows.push(lines[i]); i++; }
        const cells = (r) => r.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
        const head = cells(rows[0]);
        const body = rows.slice(1).filter((r) => !/^\s*\|?\s*:?-{3,}/.test(r)).map(cells);
        const headHtml = head.every((c) => !c) ? "" : "<thead><tr>" + head.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr></thead>";
        html += '<div class="tablewrap"><table>' + headHtml + "<tbody>" +
          body.map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") +
          "</tbody></table></div>";
        continue;
      }
      if (/^\s*[-*]\s+/.test(line)) {
        html += "<ul>";
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { html += `<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`; i++; }
        html += "</ul>"; continue;
      }
      if (/^\s*\d+\.\s+/.test(line)) {
        html += "<ol>";
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { html += `<li>${inline(lines[i].replace(/^\s*\d+\.\s+/, ""))}</li>`; i++; }
        html += "</ol>"; continue;
      }
      const buf = [];
      while (i < lines.length && lines[i].trim() && !/^(#|>|\s*\||\s*[-*]\s|\s*\d+\.\s)/.test(lines[i])) { buf.push(lines[i]); i++; }
      html += `<p>${inline(buf.join(" "))}</p>`;
    }
    return html;
  }

  window.renderMarkdown = renderMarkdown;

  /* ---------- view switching ---------- */
  function show(view) {
    document.querySelectorAll(".tabs button").forEach((b) => {
      b.classList.toggle("active", b.dataset.view === view);
      if (b.dataset.view === view && window.innerWidth < 860) b.scrollIntoView({ inline: "nearest", block: "nearest" });
    });
    document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === "view-" + view));
    if (view === "verbs" && !drill.current) nextVerb();
    window.scrollTo({ top: 0 });
  }
  function go(view) {
    show(view);
    history.replaceState(null, "", view === "home" ? location.pathname : "#" + view);
  }
  document.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  document.querySelectorAll("[data-go]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); go(el.dataset.go); }));

  /* ---------- home ---------- */
  const SECTIONS = [
    { view: "notes", icon: "📒", title: "Notes", fr: "Les notes", text: "Each weekend's class, cleaned up: rules, examples, traps." },
    { view: "quiz", icon: "✍️", title: "Quiz", fr: "Le quiz", text: "Practice questions from class. Missed ones come back for revenge." },
    { view: "verbs", icon: "🎯", title: "Verb drill", fr: "L'entraînement", text: "Type the right form. Build a streak. Fight the accents." },
    { view: "conj", icon: "📚", title: "Conjugations", fr: "Les conjugaisons", text: "Every verb, every form, with pronunciation in English, हिंदी or తెలుగు." },
    { view: "sheets", icon: "🗂️", title: "Cheatsheets", fr: "Les antisèches", text: "One-page summaries to print and stick next to your bed." }
  ];
  const FACTS = [
    "80 in French is <b>quatre-vingts</b>: \"four twenties\". And 99 is <b>quatre-vingt-dix-neuf</b>: 4 × 20 + 10 + 9. Maths class, but in French.",
    "<b>oiseau</b> (bird) contains all five vowels a, e, i, o, u, and pronounces none of them the way they're written: <i>wa-zo</i>.",
    "In <b>ils parlent</b>, the last three letters are pure decoration. You write them, you never say them.",
    "<b>Qu'est-ce que c'est ?</b> means \"What is it?\" but literally says \"What is it that it is?\" Artists like extra words.",
    "The letter <b>ù</b> is used in exactly one French word: <b>où</b> (where). Its whole job is to not be ou (or).",
    "Hindi and Telugu speakers have a head start: nasal vowels like the one in <b>माँ</b> are everywhere in French (<b>bon, vin, enfant</b>).",
    "The French r lives in the throat. If you know the Urdu <b>ग़</b> in ग़ज़ल, you're already halfway there.",
    "<b>Il y a</b> (there is) literally means \"it there has\". Don't think about it too much. Just say it.",
    "<b>vous avez</b> becomes <i>voo-za-vay</i>: the silent s wakes up only when the next word starts with a vowel. That's liaison.",
    "French has a secret third answer. To say \"yes\" to a negative question, you don't say oui, you say <b>si</b>: Tu ne parles pas français ? <b>Si !</b>",
    "<b>Quel, quelle, quels, quelles</b>: four spellings, one sound (<i>kel</i>). The artist strikes again.",
    "Nationalities and days of the week are lowercase in French: <b>il est indien, samedi</b>. Countries keep their capitals: <b>l'Inde</b>."
  ];
  function renderHome() {
    const q = WEEKS.reduce((n, w) => n + w.questions.length, 0);
    const R = window.REGULAR_VERBS || {};
    const nVerbs = VERBS.length + (R.er || []).length + (R.ir || []).length + (R.re || []).length;
    const stats = [[WEEKS.length, "weeks of notes"], [q, "quiz questions"], [nVerbs, "verbs"], [(window.CHEATSHEETS || []).length, "cheatsheets"]];
    $("home-stats").innerHTML = stats.map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("");
    $("home-cards").innerHTML = SECTIONS.map((s) =>
      `<button class="start-card" data-view="${s.view}"><span class="ic" aria-hidden="true">${s.icon}</span><span class="t">${s.title}</span><span class="fr">${s.fr}</span><span class="d">${s.text}</span><span class="go">Commencer →</span></button>`).join("");
    $("home-cards").addEventListener("click", (e) => { const b = e.target.closest(".start-card"); if (b) go(b.dataset.view); });
    let f = Math.floor(Math.random() * FACTS.length);
    const showFact = () => { $("fact-text").innerHTML = FACTS[f % FACTS.length]; };
    $("fact-next").addEventListener("click", () => { f++; showFact(); });
    showFact();
  }

  /* ---------- notes ---------- */
  function renderWeekList() {
    $("weeklist").innerHTML = WEEKS.map((w) => {
      const t = splitTitle(w.title);
      return `<button class="weekbtn" data-week="${w.id}"><span class="wk">${esc(t.label)}</span><span class="tp">${esc(t.topics)}</span></button>`;
    }).join("");
    $("weeklist").querySelectorAll(".weekbtn").forEach((b) => b.addEventListener("click", () => openWeek(+b.dataset.week)));
  }

  function openWeek(id) {
    const w = WEEKS.find((x) => x.id === id) || WEEKS[WEEKS.length - 1];
    if (!w) { $("note").innerHTML = "<p>No notes yet.</p>"; return; }
    store.set("lastWeek", w.id);
    document.querySelectorAll(".weekbtn").forEach((b) => {
      b.classList.toggle("active", +b.dataset.week === w.id);
      if (+b.dataset.week === w.id && window.innerWidth < 860) b.scrollIntoView({ inline: "center", block: "nearest" });
    });
    const note = $("note");
    note.innerHTML = renderMarkdown(w.markdown) +
      `<div class="note-actions">
         <button class="btn primary" id="practise-week">Practise this week (${w.questions.length} questions)</button>
         <button class="btn ghost" onclick="window.print()">Print</button>
       </div>`;
    const firstP = note.querySelector("h1 + p");
    if (firstP) firstP.classList.add("lead");
    note.querySelectorAll("h2").forEach((h) => {
      if (/^(fixes|keep in mind)/i.test(h.textContent) && h.nextElementSibling) {
        let el = h.nextElementSibling;
        while (el && el.tagName !== "UL" && el.tagName !== "H2") el = el.nextElementSibling;
        if (el && el.tagName === "UL") el.classList.add("fixes");
      }
    });
    $("practise-week").addEventListener("click", () => {
      show("quiz");
      setPicks("quiz-weeks", [w.id]);
      startQuiz();
    });
    if (window.innerWidth < 860) window.scrollTo({ top: 0 });
  }

  /* ---------- week pickers ---------- */
  function renderPicks(containerId, onChange, onlyWeeks) {
    $(containerId).innerHTML = WEEKS.filter((w) => !onlyWeeks || onlyWeeks.includes(w.id)).map((w) =>
      `<label class="pick"><input type="checkbox" value="${w.id}" checked> ${esc(splitTitle(w.title).label.replace(/\s*\(.*\)/, ""))}</label>`
    ).join("");
    if (onChange) $(containerId).addEventListener("change", onChange);
  }
  const getPicks = (containerId) => [...$(containerId).querySelectorAll("input:checked")].map((x) => +x.value);
  function setPicks(containerId, ids) {
    $(containerId).querySelectorAll("input").forEach((x) => { x.checked = ids.includes(+x.value); });
  }

  /* ---------- accent keyboard ---------- */
  const ACCENTS = ["é", "è", "ê", "à", "â", "ç", "ù", "û", "î", "ï", "ô", "ë", "œ"];
  document.querySelectorAll(".accents").forEach((box) => {
    box.innerHTML = ACCENTS.map((c) => `<button type="button" tabindex="-1">${c}</button>`).join("");
    box.addEventListener("mousedown", (e) => e.preventDefault());
    box.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;
      const input = $(box.dataset.target);
      const s = input.selectionStart ?? input.value.length, t = input.selectionEnd ?? input.value.length;
      input.value = input.value.slice(0, s) + e.target.textContent + input.value.slice(t);
      input.focus();
      input.setSelectionRange(s + 1, s + 1);
    });
  });

  /* ---------- quiz ---------- */
  const quiz = { queue: [], pos: 0, total: 0, firstTry: 0, missed: [], requeued: new Set() };

  function showQuizHistory() {
    const h = store.get("quizHistory", null);
    $("quiz-history").textContent = h ? `Last round: ${h.score}/${h.total} on ${h.weeks}.` : "";
  }

  function startQuiz() {
    const ids = getPicks("quiz-weeks");
    if (!ids.length) { alertPick(); return; }
    let items = [];
    WEEKS.filter((w) => ids.includes(w.id)).forEach((w) =>
      w.questions.forEach((q, n) => items.push({ ...q, week: w.id, label: splitTitle(w.title).label, key: w.id + ":" + n })));
    if ($("quiz-shuffle").checked) items = shuffle(items);
    Object.assign(quiz, { queue: items, pos: 0, total: items.length, firstTry: 0, missed: [], requeued: new Set(), weeks: ids });
    $("quiz-setup").hidden = true; $("quiz-done").hidden = true; $("quiz-run").hidden = false;
    showQuestion();
  }
  function alertPick() { $("quiz-history").textContent = "Pick at least one week first."; }

  function showQuestion() {
    const item = quiz.queue[quiz.pos];
    if (!item) return finishQuiz();
    $("quiz-bar").style.width = Math.round((quiz.pos / quiz.queue.length) * 100) + "%";
    $("quiz-meta").textContent = `${item.label} · question ${quiz.pos + 1} of ${quiz.queue.length}` + (quiz.requeued.has(item.key) && item.again ? " · second try" : "");
    $("quiz-q").innerHTML = inline(item.q);
    $("quiz-input").value = "";
    $("quiz-answer").hidden = true;
    $("quiz-check").hidden = false;
    $("quiz-input").focus();
  }
  function checkQuestion() {
    const item = quiz.queue[quiz.pos];
    $("quiz-a").innerHTML = inline(item.a);
    $("quiz-answer").hidden = false;
    $("quiz-check").hidden = true;
    $("quiz-right").focus();
  }
  function mark(correct) {
    const item = quiz.queue[quiz.pos];
    if (!item.again) {
      if (correct) quiz.firstTry++;
      else quiz.missed.push(item);
    }
    if (!correct && !quiz.requeued.has(item.key)) {
      quiz.requeued.add(item.key);
      quiz.queue.push({ ...item, again: true });
    }
    quiz.pos++;
    showQuestion();
  }
  function finishQuiz() {
    $("quiz-run").hidden = true; $("quiz-done").hidden = false;
    $("quiz-bar").style.width = "100%";
    const pct = quiz.total ? Math.round((quiz.firstTry / quiz.total) * 100) : 0;
    $("quiz-score").textContent = `${quiz.firstTry} / ${quiz.total} right first time (${pct}%)`;
    $("quiz-review").innerHTML = quiz.missed.length
      ? "<h3>To review</h3>" + quiz.missed.map((m) => `<div class="review-item"><div>${inline(m.q)}</div><div class="a">${inline(m.a)}</div><div class="muted">${esc(m.label)}</div></div>`).join("")
      : "<p>Parfait ! Nothing to review.</p>";
    store.set("quizHistory", { score: quiz.firstTry, total: quiz.total, weeks: quiz.weeks.map((x) => "week " + x).join(", ") });
  }
  function quitQuiz() {
    $("quiz-run").hidden = true; $("quiz-done").hidden = true; $("quiz-setup").hidden = false;
    showQuizHistory();
  }
  $("quiz-start").addEventListener("click", startQuiz);
  $("quiz-check").addEventListener("click", checkQuestion);
  $("quiz-right").addEventListener("click", () => mark(true));
  $("quiz-wrong").addEventListener("click", () => mark(false));
  $("quiz-quit").addEventListener("click", quitQuiz);
  $("quiz-again").addEventListener("click", quitQuiz);
  $("quiz-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); checkQuestion(); }
  });

  /* ---------- verb drill ---------- */
  const SUBJECTS = ["je", "tu", "il / elle", "nous", "vous", "ils / elles"];
  const drill = { current: null, right: 0, total: 0, streak: 0, answered: false };
  const norm = (s) => s.toLowerCase().replace(/[’`´]/g, "'").replace(/\s+/g, " ").replace(/\s*'\s*/g, "'").trim();
  const noAccent = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
  const stripSubject = (s) => s.replace(/^(je |j'|tu |il |elle |on |nous |vous |ils |elles )/, "");

  function verbPool() {
    const ids = getPicks("verb-weeks");
    const pool = VERBS.filter((v) => ids.includes(v.week));
    return pool.length ? pool : VERBS;
  }
  function subjectLabel(v, p) {
    if (p === 0 && v.elide) return "j'";
    return SUBJECTS[p];
  }
  function nextVerb() {
    const pool = verbPool();
    let pick;
    for (let tries = 0; tries < 10; tries++) {
      const v = pool[Math.floor(Math.random() * pool.length)];
      const p = Math.floor(Math.random() * 6);
      pick = { v, p };
      if (!drill.current || drill.current.v !== v || drill.current.p !== p) break;
    }
    drill.current = pick;
    drill.answered = false;
    $("verb-subj").textContent = subjectLabel(pick.v, pick.p);
    $("verb-inf").textContent = pick.v.inf;
    $("verb-en").textContent = `${pick.v.inf} = ${pick.v.en} · week ${pick.v.week}`;
    $("verb-input").value = "";
    $("verb-feedback").textContent = "";
    $("verb-feedback").className = "feedback";
    $("verb-check").textContent = "Check";
    $("verb-table").innerHTML = '<div class="tablewrap"><table><tbody>' +
      pick.v.forms.map((f, i) => `<tr><td>${esc(subjectLabel(pick.v, i))}</td><td>${esc(f.replace("|", " / "))}</td></tr>`).join("") +
      "</tbody></table></div>";
    $("verb-input").focus();
  }
  function checkVerb() {
    if (drill.answered) { nextVerb(); return; }
    const { v, p } = drill.current;
    const typed = norm($("verb-input").value);
    if (!typed) return;
    const options = v.forms[p].split("|").map(norm);
    const candidates = [typed, stripSubject(typed)];
    const fb = $("verb-feedback");
    drill.total++;
    if (candidates.some((c) => options.includes(c))) {
      drill.right++; drill.streak++;
      fb.textContent = "Correct ! " + (options.length > 1 ? `(${options.join(" or ")})` : "");
      fb.className = "feedback ok";
    } else if (candidates.some((c) => options.map(noAccent).includes(noAccent(c)))) {
      drill.streak = 0;
      fb.textContent = `Almost: check the accents → ${options.join(" / ")}`;
      fb.className = "feedback close";
    } else {
      drill.streak = 0;
      fb.textContent = `Not quite → ${subjectLabel(v, p)} ${options.join(" / ")}`.replace("j' ", "j'");
      fb.className = "feedback no";
    }
    drill.answered = true;
    $("verb-check").textContent = "Next";
    $("verb-right").textContent = drill.right;
    $("verb-total").textContent = drill.total;
    $("verb-streak").textContent = drill.streak;
    const best = store.get("bestStreak", 0);
    if (drill.streak > best) store.set("bestStreak", drill.streak);
  }
  function skipVerb() {
    const { v, p } = drill.current;
    const fb = $("verb-feedback");
    fb.textContent = `${subjectLabel(v, p)} ${v.forms[p].replace("|", " / ")}`.replace("j' ", "j'");
    fb.className = "feedback close";
    drill.streak = 0;
    $("verb-streak").textContent = 0;
    drill.answered = true;
    $("verb-check").textContent = "Next";
  }
  $("verb-check").addEventListener("click", checkVerb);
  $("verb-skip").addEventListener("click", skipVerb);
  $("verb-input").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); checkVerb(); } });

  /* ---------- boot ---------- */
  renderWeekList();
  renderPicks("quiz-weeks");
  renderPicks("verb-weeks", () => nextVerb(), [...new Set(VERBS.map((v) => v.week))]);
  showQuizHistory();
  openWeek(store.get("lastWeek", WEEKS.length ? WEEKS[WEEKS.length - 1].id : 0));
  renderHome();
  const VIEWS = ["notes", "quiz", "verbs", "conj", "sheets"];
  const fromHash = () => {
    const v = location.hash.replace("#", "").split("/")[0];
    show(VIEWS.includes(v) ? v : "home");
  };
  if (VIEWS.includes(location.hash.replace("#", "").split("/")[0])) fromHash();
  window.addEventListener("hashchange", fromHash);
})();
