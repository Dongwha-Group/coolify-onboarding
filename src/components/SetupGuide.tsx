"use client";

const steps = [
  {
    step: 1,
    title: "레포지토리 클론",
    description: "모노레포 저장소를 로컬에 클론합니다.",
    details: [
      "Git 설치 확인 (git --version)",
      "git clone <repository-url>",
      "cd ax-project",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Node.js 환경 설정",
    description: "프론트엔드 개발을 위한 Node.js 환경을 구성합니다.",
    details: [
      "Node.js 20+ 설치 (node --version)",
      "cd apps/web && npm install",
      "npm run dev (localhost:3000 확인)",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Python 환경 설정",
    description: "백엔드 개발을 위한 Python 가상환경을 구성합니다.",
    details: [
      "Python 3.11+ 설치 (python --version)",
      "cd apps/api && pip install poetry && poetry install",
      "poetry run uvicorn main:app --reload (localhost:8000 확인)",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "환경변수 설정",
    description: "프로젝트에 필요한 환경변수를 설정합니다.",
    details: [
      ".env.example 파일을 .env.local로 복사",
      "필요한 API 키 및 DB 연결 정보 입력",
      "프론트/백엔드 각각의 .env 파일 확인",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "개발 도구 설정",
    description: "팀 표준 개발 도구와 확장 프로그램을 설치합니다.",
    details: [
      "VS Code 확장: ESLint, Prettier, Tailwind CSS IntelliSense, Python",
      "ESLint/Prettier 설정 확인 (.eslintrc, .prettierrc)",
      "Git hooks 설정 (pre-commit, commit-msg)",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function SetupGuide() {
  return (
    <section id="setup" className="py-20 px-4 md:px-6 lg:px-[30px] bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            개발 환경 설정
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            크로스 플랫폼 로컬 개발 환경 구축 가이드
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line - Dongwha Primary */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00694D] via-[#008C66] to-[#4A9B7F] hidden sm:block" />

          <div className="space-y-8">
            {steps.map((item) => (
              <div key={item.step} className="relative">
                <div className="sm:pl-20">
                  {/* Step number - positioned on the line */}
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

                    {/* Details */}
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 ml-0 sm:ml-16">
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <code className="font-mono text-xs bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded">{detail}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success message */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#00694D]/10 dark:bg-[#00694D]/20 text-[#00694D] dark:text-[#6BB89E] rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">localhost:3000에서 확인하세요 (API: /api/* 경로로 프록시)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
