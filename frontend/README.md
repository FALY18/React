#  Application de Gestion Logistique - WBS

##  Description

Cette application web permet de gérer efficacement la logistique d'une entreprise : gestion des utilisateurs, matériels, emprunts et notifications de retours en attente.

Elle comprend :
- ✅ Tableau de bord analytique en temps réel
- ✅ Gestion complète des utilisateurs
- ✅ Gestion des matériels (inventaire et état)
- ✅ Suivi des emprunts
- ✅ Notifications intelligentes pour les retards de retour
- ✅ Statistiques graphiques sur l'état des matériels
- ✅ Interface responsive adaptée aux ordinateurs et aux mobiles
- ✅ Authentification sécurisée avec gestion de session

---

##  Fonctionnalités principales

- **Gestion des utilisateurs** : Ajouter, modifier et supprimer les utilisateurs.
- **Gestion des matériels** : Inventorier et suivre l'état des équipements.
- **Suivi des emprunts** : Gérer les emprunts et les retours de matériels.
- **Notifications** : Alertes automatiques pour les matériels non retournés.
- **Statistiques graphiques** : Visualiser les données avec Recharts.
- **Responsive** : Adaptation automatique à toutes les tailles d'écran.
- **Connexion sécurisée** : Authentification avec contrôle des erreurs et animations de chargement.

---

## Technologies utilisées

### Front-End

- React.js (Hooks et Functional Components)
- React Router DOM
- Axios
- Recharts (visualisation de données)
- React Icons
- React Toastify (notifications)
- CSS personnalisé (responsive design)

### Back-End (API)

- Node.js + Express.js
- Base de données (MySQL)

---

## Exemple de fonctionnement du Dashboard

### Données récupérées via l'API :

- `GET /api/dashboard/data` → Statistiques globales
- `GET /api/emprunts` → Notifications sur les emprunts actifs
- `GET /api/statistics/etatMat` → Répartition des matériels selon leur état



# Cloner le projet
git clone https://github.com/FALY18/React.git

# Accéder au dossier
cd ton-projet

# Installer les dépendances
npm install

# Lancer l'application
npm start

