# Changelog

All notable changes to the notes and the website. Newest first.
Versions follow `MAJOR.MINOR.PATCH`: a new feature or page bumps MINOR, fixes and small content corrections bump PATCH, and a new week of notes is listed under the release that adds it.

## [1.4.1] - 2026-11-14

### Changed
- Weekly notes: the "Fixes to the class notes" section is now **Keep in mind**, rewritten as a friendly list of easy slips to avoid, with the correct form first.
- Homepage and footer now say the site is made from my weekend class notes.

## [1.4.0] - 2026-11-14

### Added
- **Week 7 (Nov 14)** notes: question words (où, d'où, qui, quand, combien, comment, pourquoi, quel, qu'est-ce que, que, quoi), quel agreement and lequel, answering negative questions with si, negation with two verbs, regular -RE verbs, and the irregular verbs prendre, apprendre, comprendre, faire, dire, lire, écrire, connaître, pouvoir, vouloir. 13 new quiz questions.
- 25 new verbs on the Conjugations page (123 in total), with pronunciation help, and a new **-RE** filter. Regular -RE verbs are generated from `data/verbs-regular.js`.
- 15 new verbs in the Verb drill (44 in total), with a Week 7 filter.
- New **Question words** cheatsheet.
- Two new fun facts on the homepage.

### Fixed
- Links that change only the part after # (for example a cheatsheet link opened from the same page, or the browser Back button) now switch to the right tab.

### Changed
- Cheatsheets updated for Week 7: -RE verbs are no longer marked "not covered yet"; new boxes for faire, prendre, dire/lire/écrire, pouvoir/vouloir, savoir vs connaître, jeter, préférer, "si" and two-verb negation.

## [1.3.0] - 2026-11-14

### Added
- **Homepage**: the site's main link now opens a landing page instead of the Notes tab.
  - Hero line: "French wasn't designed by a linguist. It was designed by an artist."
  - Live counts of weeks, quiz questions, verbs and cheatsheets.
  - "Par où veux-tu commencer ? / Where do you want to start?" with a card for each tab.
  - "Le saviez-vous ?" fun facts about French, with a button for another one.
  - A "Contact me on LinkedIn" button.
- **Home** tab in the menu; clicking the site title also goes home.

### Fixed
- The cheatsheet count is now available to the rest of the site (scripts load in the right order).

## [1.2.0] - 2026-11-14

### Added
- **Cheatsheets** tab: 9 one-page summaries in a multi-column box layout, each printable on one A4 landscape page (or saved as a PDF):
  - Present tense: the 3 verb groups (-ER, -IR, -RE and irregular verbs, with an endings-at-a-glance table)
  - -ER verbs that change spelling (-GER, -CER, -YER, e → è, -ELER)
  - Must-know irregular verbs (être, avoir, aller, venir, savoir)
  - Articles (un/une/des, le/la/les, de in negatives, au/aux/du/des)
  - Questions and negation
  - Going to and coming from places (à, en, au, aux / de, d', du, des)
  - Pronouns and adjectives
  - Numbers 0–100 and ordinals
  - Survival basics (greetings, tu/vous, days, months, accents)
- Direct links to a cheatsheet, for example `#sheets/present-tense`.
- This changelog, and the version number in the site footer.

### Changed
- On phones, the tab bar scrolls sideways and keeps the open tab in view.
- Tables whose header row is empty no longer show a blank header.

## [1.1.0] - 2026-11-14

### Added
- **Conjugations** tab: 98 verbs (the 29 taught in class plus the regular -ER and -IR verbs from the class lists), with all present-tense forms, search and group filters.
- **Pronunciation help** on the Conjugations tab: each form respelled in English, Hindi (हिंदी) or Telugu (తెలుగు) letters, generated from IPA. Sounds a language doesn't have (French r, "zh", u, eu, nasal vowels) are highlighted and explained in a guide.
- `data/verbs-regular.js`: regular verbs listed by their spoken stem, so new ones need only one line.
- Noto Sans Devanagari and Noto Sans Telugu web fonts.

### Fixed
- The "-IR" filter no longer includes irregular verbs.

## [1.0.0] - 2026-11-14

### Added
- Cleaned-up study notes for weeks 1–6 (Oct 4 – Nov 8) in `notes/`, with rules, examples, "watch out" traps, fixes to the class notes, and practice questions with answers.
- Website with three tabs:
  - **Notes**: one notebook-style page per class weekend.
  - **Quiz**: 68 practice questions, choose the weeks, self-marking, missed questions come back at the end.
  - **Verb drill**: present-tense practice for 29 verbs, with accent checking and an accent keyboard.
- `build.py` to bundle the notes into `data/notes.js`.
- README with instructions for adding a new week.

[1.4.1]: https://github.com/ravitalize/frenchlearning/compare/9796ae9...main
[1.4.0]: https://github.com/ravitalize/frenchlearning/compare/6f359bc...9796ae9
[1.3.0]: https://github.com/ravitalize/frenchlearning/compare/e259d11...6f359bc
[1.2.0]: https://github.com/ravitalize/frenchlearning/compare/9e6d33a...facedde
[1.1.0]: https://github.com/ravitalize/frenchlearning/compare/b7dada3...9e6d33a
[1.0.0]: https://github.com/ravitalize/frenchlearning/commit/b7dada3
