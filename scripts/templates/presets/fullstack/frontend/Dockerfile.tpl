# ── Build stage ────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Production stage (Nginx reverse proxy) ───────────────────
FROM nginx:alpine AS runner

# Next.js standalone 출력 복사
COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public /app/public

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Next.js standalone 서버와 Nginx를 함께 실행
CMD sh -c "node /app/server.js &  nginx -g 'daemon off;'"
