// Verbs for the conjugation drill. Forms are for: je, tu, il/elle, nous, vous, ils/elles.
// A form can list alternatives separated by "|" (both are accepted).
// "week" is the class weekend where the verb was taught.
window.VERBS = [
  { inf: "être", en: "to be", week: 2, forms: ["suis", "es", "est", "sommes", "êtes", "sont"] },
  { inf: "s'appeler", en: "to be called", week: 2, forms: ["m'appelle", "t'appelles", "s'appelle", "nous appelons", "vous appelez", "s'appellent"] },
  { inf: "habiter", en: "to live", week: 2, elide: true, forms: ["habite", "habites", "habite", "habitons", "habitez", "habitent"] },
  { inf: "parler", en: "to speak", week: 3, forms: ["parle", "parles", "parle", "parlons", "parlez", "parlent"] },
  { inf: "écouter", en: "to listen", week: 3, elide: true, forms: ["écoute", "écoutes", "écoute", "écoutons", "écoutez", "écoutent"] },
  { inf: "manger", en: "to eat", week: 3, forms: ["mange", "manges", "mange", "mangeons", "mangez", "mangent"] },
  { inf: "voyager", en: "to travel", week: 3, forms: ["voyage", "voyages", "voyage", "voyageons", "voyagez", "voyagent"] },
  { inf: "commencer", en: "to begin", week: 3, forms: ["commence", "commences", "commence", "commençons", "commencez", "commencent"] },
  { inf: "effacer", en: "to erase", week: 3, elide: true, forms: ["efface", "effaces", "efface", "effaçons", "effacez", "effacent"] },
  { inf: "payer", en: "to pay", week: 3, forms: ["paie|paye", "paies|payes", "paie|paye", "payons", "payez", "paient|payent"] },
  { inf: "envoyer", en: "to send", week: 3, elide: true, forms: ["envoie", "envoies", "envoie", "envoyons", "envoyez", "envoient"] },
  { inf: "nettoyer", en: "to clean", week: 3, forms: ["nettoie", "nettoies", "nettoie", "nettoyons", "nettoyez", "nettoient"] },
  { inf: "acheter", en: "to buy", week: 3, elide: true, forms: ["achète", "achètes", "achète", "achetons", "achetez", "achètent"] },
  { inf: "se lever", en: "to get up", week: 3, forms: ["me lève", "te lèves", "se lève", "nous levons", "vous levez", "se lèvent"] },
  { inf: "se coucher", en: "to go to bed", week: 3, forms: ["me couche", "te couches", "se couche", "nous couchons", "vous couchez", "se couchent"] },
  { inf: "s'amuser", en: "to have fun", week: 3, forms: ["m'amuse", "t'amuses", "s'amuse", "nous amusons", "vous amusez", "s'amusent"] },
  { inf: "avoir", en: "to have", week: 5, elide: true, forms: ["ai", "as", "a", "avons", "avez", "ont"] },
  { inf: "savoir", en: "to know", week: 5, forms: ["sais", "sais", "sait", "savons", "savez", "savent"] },
  { inf: "aller", en: "to go", week: 5, forms: ["vais", "vas", "va", "allons", "allez", "vont"] },
  { inf: "finir", en: "to finish", week: 6, forms: ["finis", "finis", "finit", "finissons", "finissez", "finissent"] },
  { inf: "choisir", en: "to choose", week: 6, forms: ["choisis", "choisis", "choisit", "choisissons", "choisissez", "choisissent"] },
  { inf: "réussir", en: "to succeed", week: 6, forms: ["réussis", "réussis", "réussit", "réussissons", "réussissez", "réussissent"] },
  { inf: "partir", en: "to leave", week: 6, forms: ["pars", "pars", "part", "partons", "partez", "partent"] },
  { inf: "sortir", en: "to go out", week: 6, forms: ["sors", "sors", "sort", "sortons", "sortez", "sortent"] },
  { inf: "dormir", en: "to sleep", week: 6, forms: ["dors", "dors", "dort", "dormons", "dormez", "dorment"] },
  { inf: "ouvrir", en: "to open", week: 6, elide: true, forms: ["ouvre", "ouvres", "ouvre", "ouvrons", "ouvrez", "ouvrent"] },
  { inf: "offrir", en: "to offer", week: 6, elide: true, forms: ["offre", "offres", "offre", "offrons", "offrez", "offrent"] },
  { inf: "venir", en: "to come", week: 6, forms: ["viens", "viens", "vient", "venons", "venez", "viennent"] },
  { inf: "tenir", en: "to hold", week: 6, forms: ["tiens", "tiens", "tient", "tenons", "tenez", "tiennent"] }
];
