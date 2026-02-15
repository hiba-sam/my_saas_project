#  Hospital Management System - SaaS (Groupe A)

Ce projet est une plateforme de gestion de patients développée lors du bootcamp Full-Stack. Il met en œuvre une architecture découplée avec un Backend en Node.js/TypeScript et un Frontend en React/TypeScript.

##  Architecture Technique
- **Frontend** : React (Vite), TypeScript, CSS-in-JS.
- **Backend** : Node.js, Express, TypeScript (TS-Node).
- **Communication** : API REST (JSON), Fetch API avec gestion d'état asynchrone.

## 🛠️ Installation et Lancement

### 1. Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### 2. Configuration du Backend
```bash
cd backend
npm install
npx ts-node server.ts
```
Le serveur sera lancé sur http://localhost:3001

3. Configuration du Frontend
Ouvrez un second terminal :
```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur http://localhost:5173

 Fonctionnalités Clés
Authentification simulée : Système de login avec persistance via localStorage.

Gestion des Patients (CRUD) : Ajout et visualisation en temps réel des données patients.

Typage Strict : Utilisation d'interfaces TypeScript partagées pour garantir l'intégrité des données.

Logging de Production : Middleware de monitoring pour tracer chaque requête serveur avec horodatage.

 Sécurité & Performance
Gestion des politiques CORS pour sécuriser les échanges entre domaines.

Prévention des comportements par défaut du navigateur via e.preventDefault().

Nettoyage du cache lors des requêtes fetch pour garantir des données fraîches.
