// ============================================================
//  mockData.js — Données fictives
// ============================================================

export const NAV_ITEMS = [
  { id: "dashboard",  label: "Tableau de bord",             icon: "home"     },
  { id: "saes",       label: "Liste des SAE",               icon: "list"     },
  { id: "students",   label: "Étudiants",                   icon: "students" },
  { id: "announce",   label: "Mes annonces",                icon: "announce" },
  { id: "messages",   label: "Messagerie",                  icon: "message"  },
  { id: "validate",   label: "Validation des publications", icon: "validate" },
  { id: "settings",   label: "Paramètres",                  icon: "settings" },
];

export const MESSAGES = [
  { id: 1, name: "Linh Chassang",     unread: true,  date: "Aujourd'hui 09:12", preview: "Bonjour, j'ai une question sur le rendu…" },
  { id: 2, name: "Sarah Donsoun",     unread: true,  date: "Aujourd'hui 08:45", preview: "Est-ce que le délai peut être prolongé ?" },
  { id: 3, name: "Marine Boyer",      unread: true,  date: "Hier 17:30",        preview: "Merci pour votre retour sur notre maquette." },
  { id: 4, name: "Alisson Lappp",     unread: false, date: "Hier 14:20",        preview: "D'accord, on modifie la partie CSS." },
  { id: 5, name: "Perrine Blois",     unread: false, date: "Lundi 11:05",       preview: "Notre groupe a terminé la partie React." },
  { id: 6, name: "Clémentine Fraise", unread: false, date: "Lundi 09:00",       preview: "Voici le lien vers notre dépôt GitHub." },
];

export const GROUP_PROGRESS = [
  { id: 1, sae: "SAE 403", group: "Groupe 1", task: "Configurer le projet React",        done: true  },
  { id: 2, sae: "SAE 403", group: "Groupe 2", task: "Mettre en place la base de données", done: true  },
  { id: 3, sae: "SAE 406", group: "Groupe 1", task: "Réaliser la charte graphique",       done: true  },
  { id: 4, sae: "SAE 406", group: "Groupe 2", task: "Intégrer les maquettes Figma",       done: false },
];

export const QUICK_STATS = [
  { label: "SAE actives",        value: 3,  color: "#7c3aed" },
  { label: "Groupes suivis",     value: 12, color: "#9d5cf5" },
  { label: "Rendus en attente",  value: 5,  color: "#f59e0b" },
  { label: "Livrables validés",  value: 28, color: "#22c55e" },
];

export const SAES = [
  { id: 1, code: "SAE 401", titre: "Développement web avancé",   semestre: "S4", etat: "en_cours",  progression: 65, groupes: 4, echeance: "2025-03-15" },
  { id: 2, code: "SAE 403", titre: "Projet React / Symfony",      semestre: "S4", etat: "en_cours",  progression: 70, groupes: 6, echeance: "2025-04-01" },
  { id: 3, code: "SAE 406", titre: "Identité visuelle & UX",      semestre: "S4", etat: "en_cours",  progression: 10, groupes: 6, echeance: "2025-05-10" },
  { id: 4, code: "SAE 301", titre: "Application multimédia",      semestre: "S3", etat: "termine",   progression: 100, groupes: 5, echeance: "2024-12-20" },
  { id: 5, code: "SAE 302", titre: "Conception de base de données",semestre: "S3", etat: "termine",   progression: 100, groupes: 5, echeance: "2024-12-15" },
  { id: 6, code: "SAE 501", titre: "Projet de fin d'études",       semestre: "S5", etat: "a_venir",   progression: 0,   groupes: 0, echeance: "2025-09-01" },
];

export const STUDENTS = [
  { id: 1, nom: "Chassang",  prenom: "Linh",       groupe: "Groupe 1", semestre: "S4", progression: 72, email: "linh.chassang@etudiant.fr"     },
  { id: 2, nom: "Donsoun",   prenom: "Sarah",      groupe: "Groupe 1", semestre: "S4", progression: 85, email: "sarah.donsoun@etudiant.fr"     },
  { id: 3, nom: "Boyer",     prenom: "Marine",     groupe: "Groupe 2", semestre: "S4", progression: 60, email: "marine.boyer@etudiant.fr"      },
  { id: 4, nom: "Lappp",     prenom: "Alisson",    groupe: "Groupe 2", semestre: "S4", progression: 90, email: "alisson.lappp@etudiant.fr"     },
  { id: 5, nom: "Blois",     prenom: "Perrine",    groupe: "Groupe 3", semestre: "S4", progression: 45, email: "perrine.blois@etudiant.fr"     },
  { id: 6, nom: "Fraise",    prenom: "Clémentine", groupe: "Groupe 3", semestre: "S4", progression: 78, email: "clementine.fraise@etudiant.fr" },
];

export const ANNONCES = [
  { id: 1, titre: "Report de l'échéance SAE 403",         sae: "SAE 403", date: "2025-03-10", contenu: "Suite à vos retours, l'échéance est repoussée d'une semaine."    },
  { id: 2, titre: "Rappel : dépôt des livrables SAE 406", sae: "SAE 406", date: "2025-03-08", contenu: "N'oubliez pas de déposer vos livrables avant vendredi 17h."       },
  { id: 3, titre: "Nouvelles consignes Figma",            sae: "SAE 401", date: "2025-03-05", contenu: "Les maquettes doivent inclure les versions mobile et desktop."    },
];

