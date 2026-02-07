# Use Node.js 20 (LTS atual)
FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependências incluindo devDependencies
RUN npm ci --include=dev

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando para desenvolvimento
CMD ["npm", "run", "start:dev"]

# Stage de produção
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar arquivos buildados do stage de desenvolvimento
COPY --from=development /usr/src/app/dist ./dist

# Expor porta
EXPOSE 3000

# Comando para produção
CMD ["node", "dist/main"]