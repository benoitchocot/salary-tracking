# 💰 Salary Tracker

Une application web moderne de suivi et d'analyse de salaires, construite avec Nuxt 3 et Vue 3.

![Nuxt](https://img.shields.io/badge/Nuxt-3.14-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)

## ✨ Fonctionnalités

### 📊 Gestion des Salaires
- **Ajout/Modification** : Interface modale intuitive pour gérer vos données salariales
- **Saisie sécurisée** : Sélecteur de date natif pour éviter les erreurs de saisie
- **Organisation par année** : Sections repliables pour une meilleure lisibilité
- **Données complètes** : Suivi du brut, net, net après impôt et impôts payés

### 📈 Bilan Annuel
- **Vue d'ensemble** : Totaux annuels pour tous les indicateurs
- **Évolution** : Comparaison automatique avec l'année précédente
- **Pourcentages** : Visualisation des variations en euros et en pourcentage
- **Tri intelligent** : Années affichées par ordre décroissant

### 🎯 Simulation d'Augmentation
- **Projection** : Simulez l'impact d'une augmentation de salaire
- **Filtrage par année** : Basez vos simulations sur une année spécifique
- **Calculs détaillés** : Impact sur le brut, net et net après impôt
- **Comparaison visuelle** : Avant/après avec différences affichées

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm, pnpm, yarn ou bun

### Installation des dépendances

```bash
npm install
```

## 💻 Développement

Lancez le serveur de développement sur `http://localhost:3000` :

```bash
npm run dev
```

## 🏗️ Production

### Build Web

```bash
npm run build
```

### Prévisualisation

```bash
npm run preview
```

### Build Mobile (Capacitor)

```bash
# Générer et synchroniser avec Capacitor
npm run build:mobile

# Ouvrir dans Xcode (iOS)
npm run open:ios

# Ouvrir dans Android Studio
npm run open:android
```

## 🛠️ Stack Technique

- **Framework** : [Nuxt 3](https://nuxt.com/)
- **UI Framework** : [Nuxt UI](https://ui.nuxt.com/)
- **Language** : TypeScript
- **Mobile** : Capacitor (iOS & Android)
- **Styling** : Tailwind CSS (via Nuxt UI)

## 📁 Structure du Projet

```
├── pages/
│   ├── index.vue           # Gestion des salaires
│   ├── annual-summary.vue  # Bilan annuel
│   └── simulation.vue      # Simulation d'augmentation
├── composables/
│   ├── useSalaries.ts      # Gestion des données
│   └── useSimulation.ts    # Logique de simulation
├── server/
│   ├── api/                # API endpoints
│   └── repositories/       # Accès aux données
├── utils/
│   ├── dateHelpers.ts      # Utilitaires de dates
│   └── salaryHelpers.ts    # Calculs salariaux
└── shared/
    └── salary.ts           # Types TypeScript
```

## 🎨 Fonctionnalités UI

- **Design moderne** : Interface épurée avec Tailwind CSS
- **Responsive** : Adapté mobile, tablette et desktop
- **Modales** : Formulaires dans des dialogues élégants
- **Sections repliables** : Organisation par année avec `<details>`
- **Feedback visuel** : Codes couleur pour les évolutions (vert/rouge)

## 📱 Support Mobile

L'application est compatible avec iOS et Android grâce à Capacitor :

1. Générez la version statique : `npm run generate`
2. Synchronisez avec Capacitor : `npm run sync:mobile`
3. Ouvrez dans l'IDE natif : `npm run open:ios` ou `npm run open:android`

## 📄 Licence

Projet privé - Tous droits réservés

## 👨‍💻 Auteur

Développé avec ❤️ par [benoitchocot](https://github.com/benoitchocot)
