"use client";

import { useState } from "react";

const snippets = [
  {
    id: "git",
    title: "Git 컨벤션",
    filename: "commit-convention.md",
    language: "markdown",
    code: `# Git 커밋 컨벤션

## 커밋 메시지 포맷
<타입>: <제목>

<본문>

Related to: #Issue ID

## 타입 종류
- feat: 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- refactor: 코드 리팩터링
- test: 테스트 추가/수정
- chore: 기타 변경
- build: 빌드/종속성 변경

## 브랜치 명명
- feature/<기능명>
- fix/<버그명>
- hotfix/<긴급수정>

## 예시
feat: 사용자 인증 API 추가

- JWT 기반 인증 미들웨어 구현
- 로그인/로그아웃 엔드포인트 생성

Related to: #42`,
  },
  {
    id: "typescript",
    title: "TypeScript 규칙",
    filename: ".eslintrc.json",
    language: "json",
    code: `// TypeScript / Next.js 코딩 규칙

// 1. 네이밍 컨벤션
// - 컴포넌트: PascalCase (UserProfile.tsx)
// - 함수/변수: camelCase (getUserData)
// - 상수: UPPER_SNAKE_CASE (API_BASE_URL)
// - 타입/인터페이스: PascalCase (UserResponse)

// 2. Import 순서
// (1) React/Next.js
// (2) 외부 라이브러리
// (3) 내부 컴포넌트
// (4) 유틸/타입
// (5) 스타일

// 3. ESLint 주요 설정
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "no-console": "warn",
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}`,
  },
  {
    id: "python",
    title: "Python 규칙",
    filename: "pyproject.toml",
    language: "toml",
    code: `# Python / FastAPI 코딩 규칙

# 1. 포매터: Black (line-length: 88)
# 2. Import 정렬: isort
# 3. 린터: ruff

[tool.black]
line-length = 88
target-version = ["py311"]

[tool.isort]
profile = "black"

[tool.ruff]
line-length = 88
select = ["E", "F", "I"]

# FastAPI 구조 컨벤션
# app/
# ├── main.py          # FastAPI 앱 진입점
# ├── routers/         # API 라우터 모듈
# │   ├── users.py
# │   └── items.py
# ├── models/          # Pydantic 모델
# ├── services/        # 비즈니스 로직
# ├── core/            # 설정, 보안
# └── dependencies.py  # 의존성 주입`,
  },
  {
    id: "workflow",
    title: "워크플로우",
    filename: "workflow.md",
    language: "markdown",
    code: `# 개발 워크플로우

## 1. 로컬 개발
- main 브랜치에서 feature 브랜치 생성
- 로컬에서 개발 및 테스트

## 2. Feature Branch
- git checkout -b feature/<기능명>
- 작업 단위로 커밋 (컨벤션 준수)

## 3. Pull Request
- GitHub에서 PR 생성
- 제목: 커밋 컨벤션과 동일
- 리뷰어 지정 (최소 1명)

## 4. Code Review
- 리뷰어 피드백 반영
- CI 통과 확인

## 5. Merge
- Squash and Merge 사용
- main 브랜치로 머지

## 6. Auto Deploy
- main 머지 시 Coolify 자동 배포
- Webhook → Docker Build → Deploy
- 배포 상태 Coolify 대시보드 확인`,
  },
];

export default function CodeSnippets() {
  const [activeTab, setActiveTab] = useState("git");
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
            코딩 컨벤션 & 워크플로우
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            AX 팀의 코딩 규칙과 개발 프로세스
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
              <p className="text-sm font-medium text-[#00694D] dark:text-[#6BB89E]">PR 필수</p>
              <p className="text-sm text-[#00694D]/80 dark:text-[#6BB89E]/80">모든 코드 변경은 Pull Request를 통해 리뷰 후 머지합니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-300">자동 배포</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">main 브랜치 머지 시 Coolify가 자동으로 프로덕션 배포합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
