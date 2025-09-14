# Используем официальный Node.js образ
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем только package.json
COPY package.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Копируем только необходимые файлы из builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# Запускаем приложение
CMD ["npm", "start"]