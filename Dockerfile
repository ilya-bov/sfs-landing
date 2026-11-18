# Используем официальный Node.js образ
# ВАЖНО: Для максимальной безопасности используйте конкретный хеш образа:
# FROM node:20-alpine@sha256:ПРОВЕРЕННЫЙ_ХЕШ
FROM node:20-alpine AS builder

WORKDIR /app

# Устанавливаем pnpm (используем конкретную версию для безопасности)
RUN npm install -g pnpm@10.13.1

# Копируем package.json и pnpm-lock.yaml (если есть)
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Устанавливаем зависимости с проверкой безопасности
# --frozen-lockfile гарантирует использование точных версий из lock файла (если файл существует)
# Опциональные зависимости устанавливаются автоматически для правильной платформы (Linux)
RUN if [ -f pnpm-lock.yaml ]; then \
        pnpm install --frozen-lockfile; \
    else \
        echo "⚠️  WARNING: pnpm-lock.yaml not found, installing without lockfile"; \
        pnpm install; \
    fi

# Копируем остальные файлы
COPY . .

# Собираем Next.js приложение
# --no-network-family-autoselection: next/font downloads fail in Docker on hosts
# whose IPv6 path is broken (the KZ box); harmless elsewhere.
ENV NODE_OPTIONS="--no-network-family-autoselection"
RUN pnpm run build

# Production image
FROM node:20-alpine AS runner
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
# output: "standalone" (next.config.js): server.js plus only the traced dependencies.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
