"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 lg:px-[30px] py-20 pt-24 overflow-hidden">
      {/* Background gradient - Dongwha Primary */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00694D]/10 via-transparent to-transparent dark:from-[#00694D]/20" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00694D]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#008C66]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center container-grid">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary-br flex items-center justify-center shadow-primary-lg">
            <svg
              className="w-12 h-12 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            AX
          </span>{" "}
          스타터 킷
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          업무 프로세스의 병목을 찾아 빠르게 해결합니다.
          <br className="hidden sm:block" />
          Low cost, Maximum efficiency로 AX 문화를 확산합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/get-started"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-primary rounded-full hover:opacity-90 transition-all shadow-primary hover:shadow-primary-lg hover:scale-105"
          >
            시작하기
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
          <a
            href="#techstack"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all hover:scale-105"
          >
            기술 스택 보기
          </a>
        </div>

        {/* Quick stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">Low Cost</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">최소 비용</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">Max Speed</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">최대 효율</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">Full Stack</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">통합 개발</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
