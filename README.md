# Frontend de l'Application de Gestion des Souscriptions d'Assurance

Ce projet est le frontend développé avec React.js pour l'application de gestion des souscriptions d'assurance. L'interface permet aux administrateurs de gérer les produits d'assurance et les utilisateurs via une interface utilisateur réactive et ergonomique.

## Fonctionnalités principales

- **Gestion des produits d'assurance** :
  - Création de nouveaux produits.
  - Mise à jour des produits existants.
  - Suppression des produits.

- **Gestion des utilisateurs** :
  - Création de nouveaux utilisateurs.
  - Mise à jour des informations des utilisateurs existants.
  - Suppression des utilisateurs.

- **Consommation d'une API REST** : Intégration avec le backend basé sur Spring Boot.

## Technologies Utilisées

- **Framework** : React.js
- **Gestion des états** : Redux (ou Context API selon préférence)
- **Requêtes HTTP** : Axios ou Fetch API
- **Styles** : CSS Modules, TailwindCSS ou Material-UI (au choix)
- **Build Tool** : Vite ou Create React App

## Prérequis

- Node.js 16+
- NPM ou Yarn

## Installation et Configuration

1. Clonez le répertoire du projet :
   ```bash
   git clone https://github.com/terravidhal/Insurance-frontend-GITHUB.git
   cd frontend-assurance
   ```

2. Installez les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   ```


4. Lancez l'application :
   ```bash
   npm run dev
   ```

5. Accédez à l'application dans votre navigateur :
   [http://localhost:2173](http://localhost:5173)

## Structure du Projet

- **src/components** : Composants réutilisables de l'application.
- **src/pages** : Pages principales de l'application (Produits, Utilisateurs, etc.).
- **src/services** : Fichiers pour consommer l'API REST (ex. Axios).
- **src/store** : Gestion des états globaux (Redux ou Context).
- **src/styles** : Fichiers CSS pour le style global.

## Points Clés de l'API Consommée

### Produits d'Assurance
- **GET** `/products` : Récupérer la liste des produits.
- **POST** `/products` : Ajouter un produit.
- **PUT** `/products/{id}` : Mettre à jour un produit.
- **DELETE** `/products/{id}` : Supprimer un produit.

### Utilisateurs
- **GET** `/users` : Récupérer la liste des utilisateurs.
- **POST** `/users` : Ajouter un utilisateur.
- **PUT** `/users/{id}` : Mettre à jour un utilisateur.
- **DELETE** `/users/{id}` : Supprimer un utilisateur.


