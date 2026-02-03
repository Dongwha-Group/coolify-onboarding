"use client";

import { useState } from "react";

const snippets = [
  {
    id: "dockerfile",
    title: "Dockerfile",
    filename: "Dockerfile",
    language: "dockerfile",
    code: `# Node.js 애플리케이션 예시
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]`,
  },
  {
    id: "compose",
    title: "Docker Compose",
    filename: "docker-compose.yml",
    language: "yaml",
    code: `version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=\${DB_USER}
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
      - POSTGRES_DB=\${DB_NAME}
    restart: unless-stopped

volumes:
  postgres_data:`,
  },
  {
    id: "env",
    title: ".env 구조",
    filename: ".env.example",
    language: "env",
    code: `# 애플리케이션 설정
NODE_ENV=production
PORT=3000

# 데이터베이스
DATABASE_URL=postgresql://user:password@db:5432/myapp
DB_USER=myuser
DB_PASSWORD=mysecretpassword
DB_NAME=myapp

# API 키 (Coolify 환경변수로 관리 권장)
API_SECRET_KEY=your-secret-key
JWT_SECRET=your-jwt-secret

# 외부 서비스
REDIS_URL=redis://redis:6379
S3_BUCKET=my-bucket
S3_REGION=ap-northeast-2`,
  },
  {
    id: "nixpacks",
    title: "nixpacks.toml",
    filename: "nixpacks.toml",
    language: "toml",
    code: `# Nixpacks 빌드 설정 (선택사항)
# 대부분의 경우 자동 감지로 충분합니다

[phases.setup]
nixPkgs = ["nodejs_20", "npm"]

[phases.install]
cmds = ["npm ci"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"

[variables]
NODE_ENV = "production"
PORT = "3000"`,
  },
];

export default function CodeSnippets() {
  const [activeTab, setActiveTab] = useState("dockerfile");
  const [copied, setCopied] = useState(false);

  const activeSnippet = snippets.find((s) => s.id === activeTab);

  const copyToClipboard = async () => {
    if (activeSnippet) {
      await navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="code" className="py-20 px-4 md:px-6 lg:px-[30px]">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            코드 스니펫
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            프로젝트에 바로 사용할 수 있는 설정 파일 예시
          </p>
        </div>

        {/* Code viewer */}
        <div className="bg-zinc-900 dark:bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
          {/* Tab bar */}
          <div className="flex items-center gap-1 px-4 pt-4 pb-0 overflow-x-auto scrollbar-hide">
            {snippets.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => setActiveTab(snippet.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  activeTab === snippet.id
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                {snippet.title}
              </button>
            ))}
          </div>

          {/* Code header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-zinc-700">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-zinc-400 font-mono">
                {activeSnippet?.filename}
              </span>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 hover:text-white bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  복사됨
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  복사
                </>
              )}
            </button>
          </div>

          {/* Code content */}
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed">
              <code>{activeSnippet?.code}</code>
            </pre>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-[#00694D]/10 dark:bg-[#00694D]/20 rounded-xl border border-[#00694D]/20 dark:border-[#00694D]/30">
            <svg className="w-5 h-5 text-[#00694D] dark:text-[#6BB89E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-[#00694D] dark:text-[#6BB89E]">Nixpacks 추천</p>
              <p className="text-sm text-[#00694D]/80 dark:text-[#6BB89E]/80">Dockerfile이 없으면 Nixpacks가 자동으로 빌드 설정을 감지합니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-300">보안 주의</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">.env 파일은 Git에 커밋하지 말고 Coolify 환경변수로 관리하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
