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
RUN pnpm run build

# Production image
FROM node:20-alpine AS runner

# Создаем непривилегированного пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Устанавливаем pnpm в production образе
RUN npm install -g pnpm@10.13.1

# Копируем package.json и pnpm-lock.yaml (если есть)
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Устанавливаем только production зависимости
# Опциональные зависимости устанавливаются автоматически для правильной платформы (Linux)
RUN if [ -f pnpm-lock.yaml ]; then \
        pnpm install --frozen-lockfile --prod; \
    else \
        echo "⚠️  WARNING: pnpm-lock.yaml not found, installing without lockfile"; \
        pnpm install --prod; \
    fi && \
    # Очищаем кэш для уменьшения размера образа
    pnpm store prune && \
    # Удаляем ненужные файлы
    rm -rf /tmp/* /var/cache/apk/*

# Копируем только необходимые файлы из builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./next.config.js

# Переключаемся на непривилегированного пользователя
USER nextjs

# Запускаем приложение
CMD ["pnpm", "start"]