export const VALIDATIONS = [
  { id: 1, etudiant: "Linh Chassang",     sae: "SAE 403", fichier: "rendu_groupe1.zip",    date: "2025-03-12", statut: "en_attente" },
  { id: 2, etudiant: "Marine Boyer",      sae: "SAE 403", fichier: "rapport_final.pdf",    date: "2025-03-11", statut: "en_attente" },
  { id: 3, etudiant: "Perrine Blois",     sae: "SAE 406", fichier: "maquettes_v2.fig",     date: "2025-03-10", statut: "en_attente" },
  { id: 4, etudiant: "Sarah Donsoun",     sae: "SAE 401", fichier: "projet_react.zip",     date: "2025-03-09", statut: "valide"     },
  { id: 5, etudiant: "Clémentine Fraise", sae: "SAE 401", fichier: "presentation.pdf",     date: "2025-03-08", statut: "refuse"     },
];




// Navigation sidebar — vue ÉTUDIANTE (différente de l'enseignant)
export const NAV_ITEMS_STUDENT = [
  { id: "dashboard",  label: "Tableau de bord",       icon: "home"     },
  { id: "saes",       label: "Liste SAE",              icon: "list"     },
  { id: "documents",  label: "Documents",              icon: "file"     },
  { id: "annonces",   label: "Annonces",               icon: "announce", badge: 5 },
  { id: "publier",    label: "Publier une SAE",        icon: "plus"     },
  { id: "messages",   label: "Messagerie",             icon: "message"  },
  // { id: "contact",    label: "Contacter un enseignant",icon: "students" },
  { id: "settings",   label: "Paramètres",             icon: "settings" },
]

// Prochains rendus de l'étudiant
export const PROCHAINS_RENDUS = [
  { id: 1, date: "12/08", delai: "dans 13 jours", sae: "SAE 403" },
  { id: 2, date: "29/08", delai: "dans 23 jours", sae: "SAE 408" },
  { id: 3, date: "04/09", delai: "dans 50 jours", sae: "SAE 407" },
]

// SAE de l'étudiant
export const SAES_STUDENT = [
  { id: 1, code: "SAE 403", titre: "Projet React / Symfony",  progression: 70, etat: "en_cours", echeance: "2025-08-12" },
  { id: 2, code: "SAE 406", titre: "Identité visuelle & UX",  progression: 10, etat: "en_cours", echeance: "2025-05-10" },
  { id: 3, code: "SAE 407", titre: "Expérience utilisateur",  progression: 45, etat: "en_cours", echeance: "2025-09-04" },
  { id: 4, code: "SAE 408", titre: "Projet multimédia",       progression: 30, etat: "en_cours", echeance: "2025-08-29" },
  { id: 5, code: "SAE 401", titre: "Développement web",       progression: 90, etat: "en_cours", echeance: "2025-03-15" },
  { id: 6, code: "SAE 302", titre: "Conception BDD",          progression: 100, etat: "termine", echeance: "2024-12-15" },
]

// Annonces reçues par l'étudiant
export const ANNONCES_STUDENT = [
  { id: 1, titre: "Report de l'échéance SAE 403",         sae: "SAE 403", date: "2025-03-10", lue: false, contenu: "Suite à vos retours, l'échéance est repoussée d'une semaine." },
  { id: 2, titre: "Rappel : dépôt des livrables SAE 406", sae: "SAE 406", date: "2025-03-08", lue: false, contenu: "N'oubliez pas de déposer vos livrables avant vendredi 17h."    },
  { id: 3, titre: "Nouvelles consignes Figma",            sae: "SAE 401", date: "2025-03-05", lue: false, contenu: "Les maquettes doivent inclure les versions mobile et desktop." },
  { id: 4, titre: "Réunion de groupe obligatoire",        sae: "SAE 407", date: "2025-03-03", lue: false, contenu: "Présence obligatoire jeudi 13h salle C204."                    },
  { id: 5, titre: "Ressources mises à jour",              sae: "SAE 408", date: "2025-03-01", lue: true,  contenu: "De nouvelles ressources ont été ajoutées sur la plateforme."  },
]

// Documents de l'étudiant
export const DOCUMENTS_STUDENT = [
  { id: 1, nom: "rapport_sae403.pdf",    sae: "SAE 403", taille: "2.4 Mo", date: "2025-03-10", type: "rendu"    },
  { id: 2, nom: "maquettes_v2.fig",      sae: "SAE 406", taille: "8.1 Mo", date: "2025-03-08", type: "rendu"    },
  { id: 3, nom: "consignes_sae407.pdf",  sae: "SAE 407", taille: "0.8 Mo", date: "2025-03-05", type: "ressource"},
  { id: 4, nom: "brief_sae408.pdf",      sae: "SAE 408", taille: "1.2 Mo", date: "2025-03-01", type: "ressource"},
]


