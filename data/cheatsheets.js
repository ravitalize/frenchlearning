// Cheatsheets: compact one-page summaries. Each sheet is a set of boxes;
// each box body is written in the same simple markdown as the weekly notes.
// color: header colour of the sheet (blue, red, green, purple, orange, teal).
window.CHEATSHEETS = [
  {
    id: "present-tense",
    title: "Present tense: the 3 verb groups",
    subtitle: "Le présent de l'indicatif · -ER, -IR, -RE and irregular verbs",
    color: "blue",
    weeks: [2, 3, 6],
    boxes: [
      { title: "How it works", md: `Every verb = **radical** (stem) + **ending**.

1. Take the infinitive: parl**er**, fin**ir**, vend**re**.
2. Remove the last 2 letters → radical: **parl-**, **fin-**, **vend-**.
3. Add the ending that matches the subject.

French verbs fall into **3 groups**.` },
      { title: "Group 1: -ER verbs (1er groupe)", md: `All verbs ending in **-er** except **aller**. About 90% of French verbs.

| Subject | Ending | parler | aimer |
| --- | --- | --- | --- |
| je / j' | **-e** | parle | j'aime |
| tu | **-es** | parles | aimes |
| il / elle / on | **-e** | parle | aime |
| nous | **-ons** | parlons | aimons |
| vous | **-ez** | parlez | aimez |
| ils / elles | **-ent** | parlent | aiment |

> **WATCH OUT** -e, -es, -ent are silent: je parle, tu parles, ils parlent all sound "parl".` },
      { title: "Group 2: -IR verbs (2e groupe)", md: `Verbs in **-ir** whose present participle ends in **-issant** (finissant, choisissant).

| Subject | Ending | finir | choisir |
| --- | --- | --- | --- |
| je | **-is** | finis | choisis |
| tu | **-is** | finis | choisis |
| il / elle / on | **-it** | finit | choisit |
| nous | **-issons** | finissons | choisissons |
| vous | **-issez** | finissez | choisissez |
| ils / elles | **-issent** | finissent | choisissent |

Same: agir, bâtir, grandir, grossir, maigrir, mincir, obéir, punir, réfléchir, remplir, réussir, rougir.` },
      { title: "Group 3: everything else (3e groupe)", md: `Irregular or semi-regular verbs. Learn them one by one.

- **-IR without -iss-**: partir, sortir, dormir, servir, venir, tenir, ouvrir, offrir
- **-RE**: vendre, attendre, prendre, mettre, faire
- **-OIR**: avoir, savoir, voir, pouvoir, vouloir
- **aller** (ends in -er but irregular) and **être**

> **RULE** Test for group 2 vs 3: say the "-ant" form. finir → finissant (group 2). partir → partant (group 3).` },
      { title: "-RE verbs (regular pattern)", md: `Remove **-re**, add **-s, -s, —, -ons, -ez, -ent**. (Not covered in class yet.)

| Subject | Ending | vendre (to sell) |
| --- | --- | --- |
| je | **-s** | vends |
| tu | **-s** | vends |
| il / elle / on | **—** (nothing) | vend |
| nous | **-ons** | vendons |
| vous | **-ez** | vendez |
| ils / elles | **-ent** | vendent |

Same: attendre (wait), entendre (hear), répondre (answer), perdre (lose), descendre (go down).` },
      { title: "Group 3 patterns from class", md: `| Pattern | je | nous | ils |
| --- | --- | --- | --- |
| partir: drop the consonant in the singular | pars | partons | partent |
| dormir | dors | dormons | dorment |
| ouvrir: uses -ER endings | ouvre | ouvrons | ouvrent |
| venir: ven- → vien- | viens | venons | viennent |
| tenir | tiens | tenons | tiennent |` },
      { title: "Endings at a glance", md: `| | -ER | -IR (2e) | -RE | partir type |
| --- | --- | --- | --- | --- |
| je | -e | -is | -s | -s |
| tu | -es | -is | -s | -s |
| il | -e | -it | — | -t |
| nous | -ons | -issons | -ons | -ons |
| vous | -ez | -issez | -ez | -ez |
| ils | -ent | -issent | -ent | -ent |

> **RULE** nous almost always ends in **-ons** and vous in **-ez**. Exceptions: nous **sommes**, vous **êtes**, vous **faites**, vous **dites**.` }
    ]
  },
  {
    id: "spelling-change",
    title: "-ER verbs that change spelling",
    subtitle: "Verbes en -GER, -CER, -YER, e → è",
    color: "orange",
    weeks: [3],
    boxes: [
      { title: "-GER: nous + e", md: `manger, nager, ranger, bouger, changer, voyager, partager, corriger

Only **nous** changes: add **e** so g stays soft.

je mange · tu manges · il mange · nous **mangeons** · vous mangez · ils mangent` },
      { title: "-CER: nous + ç", md: `commencer, effacer, lancer, placer, prononcer, pincer

Only **nous** changes: c → **ç** so it stays an s sound.

je commence · nous **commençons** · vous commencez` },
      { title: "-YER: y → i", md: `envoyer, nettoyer, essayer, payer, employer, essuyer

**y → i** before a silent ending (je, tu, il, ils). nous and vous keep y.

| | envoyer | payer |
| --- | --- | --- |
| je | envo**i**e | pa**i**e / paye |
| nous | envo**y**ons | pa**y**ons |
| ils | envo**i**ent | pa**i**ent / payent |

-AYER verbs accept both spellings.` },
      { title: "e → è (acheter, lever)", md: `The e gets a grave accent when the ending is silent.

| | acheter | se lever |
| --- | --- | --- |
| je | ach**è**te | me l**è**ve |
| tu | ach**è**tes | te l**è**ves |
| il | ach**è**te | se l**è**ve |
| nous | achetons | nous levons |
| vous | achetez | vous levez |
| ils | ach**è**tent | se l**è**vent |` },
      { title: "-ELER: double l (appeler)", md: `je m'appe**ll**e · tu t'appe**ll**es · il s'appe**ll**e · ils s'appe**ll**ent
nous nous appelons · vous vous appelez

> **RULE** Silent ending → double consonant. Heard ending (-ons, -ez) → single.` },
      { title: "Memory trick: the boot", md: `Draw a boot around je, tu, il, ils (the 4 silent endings). Inside the boot the spelling changes (è, i, ll). Outside the boot (nous, vous) the verb looks like the infinitive.` }
    ]
  },
  {
    id: "irregular",
    title: "Must-know irregular verbs",
    subtitle: "être, avoir, aller, venir, savoir",
    color: "red",
    weeks: [2, 5, 6],
    boxes: [
      { title: "être (to be)", md: `| | |
| --- | --- |
| je suis | nous sommes |
| tu es | vous êtes |
| il est | ils sont |

C'est = it is / this is. Ce sont = these are.` },
      { title: "avoir (to have)", md: `| | |
| --- | --- |
| j'ai | nous avons |
| tu as | vous avez |
| il a | ils ont |

Il y a = there is / there are.` },
      { title: "aller (to go)", md: `| | |
| --- | --- |
| je vais | nous allons |
| tu vas | vous allez |
| il va | ils vont |

aller **à** + place: Je vais à Nice.` },
      { title: "venir (to come)", md: `| | |
| --- | --- |
| je viens | nous venons |
| tu viens | vous venez |
| il vient | ils viennent |

venir **de** + place: Je viens d'Inde.` },
      { title: "savoir (to know)", md: `| | |
| --- | --- |
| je sais | nous savons |
| tu sais | vous savez |
| il sait | ils savent |

Je sais nager = I know how to swim.` },
      { title: "Don't mix them up", md: `| | they... | sounds like |
| --- | --- | --- |
| ils **ont** | have | eel-zohⁿ |
| ils **sont** | are | eel sohⁿ |
| ils **vont** | go | eel vohⁿ |
| ils **font** | do (faire) | eel fohⁿ |` }
    ]
  },
  {
    id: "articles",
    title: "Articles: a, the, some, of the",
    subtitle: "un / une / des · le / la / les · de · au / du",
    color: "green",
    weeks: [4, 5, 6],
    boxes: [
      { title: "The two kinds", md: `| | Masc. | Fem. | Before vowel | Plural |
| --- | --- | --- | --- | --- |
| a / some (indefinite) | un | une | un / une | des |
| the (definite) | le | la | l' | les |

**un / une / des** = any one. **le / la / les** = a specific one (le livre de Ravi, la voiture BMW).` },
      { title: "In a negative sentence", md: `> **RULE** un / une / des → **de** / **d'** after a negative verb.

- J'ai **un** stylo → Je n'ai pas **de** stylo.
- Nous avons **des** amis → Nous n'avons pas **d'**amis.
- Il y a **des** livres → Il n'y a pas **de** livres.

> **RULE** le / la / les **never** change: Je n'ai pas **la** voiture noire.` },
      { title: "Exception: être", md: `With être the article stays.

- C'est **un** stylo → Ce n'est pas **un** stylo.
- Ce sont **des** livres → Ce ne sont pas **des** livres.` },
      { title: "à + article (to, at, in)", md: `| | |
| --- | --- |
| à + le = **au** | Je vais au cinéma. |
| à + la = à la | Je vais à la gare. |
| à + l' = à l' | Je suis à l'hôtel. |
| à + les = **aux** | Je parle aux étudiants. |` },
      { title: "de + article (from, of)", md: `| | |
| --- | --- |
| de + le = **du** | le stylo du garçon |
| de + la = de la | Je viens de la poste. |
| de + l' = de l' | le père de l'enfant |
| de + les = **des** | Je viens des villages. |

Before a name: **de** / **d'**: le livre de Ravi, la voiture d'Aravind.` },
      { title: "Jobs: no article after il est", md: `- Il est **médecin**. Elle est **chanteuse**.
- C'est **un** médecin. C'est **une** chanteuse.

Never "Il est un médecin".` }
    ]
  },
  {
    id: "questions-negation",
    title: "Questions and negation",
    subtitle: "Est-ce que, inversion, ne ... pas",
    color: "purple",
    weeks: [4, 5],
    boxes: [
      { title: "3 ways to ask a yes/no question", md: `| Style | Tu parles anglais. |
| --- | --- |
| 1. Voice up (casual) | Tu parles anglais ? |
| 2. Est-ce que | Est-ce que tu parles anglais ? |
| 3. Inversion (formal) | Parles-tu anglais ? |

Est-ce que → **est-ce qu'** before a vowel: Est-ce qu'il est là ?` },
      { title: "Inversion rules", md: `- Verb + hyphen + pronoun: Avez-vous un stylo ?
- Add **-t-** between two vowels: Parle-**t**-elle ? A-**t**-il ? Y a-**t**-il ?
- With a name: name + verb + pronoun: **Ravi habite-t-il** à Nice ?` },
      { title: "ne ... pas", md: `**ne** + verb + **pas**. ne → **n'** before a vowel.

- Je **ne** parle **pas** telugu.
- Je **n'**habite **pas** à Paris.
- Il **ne** peut **pas** venir. (around the first verb)

Speaking casually, French people often drop ne: Je parle pas.` },
      { title: "Answering", md: `- Oui, je parle anglais.
- Non, je ne parle pas anglais.
- Answer with the right person: Il a une voiture ? → Oui, **il a** une voiture.` },
      { title: "Question words", md: `| | |
| --- | --- |
| Qu'est-ce que c'est ? | What is it? |
| Où ? | Where? |
| Comment ? | How? |
| Comment tu t'appelles ? | What's your name? |
| Y a-t-il ... ? | Is there ...? |` }
    ]
  },
  {
    id: "places",
    title: "Going to and coming from places",
    subtitle: "à, en, au, aux · de, d', du, des",
    color: "teal",
    weeks: [6],
    boxes: [
      { title: "Cities and countries", md: `| Place | to / in | from |
| --- | --- | --- |
| City | **à** Paris | **de** Paris / **d'**Hyderabad |
| Feminine country (-e) | **en** France | **de** France |
| Country starting with a vowel | **en** Inde | **d'**Inde |
| Masculine country | **au** Canada | **du** Canada |
| Plural country | **aux** États-Unis | **des** États-Unis |` },
      { title: "Country genders", md: `- **Feminine** (usually end in -e): la France, l'Inde, la Chine, l'Italie, l'Allemagne, l'Espagne, la Belgique, la Suisse
- **Masculine**: le Canada, le Japon, le Portugal, le Luxembourg, le Maroc, le Mexique (exception!)
- **Plural**: les États-Unis, les Pays-Bas, les Maldives` },
      { title: "Other places", md: `| to / at | from |
| --- | --- |
| au café, au cinéma, au village | du café, du cinéma |
| à la gare, à la banque | de la gare, de la banque |
| à l'hôtel, à l'hôpital | de l'hôtel, de l'hôpital |
| aux villes | des villes |` },
      { title: "Verbs to use with them", md: `- **aller à**: Je vais à Nice.
- **venir de**: Je viens d'Inde.
- **habiter à / en**: J'habite à Nice, en France.
- **être à / en**: Je suis au Canada.
- **chez** + person: Je vais chez Ravi (to Ravi's place).` }
    ]
  },
  {
    id: "pronouns-adjectives",
    title: "Pronouns and adjectives",
    subtitle: "je / moi / me · agreement · nationalities",
    color: "blue",
    weeks: [1, 2, 3, 5, 6],
    boxes: [
      { title: "The 3 pronoun sets", md: `| Subject | Stressed | Reflexive |
| --- | --- | --- |
| je | moi | me |
| tu | toi | te |
| il | lui | se |
| elle | elle | se |
| nous | nous | nous |
| vous | vous | vous |
| ils | eux | se |
| elles | elles | se |` },
      { title: "When to use stressed pronouns", md: `1. For emphasis: **Moi**, je m'appelle Ravi.
2. After a preposition: avec **moi**, sans **toi**, chez **lui**, après **eux**.
3. After c'est: C'est **moi**.` },
      { title: "Adjective agreement", md: `| | Masc. | Fem. |
| --- | --- | --- |
| Singular | grand | grand**e** |
| Plural | grand**s** | grand**es** |

- Ends in -e: no change in feminine (rouge, belge, suisse).
- Ends in -s: no change in masc. plural (français, gris).
- Mixed group → masculine plural.` },
      { title: "Feminine patterns", md: `| Masc. → Fem. | Example |
| --- | --- |
| -ien → -ienne | indien → indienne |
| -on → -onne | bon → bonne |
| -eur → -euse | chanteur → chanteuse |
| -teur → -trice | acteur → actrice |
| -c → -che / -que | blanc → blanche, grec → grecque |
| -x → -se | roux → rousse |` },
      { title: "Irregular adjectives", md: `| m. | m. before vowel | f. | m. pl. |
| --- | --- | --- | --- |
| beau | bel | belle | beaux |
| nouveau | nouvel | nouvelle | nouveaux |

un **bel** homme, un **nouvel** étudiant.` },
      { title: "Position", md: `- Most adjectives go **after** the noun: une voiture **noire**.
- Short common ones go **before**: un **bon** livre, un **beau** jardin, une **nouvelle** idée, un **grand** homme.` }
    ]
  },
  {
    id: "numbers",
    title: "Numbers 0–100 and ordinals",
    subtitle: "Les nombres cardinaux et ordinaux",
    color: "green",
    weeks: [4],
    boxes: [
      { title: "0–20", md: `0 zéro · 1 un · 2 deux · 3 trois · 4 quatre · 5 cinq · 6 six · 7 sept · 8 huit · 9 neuf · 10 dix
11 onze · 12 douze · 13 treize · 14 quatorze · 15 quinze · 16 seize · 17 dix-sept · 18 dix-huit · 19 dix-neuf · 20 vingt` },
      { title: "Tens", md: `| | | |
| --- | --- | --- |
| 20 vingt | 30 trente | 40 quarante |
| 50 cinquante | 60 soixante | 70 soixante-dix |
| 80 quatre-vingts | 90 quatre-vingt-dix | 100 cent |` },
      { title: "Building numbers", md: `- 21, 31, 41, 51, 61: **et un** (vingt et un)
- 71: soixante **et onze**
- Others: hyphen (vingt-deux, quarante-cinq)
- 81: quatre-vingt-un (no et, no s)
- 70–79 = 60 + 10–19: soixante-quinze = 75
- 90–99 = 80 + 10–19: quatre-vingt-seize = 96` },
      { title: "Ordinals (1st, 2nd...)", md: `Number + **-ième**: deux → deuxième, trois → troisième.

- 1st = premier / première
- drop final e: quatre → quatrième
- cinq → cinquième, neuf → neuvième
- 21st = vingt et unième, 80th = quatre-vingtième` }
    ]
  },
  {
    id: "basics",
    title: "Survival basics",
    subtitle: "Greetings, politeness, days, months, accents",
    color: "red",
    weeks: [1],
    boxes: [
      { title: "Hello and goodbye", md: `| Hello | Goodbye |
| --- | --- |
| Bonjour (day) | Bonne journée |
| Bonsoir (evening) | Bonne soirée / Bonne nuit |
| Salut (friends) | Salut / À plus |
| | Au revoir / À bientôt / À demain |` },
      { title: "Tu or vous?", md: `| | vous | tu |
| --- | --- | --- |
| Please | s'il vous plaît | s'il te plaît |
| Excuse me | excusez-moi | excuse-moi |
| How are you? | Comment allez-vous ? | Ça va ? |
| Your name? | Comment vous appelez-vous ? | Tu t'appelles comment ? |

Not sure? Use **vous**.` },
      { title: "Days and months", md: `No capital letters in French.

lundi · mardi · mercredi · jeudi · vendredi · samedi · dimanche

janvier · février · mars · avril · mai · juin · juillet · août · septembre · octobre · novembre · décembre

Date: **samedi 14 novembre**.` },
      { title: "The 5 accents", md: `| | Example | Effect |
| --- | --- | --- |
| é | café | "ay" |
| è à ù | père, là, où | open e / tells words apart |
| ç | garçon | c = s before a, o, u |
| â ê î ô û | forêt, hôpital | often a lost s (forest, hospital) |
| ë ï | Noël, maïs | say both vowels |` },
      { title: "Sound rules", md: `- Final consonants are usually silent: Paris, vous.
- -ent at the end of a verb is silent.
- h is silent: hôtel = o-tel.
- Liaison: vous‿avez = voo-z-avay.
- je → j' before a vowel: j'aime, j'habite.` }
    ]
  }
];
