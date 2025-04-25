# Étape de build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copier les fichiers nécessaires à l'installation
COPY package*.json ./
RUN npm ci

# Copier tout le projet pour inclure tsconfig.json et autres
COPY . .

# Compiler le projet TypeScript
RUN npm run build

# Étape de production
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copier les fichiers nécessaires à l'exécution
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --only=production

# Copier les fichiers compilés
COPY --from=builder /usr/src/app/dist ./dist

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/main"]
