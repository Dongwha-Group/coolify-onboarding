"use client";

const steps = [
  {
    step: 1,
    title: "Coolify 서버 연결",
    description: "Coolify 대시보드에 접속하여 새 서버를 추가하거나 기존 서버를 선택합니다.",
    details: [
      "Coolify 대시보드 로그인",
      "Settings → Servers 메뉴 이동",
      "SSH 키 또는 비밀번호로 서버 연결",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "GitHub 레포지토리 연결",
    description: "GitHub App을 설치하고 배포할 레포지토리를 연결합니다.",
    details: [
      "Projects → New Resource 클릭",
      "GitHub App 설치 및 권한 부여",
      "배포할 레포지토리 선택",
    ],
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "빌드 설정",
    description: "Nixpacks 자동 감지를 사용하거나 Dockerfile로 커스텀 빌드를 설정합니다.",
    details: [
      "빌드 팩 선택: Nixpacks (권장) 또는 Dockerfile",
      "빌드 명령어 설정 (필요시)",
      "시작 명령어 설정",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "환경변수 설정",
    description: "애플리케이션에 필요한 환경변수를 안전하게 설정합니다.",
    details: [
      "Settings → Environment Variables 이동",
      "필요한 환경변수 추가 (예: DATABASE_URL)",
      "Preview/Production 환경별 설정 분리",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "도메인 연결",
    description: "커스텀 도메인을 연결하고 SSL 인증서를 자동 발급받습니다.",
    details: [
      "Settings → Domains 에서 도메인 추가",
      "DNS에서 A 레코드 또는 CNAME 설정",
      "Let's Encrypt SSL 자동 발급 확인",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

export default function SetupGuide() {
  return (
    <section id="setup" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            초기 설정 가이드
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            단계별 가이드를 따라 Coolify 자동배포를 설정하세요
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6B16ED] via-purple-400 to-purple-200 dark:to-purple-900 hidden sm:block" />

          <div className="space-y-8">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="sm:pl-20">
                  {/* Step number - positioned on the line */}
                  <div className="absolute left-0 top-0 hidden sm:flex">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B16ED] to-[#9333EA] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/25">
                      {item.step}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow">
                    {/* Mobile step number */}
                    <div className="flex items-center gap-3 mb-4 sm:hidden">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B16ED] to-[#9333EA] flex items-center justify-center text-white font-bold">
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
                            <svg className="w-5 h-5 text-[#6B16ED] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {detail}
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
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">설정 완료 후 Git Push하면 자동 배포됩니다!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
