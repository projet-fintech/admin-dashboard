# Étape 1 : Utiliser une image Node.js comme base
FROM node:18-alpine AS builder

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste des fichiers du projet
COPY . .

# Étape 6 : Construire l'application pour la production
RUN npm run build

# Étape 7 : Utiliser une image légère pour servir les fichiers statiques
FROM nginx:alpine

# Étape 8 : Copier les fichiers construits depuis l'étape précédente
COPY --from=builder /app/dist /usr/share/nginx/html

# Étape 9 : Exposer le port 80 (port par défaut de Nginx)
EXPOSE 80

# Étape 10 : Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]