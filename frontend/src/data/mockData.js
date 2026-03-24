// ============================================================
//  mockData.js — Données fictives
//  ⚠️  Ces données seront remplacées par des appels API Symfony
//  quand le back-end sera prêt. Pour l'instant on simule.
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