export const PROJETS = [
  {
    id: "1",
    titre: "AMBORELLA",
    auteur: "par Beyoncé",
    sae: "SAE 1.03",
    semestre: 1,
    categorie: "Réalité Virtuelle",
    couleurFond: "#1ebe6e",
    couleurTexte: "#ffffff",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor diam et leo aliquam, ut dapibus velit sagittis. Ut sit amet massa tellus. In sagittis aliquam commodo. Mauris condimentum risus arcu, sit amet interdum quam tempor vel. Pellentesque luctus luctus pretium. Suspendisse potenti. Aenean fermentum augue ut lacus rhoncus, maximus venenatis tortor consectetur.",
    photoMain: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
    photosSecond: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80",
    ],
    pdf: null,
    visible: true,
  },
  {
    id: "2",
    titre: "FUTURPROOF",
    auteur: "par Bastien Lecarpentier",
    sae: "SAE 2.01",
    semestre: 2,
    categorie: "Réalité Virtuelle",
    couleurFond: "#221A47",
    couleurTexte: "#d4ff00",
    description: "Futurproof est une application de réalité virtuelle pensée pour accompagner les étudiants dans leur orientation professionnelle. Le projet explore les interfaces immersives et la narration spatiale pour créer une expérience mémorable et impactante.",
    photoMain: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80",
    photosSecond: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80",
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&q=80",
      "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=400&q=80",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80",
    ],
    pdf: null,
    visible: true,
  },
  {
    id: "3",
    titre: "MANY",
    auteur: "par Elise Vazquez",
    sae: "SAE 1.02",
    semestre: 1,
    categorie: "Webdesign",
    couleurFond: "#f5f0e8",
    couleurTexte: "#1a1a2e",
    description: "MANY est un projet de webdesign éditorial explorant la mise en page typographique et la hiérarchie visuelle dans un contexte de magazine numérique interactif.",
    photoMain: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    photosSecond: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&q=80",
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&q=80",
    ],
    pdf: null,
    visible: true,
  },
  {
    id: "4",
    titre: "PREMIA",
    auteur: "par Dounia Amrani",
    sae: "SAE 1.04",
    semestre: 1,
    categorie: "Graphisme",
    couleurFond: "#1a1a2e",
    couleurTexte: "#ffffff",
    description: "Premia est une identité visuelle complète pour un studio de design haut de gamme. Le projet couvre le logo, la charte graphique, les supports de communication et le site vitrine.",
    photoMain: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    photosSecond: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&q=80",
    ],
    pdf: null,
    visible: true,
  },
  {
    id: "5",
    titre: "BALAIO",
    auteur: "par Jade Morel",
    sae: "SAE 2.03",
    semestre: 2,
    categorie: "Graphisme",
    couleurFond: "#ff6b35",
    couleurTexte: "#ffffff",
    description: "Balaio est un projet de design graphique autour d'une collection de disques vinyles brésiliens. La direction artistique s'inspire des affiches de concerts des années 70.",
    photoMain: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80",
    photosSecond: [
      "https://images.unsplash.com/photo-1500462918058-0212af332837?w=400&q=80",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    ],
    pdf: null,
    visible: true,
  },
  {
    id: "6",
    titre: "NEST",
    auteur: "par Karim Bensaid",
    sae: "SAE 3.01",
    semestre: 3,
    categorie: "Communication",
    couleurFond: "#1a1a2e",
    couleurTexte: "#ffffff",
    description: "NEST est une campagne de communication pour un salon de coiffure urbain. Le projet comprend une identité visuelle, des affiches, et une stratégie de contenu pour les réseaux sociaux.",
    photoMain: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    photosSecond: [
      "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=400&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&q=80",
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80",
    ],
    pdf: null,
    visible: true,
  },
  {
    id: "7",
    titre: "MOLECULAR",
    auteur: "par Tom Berger",
    sae: "SAE 2.02",
    semestre: 2,
    categorie: "Développement Web",
    couleurFond: "#1a56db",
    couleurTexte: "#ffffff",
    description: "Molecular est une application web de visualisation de données scientifiques. Elle permet d'explorer des molécules en 3D et de comprendre les liaisons chimiques de manière interactive.",
    photoMain: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&q=80",
    photosSecond: [
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80",
      "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
    ],
    pdf: null,
    visible: true,
  },
  {
    id: "8",
    titre: "macchi",
    auteur: "par Alice Martin",
    sae: "SAE 1.01",
    semestre: 1,
    categorie: "Graphisme",
    couleurFond: "#ffd600",
    couleurTexte: "#c0392b",
    description: "macchi est une identité de marque pour une chaîne de restaurants mexicains. Le projet explore la typographie expressive et les couleurs vives pour créer une expérience visuelle festive.",
    photoMain: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
    photosSecond: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    ],
    pdf: null,
    visible: true,
  },
]

export const CATEGORIES = [
  "Graphisme",
  "Développement Web",
  "UX/UI",
  "Audiovisuel",
  "Réalité Virtuelle",
  "Développement de jeu",
  "Communication",
  "Webdesign",
]