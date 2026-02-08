"use client";

import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
      aria-label="복사"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  );
}

function CodeBlock({ code, copyable = true }: { code: string; copyable?: boolean }) {
  return (
    <div className="relative bg-zinc-900 rounded-xl p-4">
      {copyable && (
        <div className="absolute top-3 right-3">
          <CopyButton text={code} />
        </div>
      )}
      <pre className="font-mono text-sm text-zinc-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ShellTabs({ tabs }: { tabs: { label: string; code: string }[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-1 mb-0">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActive(idx)}
            className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors ${
              active === idx
                ? "bg-zinc-900 text-white"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="relative bg-zinc-900 rounded-xl rounded-tl-none p-4">
        <div className="absolute top-3 right-3">
          <CopyButton text={tabs[active].code} />
        </div>
        <pre className="font-mono text-sm text-zinc-300 overflow-x-auto">
          <code>{tabs[active].code}</code>
        </pre>
      </div>
    </div>
  );
}

const steps = [
  {
    step: 1,
    title: "프로젝트 디렉토리로 이동",
    description: "Claude 룰을 설치할 프로젝트의 루트 디렉토리로 이동합니다.",
    code: "cd your-project",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "스크립트 다운로드 & 실행",
    description: "curl로 스크립트를 다운로드한 뒤 Node.js로 바로 실행합니다. (권장)",
    shellTabs: [
      {
        label: "Bash (macOS / Linux)",
        code: "curl -fsSL https://raw.githubusercontent.com/Dongwha-Group/coolify-onboarding/main/scripts/init-claude.mjs -o init-claude.mjs && node init-claude.mjs",
      },
      {
        label: "PowerShell (Windows)",
        code: "curl.exe -fsSL https://raw.githubusercontent.com/Dongwha-Group/coolify-onboarding/main/scripts/init-claude.mjs -o init-claude.mjs; node init-claude.mjs",
      },
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "대화형 프롬프트 응답",
    description: "프로젝트 이름, 설명 입력 후 프로젝트 유형을 선택하면 맞춤 구조가 생성됩니다.",
    prompts: [
      "프로젝트 이름",
      "프로젝트 설명",
      "프로젝트 유형 (Next.js / FastAPI / Fullstack / 룰만)",
      "설치 경로",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
];

const presetTrees: { id: string; label: string; tree: string }[] = [
  {
    id: "rules-only",
    label: "룰만",
    tree: `your-project/
├── CLAUDE.md
└── .claude/
    └── rules/
        ├── design-system.md
        └── git-commit.md`,
  },
  {
    id: "nextjs",
    label: "Next.js",
    tree: `your-project/
├── CLAUDE.md
├── .claude/
│   └── rules/
│       ├── design-system.md
│       └── git-commit.md
├── .gitignore
├── Dockerfile
├── public/
│   └── .gitkeep
└── src/
    └── app/
        └── .gitkeep`,
  },
  {
    id: "fastapi",
    label: "FastAPI",
    tree: `your-project/
├── CLAUDE.md
├── .claude/
│   └── rules/
│       ├── design-system.md
│       └── git-commit.md
├── .gitignore
├── Dockerfile
└── app/
    ├── __init__.py
    ├── routers/
    │   └── .gitkeep
    ├── models/
    │   └── .gitkeep
    ├── schemas/
    │   └── .gitkeep
    └── services/
        └── .gitkeep`,
  },
  {
    id: "fullstack",
    label: "Fullstack",
    tree: `your-project/
├── CLAUDE.md
├── .claude/
│   └── rules/
│       ├── design-system.md
│       └── git-commit.md
├── .gitignore
├── docker-compose.yml
├── frontend/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── public/
│   │   └── .gitkeep
│   └── src/
│       └── app/
│           └── .gitkeep
└── backend/
    ├── .gitignore
    ├── Dockerfile
    └── app/
        ├── __init__.py
        ├── routers/
        │   └── .gitkeep
        ├── models/
        │   └── .gitkeep
        ├── schemas/
        │   └── .gitkeep
        └── services/
            └── .gitkeep`,
  },
];

function PresetTabs() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-1 mb-0 flex-wrap">
        {presetTrees.map((preset, idx) => (
          <button
            key={preset.id}
            onClick={() => setActive(idx)}
            className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors ${
              active === idx
                ? "bg-zinc-900 text-white"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div className="relative bg-zinc-900 rounded-xl rounded-tl-none p-4">
        <div className="absolute top-3 right-3">
          <CopyButton text={presetTrees[active].tree} />
        </div>
        <pre className="font-mono text-sm text-zinc-300 overflow-x-auto">
          <code>{presetTrees[active].tree}</code>
        </pre>
      </div>
    </div>
  );
}

export default function GetStarted() {
  const [altOpen, setAltOpen] = useState(false);

  return (
    <main className="pt-14 md:pt-[46px] lg:pt-14">
      {/* Hero */}
      <section className="relative py-20 px-4 md:px-6 lg:px-[30px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00694D]/10 via-transparent to-transparent dark:from-[#00694D]/20" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00694D]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#008C66]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary-br flex items-center justify-center shadow-primary-lg">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
            Claude Code 시작하기
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            한 줄 명령어로 프로젝트에 AX 팀의 Claude 룰을 설치하세요
          </p>
        </div>
      </section>

      {/* 사전 요구사항 */}
      <section className="py-16 px-4 md:px-6 lg:px-[30px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
            사전 요구사항
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Node.js */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Node.js 18+</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">스크립트 실행에 필요</p>
                </div>
              </div>
              <code className="text-xs font-mono bg-zinc-100 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded">
                node --version
              </code>
            </div>

            {/* curl */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">curl</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Windows 10+, macOS, Linux 기본 내장</p>
                </div>
              </div>
              <code className="text-xs font-mono bg-zinc-100 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded">
                curl --version
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* 설치 가이드 */}
      <section className="py-20 px-4 md:px-6 lg:px-[30px] bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              설치 가이드
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              3단계로 Claude 룰을 설치하세요
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00694D] via-[#008C66] to-[#4A9B7F] hidden sm:block" />

            <div className="space-y-8">
              {steps.map((item) => (
                <div key={item.step} className="relative">
                  <div className="sm:pl-20">
                    {/* Step number on the line */}
                    <div className="absolute left-0 top-0 hidden sm:flex">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-primary-br flex items-center justify-center text-white font-bold text-xl shadow-primary">
                        {item.step}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow">
                      {/* Mobile step number */}
                      <div className="flex items-center gap-3 mb-4 sm:hidden">
                        <div className="w-10 h-10 rounded-xl bg-gradient-primary-br flex items-center justify-center text-white font-bold">
                          {item.step}
                        </div>
                        <span className="text-sm text-zinc-400">Step {item.step} of {steps.length}</span>
                      </div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="ml-0 sm:ml-16">
                        {item.code && <CodeBlock code={item.code} />}
                        {item.shellTabs && <ShellTabs tabs={item.shellTabs} />}
                        {item.prompts && (
                          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4">
                            <ul className="space-y-2">
                              {item.prompts.map((prompt, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {prompt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 생성 결과 */}
      <section className="py-20 px-4 md:px-6 lg:px-[30px]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              생성 결과
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              프리셋에 따라 다음 파일들이 프로젝트에 생성됩니다
            </p>
          </div>

          <PresetTabs />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <code className="text-sm font-mono text-primary font-semibold">CLAUDE.md</code>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">프로젝트 개요, 기술 스택, 주요 명령어</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <code className="text-sm font-mono text-primary font-semibold">design-system.md</code>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">동화 디자인 시스템 가이드</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
              <code className="text-sm font-mono text-primary font-semibold">git-commit.md</code>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Git 커밋 컨벤션 규칙</p>
            </div>
          </div>

          {/* Success message */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#00694D]/10 dark:bg-[#00694D]/20 text-[#00694D] dark:text-[#6BB89E] rounded-full">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">설치 완료 후 Claude Code에서 바로 사용할 수 있습니다</span>
            </div>
          </div>
        </div>
      </section>

      {/* 대안 설치 방법 */}
      <section className="py-16 px-4 md:px-6 lg:px-[30px] bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setAltOpen(!altOpen)}
            className="w-full flex items-center justify-between bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">대안 설치 방법</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">curl 외 다른 방법으로 설치하기</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-zinc-400 transition-transform ${altOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {altOpen && (
            <div className="mt-4 space-y-4">
              {/* 로컬 실행 */}
              <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700">
                <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">
                  로컬 실행 (레포 클론 후)
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  coolify-onboarding 레포를 클론한 뒤, 스크립트를 직접 실행합니다.
                </p>
                <CodeBlock code="node ~/coolify-onboarding/scripts/init-claude.mjs" />
              </div>

              {/* npm 스크립트 */}
              <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700">
                <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">
                  npm 스크립트 (레포 내)
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  coolify-onboarding 레포 안에서 npm 스크립트로 실행합니다.
                </p>
                <CodeBlock code="npm run init:claude" />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
