"use client";

import { useState } from "react";

const checklistItems = [
  {
    id: "devenv",
    category: "개발 환경",
    items: [
      { id: "devenv-1", text: "Git 설치 및 설정", required: true },
      { id: "devenv-2", text: "Node.js 20+ 설치", required: true },
      { id: "devenv-3", text: "Python 3.11+ 설치", required: true },
      { id: "devenv-4", text: "VS Code 및 확장 프로그램 설치", required: false },
    ],
  },
  {
    id: "repo",
    category: "레포지토리",
    items: [
      { id: "repo-1", text: "모노레포 클론 완료", required: true },
      { id: "repo-2", text: "프론트엔드 의존성 설치 (npm install)", required: true },
      { id: "repo-3", text: "백엔드 의존성 설치 (poetry install)", required: true },
      { id: "repo-4", text: "로컬 실행 확인 (localhost:3000, API: /api/*)", required: true },
    ],
  },
  {
    id: "process",
    category: "팀 프로세스",
    items: [
      { id: "process-1", text: "Git 커밋 컨벤션 숙지", required: true },
      { id: "process-2", text: "PR 프로세스 이해", required: true },
      { id: "process-3", text: "코딩 컨벤션 확인 (TypeScript, Python)", required: false },
      { id: "process-4", text: "배포 파이프라인 이해", required: false },
    ],
  },
  {
    id: "access",
    category: "접근 권한",
    items: [
      { id: "access-1", text: "GitHub 조직 및 레포 접근 권한", required: true },
      { id: "access-2", text: "Coolify 대시보드 접근", required: false },
      { id: "access-3", text: "AWS 콘솔 접근 (필요시)", required: false },
      { id: "access-4", text: "커뮤니케이션 채널 가입", required: true },
    ],
  },
  {
    id: "docs",
    category: "문서 확인",
    items: [
      { id: "docs-1", text: "README.md 읽기", required: true },
      { id: "docs-2", text: "팀 위키 확인", required: false },
      { id: "docs-3", text: "Ontology 문서 확인", required: false },
      { id: "docs-4", text: "API 문서 확인 (FastAPI /docs)", required: false },
    ],
  },
];

export default function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (itemId: string) => {
    setChecked((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const totalItems = checklistItems.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const requiredItems = checklistItems.flatMap((cat) =>
    cat.items.filter((item) => item.required)
  );
  const requiredCheckedCount = requiredItems.filter((item) => checked[item.id]).length;
  const allRequiredChecked = requiredCheckedCount === requiredItems.length;

  return (
    <section id="checklist" className="py-20 px-4 md:px-6 lg:px-[30px] bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            온보딩 체크리스트
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            AX 팀 합류 후 확인해야 할 항목들을 체크하세요
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8 bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              진행률
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
              {checkedCount} / {totalItems} 완료
            </span>
          </div>
          <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {allRequiredChecked && (
            <div className="mt-3 flex items-center gap-2 text-[#00694D] dark:text-[#6BB89E]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">필수 항목 모두 완료! 온보딩 준비 완료</span>
            </div>
          )}
        </div>

        {/* Checklist categories */}
        <div className="space-y-4">
          {checklistItems.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={checked[item.id] || false}
                        onChange={() => toggleItem(item.id)}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-600 rounded peer-checked:border-[#00694D] peer-checked:bg-[#00694D] transition-all">
                        <svg
                          className={`w-full h-full text-white p-0.5 transition-opacity ${
                            checked[item.id] ? "opacity-100" : "opacity-0"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-sm transition-colors ${
                          checked[item.id]
                            ? "text-zinc-400 line-through"
                            : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white"
                        }`}
                      >
                        {item.text}
                      </span>
                      {item.required && (
                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded">
                          필수
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reset button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setChecked({})}
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            체크리스트 초기화
          </button>
        </div>
      </div>
    </section>
  );
}
