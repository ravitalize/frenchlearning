# Notre cahier de français

Weekly French class notes (A1–A2), cleaned up into study notes, with a practice website for the class.

**Website:** https://ravitalize.github.io/frenchlearning/

## What's on the site

- **Notes**: one page per class weekend, with rule boxes, examples, "watch out" traps and corrections.
- **Quiz**: the practice questions from each week. Write your answer, compare it with the model answer, then mark yourself. Missed questions come back at the end of the round.
- **Verb drill**: present-tense conjugation practice for the verbs covered so far (être, avoir, aller, venir, -ER, -IR, reflexive verbs...). Accents are checked, and there is an accent keyboard.

- **Conjugations**: every verb from class (98 so far) with all its present-tense forms, searchable and filterable by group. Switch on **Pronunciation help** to see how each form sounds, written in **English, Hindi (हिंदी) or Telugu (తెలుగు)** letters. Sounds that don't exist in that language are highlighted and explained.

It works on phones too. Progress is saved only in your own browser.

## Weeks so far

| Week | Class dates | Topics |
| --- | --- | --- |
| 1 | Oct 4 | Greetings (tu / vous), days and months, alphabet sounds, accents, subject pronouns |
| 2 | Oct 10–11 | Être, s'appeler, habiter (-ER), stressed pronouns, nationality adjectives, c'est |
| 3 | Oct 18 | -ER verbs, -GER / -CER / -YER spelling changes, reflexive verbs |
| 4 | Oct 24–25 | 3 ways to ask questions, ne...pas, un / une / des → de, numbers 0–100 |
| 5 | Oct 31 – Nov 1 | le / la / les, il y a, colour adjectives, countries, avoir, savoir, aller |
| 6 | Nov 7–8 | Job nouns m/f, irregular adjectives, -IR verbs, venir, à / en / au / du with places |

## Adding a new week

1. Add `notes/week-07.md`, following the same layout as the other weeks. It must end with a `## Practice` list and a `## Answers` list with the same number of items.
2. Run `python3 build.py`. This rebuilds `data/notes.js`, which the site reads.
3. Optional: add new verbs to `data/verbs.js` (with their IPA pronunciation) or, for regular -ER / -IR verbs, just the spoken stem to `data/verbs-regular.js`. Pronunciation in English, Hindi and Telugu is generated from the IPA by `phonetics.js`.
4. Commit and push. GitHub Pages updates in a minute or two.

## Run it locally

Open `index.html` in a browser. No server or install is needed.

## Corrections

These are student notes. If you spot a mistake, please [open an issue](https://github.com/ravitalize/frenchlearning/issues).
