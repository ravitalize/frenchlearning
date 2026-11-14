/* Pronunciation help: turns a French IPA transcription into an easy respelling
   in English letters, Hindi (Devanagari) or Telugu script.
   Sounds that don't exist in the target language are flagged so the page can
   highlight them and explain them in a legend. */
(function () {
  "use strict";

  const VOWELS = new Set(["a", "ɑ", "e", "ɛ", "ə", "i", "o", "ɔ", "u", "y", "ø", "œ", "ɑ̃", "ɔ̃", "ɛ̃"]);
  const GLIDES = new Set(["j", "w", "ɥ"]);
  const LIQUIDS = new Set(["l", "ʁ"]);
  const OBSTRUENTS = new Set(["p", "b", "t", "d", "k", "g", "f", "v"]);

  /* Split an IPA string into words of phoneme tokens. "." and "‿" are ignored. */
  function tokenize(ipa) {
    const words = [];
    let cur = [];
    const chars = [...ipa.normalize("NFD")];
    for (let i = 0; i < chars.length; i++) {
      let c = chars[i];
      if (c === " ") { if (cur.length) words.push(cur); cur = []; continue; }
      if (c === "." || c === "‿" || c === "ˈ") continue;
      if (c === "̃") continue; // handled with its vowel
      if (chars[i + 1] === "̃") {
        // nasal vowel
        if (c === "a" || c === "ɑ") c = "ɑ̃";
        else if (c === "o" || c === "ɔ") c = "ɔ̃";
        else c = "ɛ̃"; // ɛ̃ and œ̃
        cur.push(c); i++; continue;
      }
      if (c === "r") c = "ʁ";
      if (c === "g") c = "g";
      cur.push(c);
    }
    if (cur.length) words.push(cur);
    return words;
  }
  const isV = (t) => VOWELS.has(t);

  /* Split one word into syllables (used for the English respelling). */
  function syllabify(word) {
    const nuclei = [];
    word.forEach((t, i) => { if (isV(t)) nuclei.push(i); });
    if (nuclei.length < 2) return [word];
    const cuts = [];
    for (let n = 0; n < nuclei.length - 1; n++) {
      const a = nuclei[n], b = nuclei[n + 1];
      const cons = word.slice(a + 1, b);
      let onset = 0;
      if (cons.length === 1) onset = 1;
      else if (cons.length >= 2) {
        onset = 1;
        const last = cons[cons.length - 1], prev = cons[cons.length - 2];
        if (GLIDES.has(last)) {
          onset = 2;
          const p3 = cons[cons.length - 3];
          if (cons.length >= 3 && LIQUIDS.has(prev) && OBSTRUENTS.has(p3)) onset = 3;
        } else if (LIQUIDS.has(last) && OBSTRUENTS.has(prev)) onset = 2;
      }
      cuts.push(b - onset);
    }
    const out = [];
    let start = 0;
    cuts.forEach((c) => { out.push(word.slice(start, c)); start = c; });
    out.push(word.slice(start));
    return out;
  }

  /* Which special sounds a token carries, per target language. */
  const SPECIAL = {
    en: { "ʒ": "zh", "ʁ": "r", "y": "u", "ø": "eu", "œ": "eu", "ɑ̃": "nasal", "ɔ̃": "nasal", "ɛ̃": "nasal", "ɥ": "u" },
    hi: { "ʒ": "zh", "ʁ": "r", "y": "u", "ø": "eu", "œ": "eu", "ɑ̃": "nasal", "ɔ̃": "nasal", "ɛ̃": "nasal", "ɥ": "u" },
    te: { "ʒ": "zh", "ʁ": "r", "y": "u", "ø": "eu", "œ": "eu", "ɑ̃": "nasal", "ɔ̃": "nasal", "ɛ̃": "nasal", "ɥ": "u", "ə": "schwa", "z": "z", "f": "f" }
  };

  /* ---------- English respelling ---------- */
  const EN_C = { p: "p", b: "b", t: "t", d: "d", k: "k", g: "g", f: "f", v: "v", s: "s", z: "z", "ʃ": "sh", "ʒ": "zh", m: "m", n: "n", "ɲ": "ny", l: "l", "ʁ": "r", j: "y", w: "w", "ɥ": "w" };
  const EN_V = { a: "a", "ɑ": "a", e: "ay", "ɛ": "eh", "ə": "uh", i: "ee", o: "oh", "ɔ": "o", u: "oo", y: "ü", "ø": "ö", "œ": "ö", "ɑ̃": "ahⁿ", "ɔ̃": "ohⁿ", "ɛ̃": "aⁿ" };

  function toEnglish(word) {
    const units = [];
    syllabify(word).forEach((syl, si) => {
      if (si > 0) units.push({ text: "-" });
      syl.forEach((t) => {
        let text = isV(t) ? EN_V[t] : EN_C[t];
        // "eh" before a consonant in the same syllable reads better as "e" (pehl -> pel)
        units.push({ text: text || t, special: SPECIAL.en[t] });
      });
    });
    return units;
  }

  /* ---------- Indic scripts (shared builder) ---------- */
  const HI = {
    c: { p: "प", b: "ब", t: "त", d: "द", k: "क", g: "ग", f: "फ़", v: "व", s: "स", z: "ज़", "ʃ": "श", "ʒ": "झ़", m: "म", n: "न", "ɲ": "न्य", l: "ल", "ʁ": "ग़", j: "य", w: "व", "ɥ": "व" },
    matra: { a: "ा", "ɑ": "ा", e: "े", "ɛ": "ै", "ə": "", i: "ी", o: "ो", "ɔ": "ॉ", u: "ू", y: "ी", "ø": "े", "œ": "े", "ɑ̃": "ाँ", "ɔ̃": "ों", "ɛ̃": "ैं" },
    ind: { a: "आ", "ɑ": "आ", e: "ए", "ɛ": "ऐ", "ə": "अ", i: "ई", o: "ओ", "ɔ": "ऑ", u: "ऊ", y: "ई", "ø": "ए", "œ": "ए", "ɑ̃": "आँ", "ɔ̃": "ओं", "ɛ̃": "ऐं" },
    virama: "्",
    finalVirama: false
  };
  const TE = {
    c: { p: "ప", b: "బ", t: "త", d: "ద", k: "క", g: "గ", f: "ఫ", v: "వ", s: "స", z: "జ", "ʃ": "శ", "ʒ": "ఝ", m: "మ", n: "న", "ɲ": "న్య", l: "ల", "ʁ": "ర", j: "య", w: "వ", "ɥ": "వ" },
    matra: { a: "", "ɑ": "", e: "ే", "ɛ": "ె", "ə": "ె", i: "ీ", o: "ో", "ɔ": "ొ", u: "ూ", y: "ీ", "ø": "ే", "œ": "ే", "ɑ̃": "ాం", "ɔ̃": "ోం", "ɛ̃": "ెం" },
    ind: { a: "అ", "ɑ": "అ", e: "ఏ", "ɛ": "ఎ", "ə": "ఎ", i: "ఈ", o: "ఓ", "ɔ": "ఒ", u: "ఊ", y: "ఈ", "ø": "ఏ", "œ": "ఏ", "ɑ̃": "ఆం", "ɔ̃": "ఓం", "ɛ̃": "ఎం" },
    virama: "్",
    finalVirama: true
  };

  function toIndic(word, S, specials) {
    const units = [];
    for (let i = 0; i < word.length;) {
      const t = word[i];
      if (isV(t)) {
        units.push({ text: S.ind[t], special: specials[t] });
        i++;
        continue;
      }
      const cons = S.c[t] || t;
      const next = word[i + 1];
      if (next !== undefined && isV(next)) {
        units.push({ text: cons + S.matra[next], special: specials[t] || specials[next] });
        i += 2;
      } else if (next !== undefined) {
        units.push({ text: cons + S.virama, special: specials[t] });
        i++;
      } else {
        units.push({ text: cons + (S.finalVirama ? S.virama : ""), special: specials[t] });
        i++;
      }
    }
    return units;
  }

  /* Public: pronounce(ipa, lang) -> array of {text, special?} units, words separated by {text:" "} */
  function pronounce(ipa, lang) {
    const words = tokenize(ipa);
    const out = [];
    words.forEach((w, wi) => {
      if (wi > 0) out.push({ text: " " });
      if (lang === "en") out.push(...toEnglish(w));
      else if (lang === "hi") out.push(...toIndic(w, HI, SPECIAL.hi));
      else if (lang === "te") out.push(...toIndic(w, TE, SPECIAL.te));
    });
    return out;
  }

  /* Legend: what each flagged sound means, with references the learner already knows. */
  const LEGEND = {
    en: {
      title: "How to read the English respelling",
      intro: "Read it like English, syllable by syllable, with a light stress on the last syllable. Highlighted letters are sounds English doesn't have.",
      items: {
        zh: ["zh", "The \"s\" in measure or pleasure: je = zhuh."],
        r: ["r", "French r comes from the back of the throat, like a soft gargle. Not the English r."],
        u: ["ü", "Say \"ee\", then round your lips as if for \"oo\" without moving your tongue: tu = tü."],
        eu: ["ö", "Say \"ay\" with rounded lips. Close to the vowel in British \"bird\" without the r."],
        nasal: ["ahⁿ / ohⁿ / aⁿ", "Nasal vowels: say the vowel through your nose and stop before the n. Never pronounce the n."]
      }
    },
    hi: {
      title: "हिंदी लिपि में उच्चारण कैसे पढ़ें",
      intro: "Read it like Hindi. Highlighted letters are sounds that Hindi doesn't have exactly; tap or hover for a tip.",
      items: {
        zh: ["झ़", "Like ज but with a buzz, the \"s\" in English measure. झ़ = zh."],
        r: ["ग़", "French r is made in the throat, close to the Urdu ग़ in ग़ज़ल or ग़लत. Not the tongue र."],
        u: ["ी (u)", "French u: say ई, but round your lips as for ऊ. tu = \"ती\" with round lips."],
        eu: ["े (eu)", "Say ए with rounded lips (as for ओ)."],
        nasal: ["आँ / ओं / ऐं", "Nasal vowels, as in माँ or हैं. Air through the nose; never add a full न."]
      }
    },
    te: {
      title: "తెలుగు లిపిలో ఉచ్చారణ ఎలా చదవాలి",
      intro: "Read it like Telugu. Highlighted letters are sounds that Telugu doesn't have; tap or hover for a tip.",
      items: {
        zh: ["ఝ", "Softer than ఝ: a buzzing \"zh\", the \"s\" in English measure. Keep the tongue off the roof of the mouth."],
        r: ["ర", "French r is NOT the tongue ర. Make it at the back of the throat, like a light gargle (the Urdu gh in ghazal)."],
        u: ["ీ (u)", "French u: say ఈ, but round your lips as for ఊ. tu = \"తీ\" with round lips."],
        eu: ["ే (eu)", "Say ఏ with rounded lips (as for ఓ)."],
        schwa: ["ె (e)", "A short, relaxed \"uh\" sound with slightly rounded lips, as in je, me, le. Lighter than ఎ."],
        nasal: ["ాం / ోం / ెం", "Nasal vowels: say the vowel through your nose. Do NOT close your mouth for మ or న at the end."],
        z: ["జ (z)", "The English z in zoo: a buzzing స, not జ."],
        f: ["ఫ (f)", "The English f: top teeth on the lower lip. Not ప్హ."]
      }
    }
  };

  window.Phonetics = { pronounce, tokenize, syllabify, LEGEND };
})();
