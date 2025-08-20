# TAV Airports - Système de Gestion de Stock

## Description
Système de gestion de stock pour TAV Airports avec accès par départements et gestion des entrées/sorties de produits.

## Fonctionnalités
- 🏢 **Gestion par départements** : Administration, Production, Qualité, Maintenance, Technique
- 📦 **Gestion des produits** : Ajout, modification, suppression des produits en stock
- 📥 **Entrées de stock** : Enregistrement des nouvelles entrées de marchandises
- 📤 **Sorties de stock** : Suivi des sorties de produits par département
- 📊 **Dashboard** : Vue d'ensemble avec statistiques et métriques
- 🔒 **Accès restreint** : Chaque département voit uniquement ses données

## Technologies Utilisées
- **Frontend** : React 18 + TypeScript
- **Build Tool** : Vite
- **Styling** : Tailwind CSS
- **Icons** : Lucide React
- **Linting** : ESLint

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/Aladimassi/taf.git
cd taf
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir http://localhost:5174 dans votre navigateur

## Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile le projet pour la production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run preview` - Prévisualise la build de production

## Structure du Projet

```
src/
├── components/          # Composants React
│   ├── Dashboard.tsx    # Page d'accueil avec statistiques
│   ├── DepartmentLogin.tsx  # Sélection du département
│   ├── EntriesTab.tsx   # Gestion des entrées
│   ├── ExitsTab.tsx     # Gestion des sorties
│   ├── ProductsTab.tsx  # Gestion des produits
│   ├── Navigation.tsx   # Navigation entre onglets
│   └── ...
├── data/               # Données mock et configuration
├── types/              # Types TypeScript
└── ...
```

## Départements Disponibles

- **Administration** : Gestion générale
- **Production** : Suivi de la production
- **Qualité** : Contrôle qualité
- **Maintenance** : Maintenance des équipements
- **Technique** : Gestion technique et produits

## Développé pour
TAV Airports - Système de gestion de stock interne
