"use client";

const directoryTree = `ax-project/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI 앱 진입점
│   │   ├── config.py            # 환경변수 설정
│   │   ├── database.py          # DB 엔진/세션
│   │   ├── models/              # SQLAlchemy 모델
│   │   ├── schemas/             # Pydantic 스키마
│   │   ├── routers/             # API 라우터
│   │   ├── services/            # 비즈니스 로직
│   │   └── middleware/          # 미들웨어
│   ├── alembic/                 # DB 마이그레이션
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js 페이지
│   │   ├── components/          # React 컴포넌트
│   │   └── lib/                 # API 클라이언트, 유틸
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md`;

export default function ProjectStructure() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-[30px]">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            프로젝트 구조
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Monorepo 기반의 프론트엔드/백엔드 통합 프로젝트
          </p>
        </div>

        {/* Directory tree viewer */}
        <div className="bg-zinc-900 dark:bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
          {/* Code header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-zinc-700">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-zinc-400 font-mono">
                project-structure
              </span>
            </div>
          </div>

          {/* Tree content */}
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed">
              <code>{directoryTree}</code>
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
              <p className="text-sm font-medium text-[#00694D] dark:text-[#6BB89E]">Monorepo 장점</p>
              <p className="text-sm text-[#00694D]/80 dark:text-[#6BB89E]/80">코드 공유, 일관된 린트/포맷 설정, 단일 PR로 프론트/백엔드 동시 변경 가능.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-300">도구 선정 중</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">Turborepo, Nx 등 빌드 도구는 추후 확정 예정입니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
