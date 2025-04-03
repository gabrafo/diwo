# Estágio de build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install -g npm@latest && \
    npm install @nestjs/platform-express @nestjs/typeorm typeorm pg && \ 
    npm install @nestjs/swagger swagger-ui-express \
    npm install moment \
    npm ci --include=dev 

COPY . .
RUN npm run build

# Estágio de produção
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
