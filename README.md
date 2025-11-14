# Travel Agent H 🌍

Application web d'agence de voyage construite avec React et Vite.

## 🏗️ Architecture du Site

### Structure des Dossiers
```
travel-agent-H/
├── public/              # Fichiers statiques
├── src/
│   ├── assets/         # Images et ressources
│   │   └── images/
│   ├── components/     # Composants réutilisables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   └── Card.jsx
│   ├── pages/          # Pages de l'application
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx
│   │   ├── Booking.jsx
│   │   └── About.jsx
│   ├── styles/         # Fichiers CSS
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── Navigation.css
│   │   ├── Card.css
│   │   ├── Home.css
│   │   ├── Destinations.css
│   │   ├── Booking.css
│   │   └── About.css
│   ├── utils/          # Fonctions utilitaires
│   ├── App.jsx         # Composant principal
│   └── main.jsx        # Point d'entrée
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

## 📄 Pages

### 🏠 Accueil (Home)
- Hero section avec call-to-action
- Section des fonctionnalités (destinations, prix, sécurité, support)
- Destinations populaires en vedette

### 🗺️ Destinations
- Grille de destinations avec filtres par région
- Cartes de destination avec images, descriptions et prix
- Système de filtrage par continent (Europe, Asie, Amérique)

### 📝 Réservation (Booking)
- Formulaire de réservation complet
- Sélection de destination
- Dates de voyage
- Nombre de voyageurs
- Informations personnelles
- Messages et demandes spéciales

### ℹ️ À Propos (About)
- Histoire de l'entreprise
- Mission et valeurs
- Équipe
- Statistiques
- Call-to-action pour réserver

## 🧩 Composants

### Header
- Logo cliquable
- Navigation principale
- Fixed sur le haut de page

### Navigation
- Liens vers toutes les pages
- État actif sur la page courante
- Design responsive

### Footer
- Informations de l'entreprise
- Liens rapides
- Contact
- Réseaux sociaux
- Copyright

### Card
- Composant réutilisable pour afficher les destinations
- Image, titre, description
- Lien personnalisable

## 🎨 Styles

Variables CSS globales définies dans `index.css` :
- Couleurs primaires et secondaires
- Couleurs de texte
- Ombres
- Responsive design

## 🚀 Installation et Utilisation

### Prérequis
- Node.js (version 16+)
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install
```

### Développement
```bash
# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

### Build Production
```bash
# Créer la version de production
npm run build
```

### Preview Production
```bash
# Prévisualiser la version de production
npm run preview
```

## 🛠️ Technologies Utilisées

- **React 18** - Framework JavaScript
- **React Router DOM** - Gestion du routing
- **Vite** - Build tool et dev server
- **CSS3** - Styling avec variables CSS

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## ✨ Fonctionnalités

- ✅ Navigation fluide entre les pages
- ✅ Filtrage des destinations par région
- ✅ Formulaire de réservation complet
- ✅ Design moderne et responsive
- ✅ Animations et transitions CSS
- ✅ Composants réutilisables

## 🔜 Améliorations Futures

- [ ] Intégration d'une API backend
- [ ] Système d'authentification
- [ ] Paiement en ligne
- [ ] Recherche avancée de destinations
- [ ] Système de notation et avis
- [ ] Multi-langues
- [ ] Dark mode

## 📝 Licence

MIT

---

Créé avec ❤️ par Travel Agent H