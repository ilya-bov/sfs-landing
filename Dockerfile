# Используем официальный Node.js образ
FROM node:20-alpine AS builder

WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем остальные файлы
COPY . .

# Собираем Next.js приложение
RUN pnpm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Устанавливаем pnpm в production образе
RUN npm install -g pnpm

# Копируем package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем только production зависимости
RUN pnpm install --frozen-lockfile --prod

# Копируем только необходимые файлы из builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

# Запускаем приложение
CMD ["pnpm", "start"]