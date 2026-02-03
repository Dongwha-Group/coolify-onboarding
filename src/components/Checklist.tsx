"use client";

import { useState } from "react";

const checklistItems = [
  {
    id: "server",
    category: "서버 설정",
    items: [
      { id: "server-1", text: "Coolify 서버 연결 확인", required: true },
      { id: "server-2", text: "Docker 설치 및 실행 확인", required: true },
      { id: "server-3", text: "필요한 포트 개방 (80, 443)", required: true },
    ],
  },
  {
    id: "repo",
    category: "레포지토리",
    items: [
      { id: "repo-1", text: "GitHub/GitLab 레포지토리 연결", required: true },
      { id: "repo-2", text: "배포 브랜치 설정 (예: main)", required: true },
      { id: "repo-3", text: "Webhook 자동 설정 확인", required: false },
    ],
  },
  {
    id: "build",
    category: "빌드 설정",
    items: [
      { id: "build-1", text: "Dockerfile 또는 Nixpacks 설정", required: true },
      { id: "build-2", text: "빌드 명령어 확인", required: false },
      { id: "build-3", text: "포트 설정 확인 (예: 3000)", required: true },
    ],
  },
  {
    id: "env",
    category: "환경변수",
    items: [
      { id: "env-1", text: "필수 환경변수 설정", required: true },
      { id: "env-2", text: "데이터베이스 연결 문자열 설정", required: false },
      { id: "env-3", text: "API 키 및 시크릿 설정", required: false },
    ],
  },
  {
    id: "domain",
    category: "도메인 & SSL",
    items: [
      { id: "domain-1", text: "커스텀 도메인 설정", required: false },
      { id: "domain-2", text: "DNS 레코드 설정 (A/CNAME)", required: false },
      { id: "domain-3", text: "SSL 인증서 발급 확인", required: false },
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
    <section className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            배포 전 체크리스트
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            첫 배포 전 확인해야 할 항목들을 체크하세요
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
              className="h-full bg-gradient-to-r from-[#6B16ED] to-[#9333EA] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {allRequiredChecked && (
            <div className="mt-3 flex items-center gap-2 text-green-600 dark:text-green-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">필수 항목 모두 완료! 배포 준비 완료</span>
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
                <span className="w-2 h-2 rounded-full bg-[#6B16ED]" />
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
                      <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-600 rounded peer-checked:border-[#6B16ED] peer-checked:bg-[#6B16ED] transition-all">
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
