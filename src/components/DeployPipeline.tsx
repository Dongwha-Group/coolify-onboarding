"use client";

const steps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Git Push",
    description: "main 브랜치에 코드 머지",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "Coolify Webhook",
    description: "변경 감지 및 빌드 트리거",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Docker Build",
    description: "컨테이너 이미지 빌드",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Production Deploy",
    description: "프로덕션 배포 완료",
    color: "from-green-500 to-emerald-500",
  },
];

const deployInfo = [
  {
    title: "배포 환경",
    items: ["AWS EC2 인스턴스", "Coolify 셀프호스팅 PaaS", "Let's Encrypt SSL 자동 발급"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    ),
  },
  {
    title: "배포 설정",
    items: ["Nginx 프록시 기반 단일 도메인 배포", "환경변수 UI 관리 (Coolify)", "자동 롤백 지원"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function DeployPipeline() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-[30px] bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            배포 파이프라인
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Git Push부터 프로덕션까지 완전 자동화된 배포 흐름
          </p>
        </div>

        {/* Flow diagram */}
        <div className="relative mb-16">
          {/* Desktop flow */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                {/* Step card */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="relative bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:scale-105 transition-transform cursor-default">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-4 mx-auto`}>
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white text-center mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                      {step.description}
                    </p>
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="flex-1 flex items-center justify-center px-2">
                    <div className="w-full h-0.5 bg-gradient-to-r from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-500 relative">
                      <svg
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile flow */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => (
              <div key={step.title}>
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-lg border border-zinc-200 dark:border-zinc-700 flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white flex-shrink-0`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-zinc-400">Step {index + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Vertical connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Deploy info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deployInfo.map((info) => (
            <div
              key={info.title}
              className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {info.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {info.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
